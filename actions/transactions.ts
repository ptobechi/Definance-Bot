"use server"

import schema from "@/schema";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserPortfolio, SubtractBalance } from "@/data/user";
import { sendDepositInitiatedMessage, sendWithdrawalInitiatedMessage } from "@/lib/mail";


export const transaction = async (values: z.infer<typeof
    schema.PaymentSchema>) => {
        const validatedValues = schema.PaymentSchema.safeParse(values);
        
        const loggedUser = await currentUser();
        
        if (!loggedUser || !loggedUser.id) return {error: "Login to a valid account to complete this process"}

        if (!validatedValues.success) return {error: "Invalid fileds!"}

        const {amount, from, to, type, network} = validatedValues.data;
        
        console.log("symbol",network)

        if (!to && type === "deposit") {
            // generate payment address and return to user
            const allPaymentAddr = await db.paymentWalletAddress.findMany({
                where: {
                    symbol: from,
                }
            })

            const random = Math.floor(Math.random() * allPaymentAddr.length);

            if (loggedUser.email) {
                await sendDepositInitiatedMessage(loggedUser.email, amount, "USD", allPaymentAddr[random].publicAddress)
            }

            await db.transactions.create({
                data: {
                    userId: loggedUser.id,
                    transaction_type: type,
                    transaction_amount: amount,
                    transaction_date: new Date(),
                    transaction_status: "pending",
                    transaction_info: `${from} - ${allPaymentAddr[random].publicAddress}`
                }
            })

            return {
                paymentAddr: allPaymentAddr[random].publicAddress,
                network: allPaymentAddr[random].network
            }
        }

        if (type === "convert") {
            // get from balance
            const portfolio = await getUserPortfolio(loggedUser.id)

            if (!portfolio) return {error: "unable to load your portfolio balance, please try again later"}

            const fromBalIndex = portfolio.findIndex((item: any) => item.crypto_symbol.toLowerCase() === from.toLowerCase());

            if (fromBalIndex === -1) return {error: `you do not have enough ${from.toUpperCase()}, kindly top-up and try again`}

            const fromBal: any = portfolio[fromBalIndex];

            if (!fromBal) return {error: "unable to complete request at this time, try again later"};

            // Ensure crypto_rate is valid and that the user has enough balance
            if (isNaN(parseFloat(amount))
                || amount === null
                || isNaN(fromBal.crypto_bal)
                || parseFloat(amount) > fromBal.crypto_bal
            ) {
                return { error: "insufficient balance" };
            }

            // add crypto equivatent of amount to destination balance
            const toBalIndex = portfolio.findIndex(
                (item: any) => item.crypto_symbol.toLowerCase() === to.toLowerCase());

            if (toBalIndex === -1)
                return {error: `failed to complete request, try again`}

            const toBal: any = portfolio[toBalIndex];

            // update portfolio balance
            const newFromAccountBalance = parseFloat(fromBal.crypto_bal) - parseFloat(amount)
            const newToAccountBalance = parseFloat(toBal.crypto_bal) + parseFloat(amount)

            // Update the balance for the 'from' cryptocurrency
            await db.cryptoPortfolio.update({
                where: {
                    userId_crypto_symbol: {
                        userId: loggedUser.id,
                        crypto_symbol: from.toLowerCase(),
                    },
                },
                data: {
                    crypto_prev_bal: fromBal.crypto_bal, // Set previous balance
                    crypto_bal: newFromAccountBalance.toString(), // Set new balance
                },
            });
        
            // Update the balance for the 'to' cryptocurrency
            await db.cryptoPortfolio.update({
                where: {
                    userId_crypto_symbol: {
                        userId: loggedUser.id,
                        crypto_symbol: to.toLowerCase(),
                    },
                },
                data: {
                    crypto_prev_bal: toBal.crypto_bal, // Set previous balance
                    crypto_bal: newToAccountBalance.toString(), // Set new balance
                },
            });
        

            return {success: "Your transaction is being proceed on the blockchain"}
        }

        if (type === "transfer") {
            const result = await SubtractBalance(loggedUser, amount, from)

            if (result.error) {
                return { error: result.error };  // Stop execution if there is an error
            }

            if (loggedUser.email) {
                await sendWithdrawalInitiatedMessage(loggedUser.email, amount, "USD")
            }

            await db.transactions.create({
                data: {
                    userId: loggedUser.id,
                    transaction_type: type,
                    transaction_amount: amount,
                    transaction_date: new Date(),
                    transaction_status: "pending",
                    transaction_info: `address - ${to}`
                }
            })
        
            return {success: "Your transaction is being proceed on the blockchain"}
        }

        return {success: "Your transaction is being proceed on the blockchain"}

}
