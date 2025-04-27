"use server";

import { signIn } from "@/auth";
import { getUserEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendTwoFactorTokenEmail, sendVerificationToken } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_ADMIN_REDIRECT, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Schemas from "@/schema";
import { AuthError } from "next-auth";
import * as z from "zod";
// import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"; // Import cookies to clear session manually

export const login = async (
    values: z.infer<typeof Schemas.LoginSchema>,
    // callBackurl?: string | null
) => {
    const validatedValues = Schemas.LoginSchema.safeParse(values);

    if (!validatedValues.success) return { error: "Invalid fields!" };

    const { email, password, code } = validatedValues.data;

    const existingUser = await getUserEmail(email.toLowerCase());

    if (!existingUser || !existingUser.email || !existingUser.password)
        return { error: "User does not exist" };

    if (!existingUser.emailVerified && existingUser.name) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        await sendVerificationToken(
            email,
            existingUser.name,
            verificationToken.token
        );

        return { success: "Email verification sent!" };
    }

    if (existingUser.isTwoFactorEnabled) {
        if (code) {
            const _2fa = await getTwoFactorTokenByEmail(existingUser.email);

            if (!_2fa || _2fa.token !== code) return { error: "Invalid Code" };

            if (new Date(_2fa.expires) < new Date()) return { error: "Code expired" };

            const _2faConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (_2faConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: { id: _2faConfirmation.id }
                });
            }

            await db.twoFactorConfirmation.create({
                data: { userId: existingUser.id }
            });
        } else {
            const _2fa = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail(_2fa.email, _2fa.token);

            return { twoFactorEnabled: true };
        }
    }

    try {
        // Clear previous session cookies before login
        cookies().delete("next-auth.session-token");
        cookies().delete("next-auth.callback-url");

        await signIn("credentials", {
            email,
            password,
            redirectTo:
                existingUser.role === "ADMIN"
                    ? DEFAULT_ADMIN_REDIRECT
                    : DEFAULT_LOGIN_REDIRECT,
        });

        // Force session refresh after successful login
        // revalidatePath("/");

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Login Failed" };
            }
        }
        throw error;
    }

    return { success: "Login successful!" };
};
