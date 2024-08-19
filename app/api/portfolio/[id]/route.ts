import { db } from '@/lib/db';

export const GET = async (req: Request,
    { params }: { params: { id: string }
}) => {
    const { id } = params;

    if (!id) {
        new Response(JSON.stringify({
            error: "ID is required"
        }),
        {
            status: 400,
            headers: { "Content-Type": "application/json"}
        })
    }

    const portfolio = await db.userPortfolio.findMany({
        where:{
            userId: id
        }
    })

    if (portfolio.length === 0) return null

    return new Response(JSON.stringify(portfolio), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

