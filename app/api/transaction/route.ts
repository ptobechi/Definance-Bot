"use server"

import schema from "@/schema";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendDepositInitiatedMessage } from "@/lib/mail";


export const POST = async (values: Request) => {
        const validatedValues = schema.PaymentSchema.safeParse(values);
        
        const loggedUser = await currentUser();
        
        if (!loggedUser || !loggedUser.id)
                return new Response(JSON.stringify(
                    {error: "Login to a valid account to complete this process"}),{
                    status: 504,
                    headers: { "Content-Type": "application/json" },
                });
        

        if (!validatedValues.success)
                return new Response(JSON.stringify(
                    {error: "Invalid fileds!"}),{
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                });

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

                if (loggedUser.email) {
                    await sendDepositInitiatedMessage(loggedUser.email, amount, "USD", allPaymentAddr[random].publicAddress)
                }

            return new Response(JSON.stringify(
                {
                    paymentAddr: allPaymentAddr[random].publicAddress,
                    network: allPaymentAddr[random].network
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );

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
        return new Response(JSON.stringify(
            {success: "Your transaction is being proceed on the blockchain"}),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
}
