"use server";
import { db } from "@/lib/db";

export const DELETE = async (request: Request) => {
    try {
        // Parse query parameters
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ error: "Invalid input: userId is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Fetch user emails associated with userId
        const userEmails = await db.user.findMany({
            where: { id: userId },
            select: { email: true },
        });

        const emailArray = userEmails.map((user) => user.email).filter((email): email is string => email !== null);

        // Delete all records associated with the userId
        if (emailArray.length > 0) {
            await db.twoFactorToken.deleteMany({ where: { email: { in: emailArray } } });
            await db.verificationToken.deleteMany({ where: { email: { in: emailArray } } });
            await db.passwordResetToken.deleteMany({ where: { email: { in: emailArray } } });
        }

        await db.transactions.deleteMany({ where: { userId } });
        await db.cryptoPortfolio.deleteMany({ where: { userId } });
        await db.userPortfolio.deleteMany({ where: { userId } });
        await db.twoFactorConfirmation.deleteMany({ where: { userId } });
        await db.account.deleteMany({ where: { userId } });
        await db.user.delete({ where: { id: userId } });

        return new Response(
            JSON.stringify({ success: "All user records deleted successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error deleting user records:", error);

        return new Response(
            JSON.stringify({ error: "Failed to delete user records" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
