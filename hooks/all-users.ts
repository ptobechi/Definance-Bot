"use client";

import useSWR from "swr";
import { privateRequest } from "@/config";

interface Transaction {
    userid: string;
    id: string;
    transaction_type: string;
    transaction_amount: string;
    transaction_date: string;
    transaction_status: string;
    transaction_info: string;
}

interface Portfolio {
    crypto_bal: string;
    crypto_name: string;
    crypto_prev_bal: string;
    crypto_symbol: string;
    id: string;
    userid: string;
}

interface userPortfolio {
    name: string;
    id: string;
    userid: string;
    sector: string;
    roi: string;
    amount: string;
    opened_date: string;
    close_date: string;
}

interface PaymentAddress {
    id: string;
    name: string;
    network: string;
    symbol: string;
    publicAddress: string;
}

interface UserPortfolio {
    id: string;
    name: string;
    email: string;
    phone: string;
    status?: string;
    password?: string;
    accounts?: string;
    emailVerified?: string;
    transactions: Transaction[];
    cryptoPortfolio: Portfolio[];
    userPortfolio: userPortfolio[];
}

const useAllUser = () => {

    // Define the fetcher function
    const fetcher = async (url: string) => {
        try {
            const response = await privateRequest.get<UserPortfolio[]>(url);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || "An unexpected error occurred");
            } else if (typeof error === "object" && error !== null && "response" in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                throw new Error(axiosError.response?.data?.error || "Failed to fetch user data");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    // Use SWR for data fetching
    const { data, error, mutate, isValidating } = useSWR(
        "/all-users/", // Use a dynamic key
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return {
        data,
        isLoading: !error && !data && isValidating,
        error,
        mutate,
    };
};

export default useAllUser;
