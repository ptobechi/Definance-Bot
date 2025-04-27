import { db } from "@/lib/db";

type SubtractBalanceResult = {
    success?: string;
    error?: string;
};

/**
 * getUserEmail - returns user information from db
 * @param email: email to lookup in db
 * @returns user || null
 */
export const getUserEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({
            where: {
                email: email.toLowerCase()
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

/**
 * getUserInvestmentPorfolio - get all stocks and investment
 * a user invested in
 * @param id - userid
 * @returns  - investment portfolio
 */
export const getUserInvestmentPorfolio = async (id: string) => {
    try {
        const portfolio = await db.userPortfolio.findMany({
            where: { userId: id },
        });

        if (portfolio.length === 0) {
            return null
        }

        return portfolio;
    } catch (error) {
        return {error: error}
    }
}

/**
 * 
 * @param loggedUser - Logged in User Information
 * @param amount - Amount to be deducted from user portfolio
 * @param from - currency to deduct from
 * @returns 
 */
export const SubtractBalance = async (
    loggedUser: any,
    amount: string,
    from: string
): Promise<SubtractBalanceResult> => {
    try {
        // Ensure amount is a valid number
        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return { error: "Invalid amount provided" };
        }

        // Fetch user's portfolio
        const portfolio = await getUserPortfolio(loggedUser.id);
        if (!portfolio) {
            return { error: "Unable to load your portfolio balance, please try again later" };
        }

        // Find balance for the given cryptocurrency
        const fromBalIndex = portfolio.findIndex(
            (item: any) => item.crypto_symbol.toLowerCase() === from.toLowerCase()
        );

        if (fromBalIndex === -1) {
            return { error: `You do not have enough ${from.toUpperCase()}, kindly top-up and try again` };
        }

        const fromBal = portfolio[fromBalIndex];

        // Ensure valid balance and sufficient funds
        if (!fromBal || isNaN(parseFloat(fromBal.crypto_bal)) || parseFloat(fromBal.crypto_bal) < parseFloat(amount)) {
            return { error: "Insufficient balance" };
        }

        const newFromAccountBalance = parseFloat(fromBal.crypto_bal) - parseFloat(amount);

        // Update balance using a transaction
        await db.$transaction([
            db.cryptoPortfolio.update({
                where: {
                    userId_crypto_symbol: {
                        userId: loggedUser.id,
                        crypto_symbol: from.toLowerCase(),
                    },
                },
                data: {
                    crypto_prev_bal: fromBal.crypto_bal,
                    crypto_bal: newFromAccountBalance.toString(),
                },
            }),
        ]);

        return { success: "Balance updated successfully" };

    } catch (error) {
        console.error("Error in SubtractBalance:", error);
        return { error: "An internal error occurred, please try again later" };
    }
};
