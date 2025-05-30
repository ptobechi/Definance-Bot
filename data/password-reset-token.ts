import { db } from "@/lib/db"

/**
 * getPasswordTokenByEmail - search for user verification token
 * on db
 * @param email: string to search for in email fiend
 * @return verification token | null
 */
export const getPasswordTokenByEmail = async (
    email: string
) => {
    try {
        const passwordToken = await db.passwordResetToken.findFirst({
            where: {
              email: email.toLowerCase() 
            }
        })
        return passwordToken;
    } catch {
        return null
    }
}

/**
 * getPasswordTokenByToken - search for user verification token
 * on db
 * @param token: string to search for in token fiend
 * @return verification token | null
 */
export const getPasswordTokenByToken = async (
    token: string
) => {
    try {
        const passwordToken = await db.passwordResetToken.findUnique({
            where: {
              token 
            }
        })
        return passwordToken;
    } catch {
        return null
    }
}