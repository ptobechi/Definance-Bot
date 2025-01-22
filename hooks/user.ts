"use client";

import useSWR from "swr";
import { privateRequest } from "@/config";

interface Transaction {
    userid: string;
    transaction_type: string;
    transaction_amount: string;
    transaction_date: string;
    transaction_info: string;
    transaction_status: string;
}

interface Portfolio {
    crypto_bal: string;
    crypto_name: string;
    crypto_prev_bal: string;
    crypto_symbol: string;
    id: string;
    userid: string;
}

interface UserPortfolioDetails {
    name: string;
    sector: string;
    roi: string;
    amount: string;
    opened_date: string;
    close_date: string;
}

interface UserPortfolio {
    id: string;
    name: string;
    email: string;
    phone: string;
    status?: string;
    isTwoFactorEnabled?: string;
    password?: string;
    accounts?: string;
    emailVerified?: string;
    transactions: Transaction[];
    cryptoPortfolio?: Portfolio[];
    userPortfolio?: UserPortfolioDetails[];
}

// The hook to fetch user data
const useUser = (id?: string) => {

    // Define the fetcher function
    const fetcher = async (url: string) => {
        try {
            const response = await privateRequest.get<UserPortfolio>(`${url}/${id}`);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                // Handle the error as a standard JavaScript Error object
                throw new Error(error.message || "An unexpected error occurred");
            } else if (typeof error === "object" && error !== null && "response" in error) {
                // Handle specific error structure (like Axios response errors)
                const axiosError = error as { response?: { data?: { error?: string } } };
                throw new Error(axiosError.response?.data?.error || "Failed to fetch user data");
            } else {
                // Fallback for unknown error types
                throw new Error("An unexpected error occurred");
            }
        }
    };

    // Use SWR for data fetching
    const { data, error, mutate, isValidating } = useSWR(`/all-users`, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    // Consistent return structure
    return {
        data,
        isLoading: !error && !data && isValidating,
        error,
        mutate,
    };
};

export default useUser;
