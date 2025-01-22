"use client";

import useSWR from "swr";
import { privateRequest } from "@/config";

interface PaymentAddress {
    id: string;
    name: string;
    network: string;
    symbol: string;
    publicAddress?: string;
}

// Hook to fetch all payment addresses
const useAllPaymentAddress = () => {
    // Define the fetcher function
    const fetcher = async (url: string) => {
        try {
            const response = await privateRequest.get<PaymentAddress[]>(url);
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message || "An unexpected error occurred");
            } else if (typeof error === "object" && error !== null && "response" in error) {
                const axiosError = error as { response?: { data?: { error?: string } } };
                throw new Error(axiosError.response?.data?.error || "Failed to fetch payment addresses");
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    // Use SWR to fetch data
    const { data, error, mutate, isValidating } = useSWR(
        "/all-wallet/", // Dynamic key based on user
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

export default useAllPaymentAddress;
