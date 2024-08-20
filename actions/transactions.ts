"use server"
import schema from "@/schema";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserPortfolio } from "@/data/user";
import { usd2crypto } from "@/_functions";

export const transaction = async (values: z.infer<typeof
    schema.PaymentSchema>) => {
        const validatedValues = schema.PaymentSchema.safeParse(values);
        
        const loggedUser = await currentUser();
        
        if (!loggedUser || !loggedUser.id) return {error: "Login to a valid account to complete this process"}

        if (!validatedValues.success) return {error: "Invalid fileds!"}

        const {amount, from, to, type, network} = validatedValues.data;

        // convert amount to crypto
        const from_crypto_rate: any = await usd2crypto(from.toString(), amount);

        if (!to && type === "deposit") {
            // generate payment address and return to user
            const allPaymentAddr = await db.paymentWalletAddress.findMany({
                where: {
                    symbol: from,
                    network
                }
            })

            const random = Math.floor(Math.random() * allPaymentAddr.length);

            return {
                paymentAddr: allPaymentAddr[random].publicAddress,
                network: allPaymentAddr[random].network
            }
        }

        if (type === "convert") {

            // get from balance
            const portfolio = await getUserPortfolio(loggedUser.id)

            if (!portfolio) return {error: "unable to load your portfolio balance, please try again later"}

            const fromBalIndex = portfolio.findIndex(item => item.crypto_symbol.toLowerCase() === from.toLowerCase());

            if (fromBalIndex === -1) return {error: `you do not have enough ${from.toUpperCase()}, kindly top-up and try again`}

            const fromBal: any = portfolio[fromBalIndex];


            // Ensure crypto_rate is valid and that the user has enough balance
            if (isNaN(from_crypto_rate)
                || from_crypto_rate === null
                || isNaN(fromBal.crypto_bal)
                || parseFloat(from_crypto_rate) > fromBal.crypto_bal
            ) {
                return { error: "insufficient balance" };
            }

            // add amount to to balance
            const toBalIndex = portfolio.findIndex(
                item => item.crypto_symbol.toLowerCase() === to.toLowerCase());

            if (toBalIndex === -1)
                return {error: `failed to complete request, try again`}

            // Convert crypto_bal to a number
            const to_crypto_rate: any = await usd2crypto(to, amount);
            const toBal: any = portfolio[toBalIndex];


             // update portfolio balance
             const oldBalance = fromBal.crypto_bal - from_crypto_rate
             const newBalance = toBal.crypto_bal + to_crypto_rate

            // update db with new balance
            console.log("rate", from_crypto_rate)
            console.log("from bal", fromBal.crypto_bal)
            console.log("amount", amount)
            console.log("old portfolio balance", oldBalance)
            console.log("new portfolio balance", newBalance)

            return {success: "Your transaction is being proceed on the blockchain"}
        }

        if (type === "transfer") {
            return {success: "Your transaction is being proceed on the blockchain"}
        }
        
        await db.transactions.create({
            data: {
                userId: loggedUser.id,
                transaction_type: type,
                transaction_amount: amount,
                transaction_date: new Date(),
                transaction_status: "pending",
                transaction_info: `${amount}, ${type} from: ${from} - to: ${to}`
            }
        })
        return {success: "Your transaction is being proceed on the blockchain"}
}

export const debitTransactions = async () => {

}