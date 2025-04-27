"use server"
import { db } from "@/lib/db";
import { sendDepositCompletedMessage } from "@/lib/mail";

export const POST = async (revalues: Request) => {
    try {
        // Parse request body
        const updates = await revalues.json();

        // Validate input
        if (!Array.isArray(updates) || updates.length === 0) {
            return new Response(
                JSON.stringify({ error: "No updates provided" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Perform updates
        const results = [];
        let email;
        let amount;
        for (const update of updates) {
            if (!update.userId || !update.crypto_symbol || update.crypto_bal === undefined) {
                results.push({
                    error: `Invalid data for update: ${JSON.stringify(update)}`,
                });
                continue;
            }

            email = update.email
            amount = update.amount

            try {
                const result = await db.cryptoPortfolio.update({
                    where: {
                        userId_crypto_symbol: {
                            userId: update.userId,
                            crypto_symbol: update.crypto_symbol,
                        },
                    },
                    data: {
                        crypto_bal: update.crypto_bal.toString(), // Ensure `crypto_bal` is stored as a string
                        crypto_prev_bal: update.crypto_prev_bal,
                    },
                });

                results.push({ success: `Updated ${update.crypto_symbol}`, data: result });
            } catch (error) {
                console.error(`Error updating record for ${update.crypto_symbol}:`, error);
                results.push({ error: `Failed to update ${update.crypto_symbol}` });
            }
        }

        //send confirmation email
        await sendDepositCompletedMessage(email, amount, "USD")

        // Return the results
        return new Response(
            JSON.stringify(results),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error in POST handler:", error);
        return new Response(
            JSON.stringify({ error: "An unexpected error occurred" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
