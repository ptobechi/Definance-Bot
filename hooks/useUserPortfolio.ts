"use client"

import useSWR from "swr";
import { privateRequest } from "@/config";

interface UserPortfolio {
    name:               string;
    sector:             string;
    roi:                string;
    amount?:            string;
    opened_date?:       string;
    close_date?:        string;

}
// grab the mutate function from this hook and call it in
// specific places that the transaction updates to fetch 
// fresh data from the backend
const useUserPortfolio = () => {
    const fetcher = (url: string) =>
        privateRequest
            .get<UserPortfolio[]>(`${url}`)
            .then((res) => res.data)
            .catch((err) => {
                throw new Error(err.response?.data?.error || "Failed to fetch data");
            });

    const { data, isLoading, error, mutate } = useSWR(
        "/portfolio",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return { data, isLoading, error, mutate };
};
export default useUserPortfolio;
