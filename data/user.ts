import { db } from "@/lib/db";

/**
 * getUserEmail - returns user information from db
 * @param email: email to lookup in db
 * @returns user || null
 */
export const getUserEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                email
            }
        })
        return user;
    } catch {
        return null;
    }
}

/**
 * getUserByID - returns user information from db
 * @param id: id to lookuo in the db
 * @returns user || null
 */
export const getUserByID = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user;
    } catch {
        return null;
    }
}

/**
 * getUserPortfolio - get all crypto holdings
 * @param {String} id - userid
 * @returns {String} - crypto portfolio
 */
export const getUserPortfolio = async (id: string) => {
    try {
        const portfolio = await db.cryptoPortfolio.findMany({
            where: {
                userId: id
            }
        });

        if (portfolio.length === 0) {
            return null;
        }

        return portfolio;

    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return null;
    }
}

export const portfolio = async (id: string) => {
    try {
        
    } catch (error) {
        return {error: error}
    }
}
