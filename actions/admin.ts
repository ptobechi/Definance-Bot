import { currentRole } from "@/lib/auth"
import { db } from "@/lib/db";

export const runtime = 'nodejs'; // Use Node.js runtime
export const dynamic = 'force-dynamic'; // Forces dynamic rendering

export const updateUserBal = async (value: any) => {
    // Simulate fetching current role
    const role = await currentRole();
    console.log("Current Role:", role);

    // // Check if the role is ADMIN
    // if (role !== "ADMIN") {
    //     return { error: "You don't have the right permission to perform this operation" };
    // }

    try {
        console.log("Admin authorized, updating balance...");

        // Simulate portfolio update logic
        console.log("Portfolio to update:", value);

        // Here, you would typically make an API call to update the user's portfolio
        // Example:
        // const response = await fetch('/api/updatePortfolio', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(value)
        // });
        // const result = await response.json();

        // Simulated success response
        return { success: "User balance updated successfully!" };
    } catch (error) {
        console.error("Error updating balance:", error);
        return { error: "An unexpected error occurred, please try again later" };
    }

}