"use client";

import useSWR from "swr";
import { privateRequest } from "@/config";

interface AllTransactions {
    id: string;
    name: string;
    email: string;
    phone: string;
    status?: string;
    password?: string;
    accounts?: string;
    emailVerified?: string;
    transactions?: string;
    cryptoportfolio?: string;
    userportfolio?: string;
}

const useAllTransaction = () => {
    // Define the fetcher function
    const fetcher = async (url: string) => {
        try {
            const response = await privateRequest.get<AllTransactions[]>(url);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || "An unexpected error occurred");
            } else if (typeof error === "object" && error !== null && "response" in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                throw new Error(axiosError.response?.data?.error || "Failed to fetch transactions");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    // Use SWR for data fetching
    const { data, error, mutate, isValidating } = useSWR(
        "/all-transaction/", // Dynamic key based on user
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

export default useAllTransaction;
