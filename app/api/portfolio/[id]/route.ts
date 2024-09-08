import { db } from '@/lib/db';

// Next.js 13+ route configuration options
export const runtime = 'edge';  // Example configuration if you want to run the route on the Edge runtime
export const dynamic = 'force-dynamic'; // Forces dynamic rendering for this route, if needed

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({
        error: 'ID is required',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const portfolio = await db.userPortfolio.findMany({
    where: {
      userId: id,
    },
  });

  if (portfolio.length === 0) {
    return new Response(
      JSON.stringify({ error: 'No portfolio found for the provided ID' }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(JSON.stringify(portfolio), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
