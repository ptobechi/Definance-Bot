"use server";
import { db } from "@/lib/db";

export const DELETE = async (request: Request) => {
    try {
        // Parse query parameters
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        const userId = url.searchParams.get("userId");

        if (!id || !userId) {
            return new Response(
                JSON.stringify({ error: "Invalid input: id and userId are required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Perform deletion
        const result = await db.userPortfolio.delete({
            where: {
                id: id,
                userId: userId,
            },
        });

        return new Response(
            JSON.stringify({ success: "Transaction deleted successfully", data: result }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error deleting transaction:", error);

        return new Response(
            JSON.stringify({ error: "Failed to delete transaction" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
