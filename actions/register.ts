"use server";

import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationToken } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import Schemas from "@/schema";
import * as z from "zod";

export const register = async (values: z.infer<typeof
    Schemas.RegisterSchema>) => {
    try{
        const validatedValues = Schemas.RegisterSchema.safeParse(values);

        if (!validatedValues.success)
            return {error: "Invalid fields!"}

        const {email, name, password} = validatedValues.data;

        const existingUser = await getUserEmail(email.toLowerCase());

        if (existingUser)
            return {error: "User already exist!"}

        const registeredUserData = await db.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                password,
            },
        })

        if (registeredUserData) {
            await db.cryptoPortfolio.createMany({
                data: [
                    {
                        userId: registeredUserData.id,
                        crypto_name: "Bitcoin",
                        crypto_symbol: "btc",
                        crypto_bal: "0.00",
                        crypto_prev_bal: "0.00",
                    },
                    {
                        userId: registeredUserData.id,
                        crypto_name: "Ethereum",
                        crypto_symbol: "eth",
                        crypto_bal: "0.00",
                        crypto_prev_bal: "0.00",
                    },
                    {
                        userId: registeredUserData.id,
                        crypto_name: "Tether USDT",
                        crypto_symbol: "usdt",
                        crypto_bal: "0.00",
                        crypto_prev_bal: "0.00",
                    },
                    // {
                    //     userId: registeredUserData.id,
                    //     crypto_name: "S&P 500",
                    //     crypto_symbol: "S&P",
                    //     crypto_bal: "0.00",
                    //     crypto_prev_bal: "0.00",
                    // },
                    // {
                    //     userId: registeredUserData.id,
                    //     crypto_name: "Gold",
                    //     crypto_symbol: "gold",
                    //     crypto_bal: "0.00",
                    //     crypto_prev_bal: "0.00",
                    // },
                ]
            })
        }
        
        //send verification link use resend.com
        const verificationToken = await generateVerificationToken(email);

        await sendVerificationToken(
            email,
            name,
            verificationToken.token
        )

        return {success: "Registration Successful, check inbox for confirmation link!"}
    } catch {
        return { error: "An unexpected error occurred. Please try again." };
    }
}
