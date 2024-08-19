import { getUserPortfolio } from "@/data/user"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const GET = async () => {
    const loggedUser = await currentUser();

    // Check if loggedUser or loggedUser.id is undefined
    if (!loggedUser || !loggedUser.id) {
        return new Response(JSON.stringify(
            {
                error: "User not authenticated" 
            }),
            {
                status: 401,
                headers: { "Content-Type": "application/json"
            },
        });
    }

    // If the user is authenticated, proceed to get the portfolio
    const response = await getUserPortfolio(loggedUser.id);

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export const POST = async (request_data: Request) => {
    const loggedUser = await currentUser();

    if (!loggedUser || !loggedUser.id) {
        return new Response(JSON.stringify(
            {
                error: "User not authenticated" 
            }),
            {
                status: 401,
                headers: { "Content-Type": "application/json"
            },
        });
    }

    try {
        const data = await request_data.json();

        if (!data) return new Response(JSON.stringify(
            {
                error: "Invalid Data" 
            }),
            {
                status: 400,
                headers: { "Content-Type": "application/json"
            },
        });

        const closeDate = new Date(new Date().getTime() + parseFloat(data.close_date) * 24 * 60 * 60 * 1000);

        await db.userPortfolio.create({
            data: {
                userId: loggedUser.id,
                name: data.name,
                sector: data.sector,
                amount: data.amount,
                roi: parseFloat(data.roi),
                opened_date: new Date(),
                close_date: closeDate,
            }
        })

        return new Response(
            JSON.stringify({ success: true }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {

        console.error("Error during POST /api/wallet-portfolio:", {
            message: error.message,
            stack: error.stack,
            errorData: error
        });

        return new Response(JSON.stringify(
            { error: "Failed to create portfolio entry" }
        ), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
