"use server";

import { signOut } from "@/auth";
import { cookies } from "next/headers"; // Import Next.js cookies to clear session

export const logOut = async () => {
    // Clear all authentication-related cookies
    cookies().delete("next-auth.session-token"); 
    cookies().delete("next-auth.callback-url");  
    cookies().delete("next-auth.csrf-token");  
    cookies().delete("next-auth.state");  

    // Sign out without redirecting
    await signOut({ redirect: false });

    return { success: true };
};
