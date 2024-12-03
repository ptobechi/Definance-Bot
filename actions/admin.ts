import { currentRole } from "@/lib/auth"
import { db } from "@/lib/db";

export const all_profile = async () => {
    const role =  await currentRole();

    // check if request is from admin
    if (role !== "ADMIN")
        return

    // return list of all registered users 
    try {
        const users = await db.cryptoPortfolio.findMany();

        if (users.length === 0) {
            return null;
        }

        return users;

    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return null;
    }
}