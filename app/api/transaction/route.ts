"use server"

import schema from "@/schema";
import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const POST = async (values: z.infer<typeof
    schema.PaymentSchema>) => {
        const validatedValues = schema.PaymentSchema.safeParse(values);
        
        const loggedUser = await currentUser();
        
        if (!loggedUser || !loggedUser.id) return {error: "Login to a valid account to complete this process"}

        if (!validatedValues.success) return {error: "Invalid fileds!"}

        const {amount, from, to, type, network} = validatedValues.data;

        if (!to) {
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
