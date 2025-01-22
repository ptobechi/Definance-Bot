import { db } from "@/lib/db";

export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    try {
        const { id } = params;

        if (!id) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const portfolio = await db.userPortfolio.findMany({
            where: { userId: id },
        });

        if (portfolio.length === 0) {
            return new Response(
                JSON.stringify({ error: "No portfolio found for the provided ID" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(JSON.stringify(portfolio), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
