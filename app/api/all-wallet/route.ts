import { currentRole } from '@/lib/auth';
import { db } from '@/lib/db';

// export const runtime = 'nodejs'; // Use Node.js runtime
// export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export const GET = async () => {
  try {
    const role = await currentRole();

    // Check if the requester is an admin
    if (role !== "ADMIN") {
      return new Response(
        JSON.stringify({ error: 'Access denied: Admins only' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch users with all associated records
    const wallet = await db.paymentWalletAddress.findMany();

    if (!wallet || wallet.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No user records found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return the list of users with their associated data
    return new Response(JSON.stringify(wallet), {
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
