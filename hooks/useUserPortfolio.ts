"use client"

import useSWR from "swr";
import { useCurrentUser } from "./active-user-session";
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
const useUserPortfolio =  () => {
    const loggedUser = useCurrentUser();

    // if (!loggedUser || !loggedUser.id) return {}


    // Define a fetcher that uses the loggedUser.id
    const fetcher = (url: string) => 
        privateRequest.get<UserPortfolio[]>(`${url}/${loggedUser?.id}`).then((res) => res.data);

    // Call useSWR with the key, fetcher, and config object
    const { data, isLoading, error, mutate } = useSWR(
        "/portfolio/",
        fetcher,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        }
    );

    
    return { data, isLoading, error };
};

export default useUserPortfolio;
