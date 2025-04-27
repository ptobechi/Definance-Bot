import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

// export const runtime = 'nodejs'; // Use Node.js runtime
// export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try{
    const { id } = params;

    const loggedUser = await currentUser();
            
    if (!loggedUser || !loggedUser.id)
            return new Response(JSON.stringify(
                {error: "Login to a valid account to complete this process"}),{
                status: 504,
                headers: { "Content-Type": "application/json" },
            });

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

    // Fetch user with all associated records
    const user = await db.user.findUnique({
      include: {
        accounts: true,
        twoFactorConfirmation: true,
        transactions: true,
        cryptoPortfolio: true,
        userPortfolio: true,
      },
      where: {
        id,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'No user records found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the user with their associated data
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // Ensures fresh data on every request
      },
    });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error in GET handler:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
