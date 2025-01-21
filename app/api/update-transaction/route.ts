"use server";

import { usd2crypto } from "@/_functions";
import { db } from "@/lib/db";
import { sendDepositCompletedMessage } from "@/lib/mail";

export const POST = async (revalues: Request) => {
    try {
        // Parse request body
        const updates = await revalues.json();

        // Validate input
        if (!updates) {
            return new Response(
                JSON.stringify({ error: "Invalid input: userId, id, and transaction_status are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        //check if transaction type is deposit
        if (updates.type === "deposit") {
            // Explode transaction info to extract the currency
            const [currencyRaw] = updates.info.split('-');
            const currency = currencyRaw.trim();

            // Get user balance from the database
            const portfolio = await db.cryptoPortfolio.findUnique({
                where: {
                    userId_crypto_symbol: {
                        userId: updates.userid,
                        crypto_symbol: currency,
                    },
                },
            });

            // convert deposit amount to crypto currency
            const crypto_price = await usd2crypto(currency, updates.amount);

            if (portfolio && crypto_price) {
                const update_price = parseFloat(crypto_price) + parseFloat(portfolio.crypto_bal)
                // Update the portfolio with the crypto price and calculated value
                await db.cryptoPortfolio.update({
                    where: {
                        id: portfolio.id,
                        userId: updates.userid
                    },
                    data: {
                        crypto_bal: update_price.toString(),
                        crypto_prev_bal: portfolio.crypto_bal,
                    },
                });
            }
            else {
                return new Response(
                    JSON.stringify({ success: "Unable to complete transaction, make sure your vpn is on"}),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            await sendDepositCompletedMessage(updates.email, updates.amount, "USD")
        }

        // Update transaction status
        const result = await db.transactions.update({
            where: {
                id: updates.id, // Use `id` as the primary identifier
                userId: updates.userid
            },
            data: {
                transaction_status: updates.status === "pending" ? "active" : "pending",
            },
        });

        return new Response(
            JSON.stringify({ success: "Transaction status updated successfully", data: result }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error updating transaction:", error);

        return new Response(
            JSON.stringify({ error: "Failed to update transaction status" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
