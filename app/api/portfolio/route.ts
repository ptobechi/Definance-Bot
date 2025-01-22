import { getUserInvestmentPorfolio } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const GET = async () => {
    try {
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
        const response = await getUserInvestmentPorfolio(loggedUser.id);
    
        return new Response(JSON.stringify(response), {
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
