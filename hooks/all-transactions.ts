"use client"

import useSWR from "swr";
import { useCurrentUser } from "./active-user-session";
import { privateRequest } from "@/config";

interface AllTransactions {
    id:                         string;
    name:                       string;
    email:                      string;
    phone:                      string;
    status?:                    string;
    password?:                  string;
    accounts?:                  string;
    emailVerified?:             string;
    transactions?:              string;
    cryptoportfolio?:           string;
    userportfolio?:             string;
}

// grab the mutate function from this hook and call it in
// specific places that the transaction updates to fetch 
// fresh data from the backend
const useAllTransaction =  () => {
    const loggedUser = useCurrentUser();

    if (!loggedUser || !loggedUser.id) return {}

    // Define a fetcher that uses the loggedUser.id
    const fetcher = (url: string) => 
        privateRequest.get<AllTransactions[]>(`${url}`).then((res) => res.data);

    // Call useSWR with the key, fetcher, and config object
    const { data, isLoading, error, mutate } = useSWR(
        "/all-transaction/",
        fetcher,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        }
    );

    
    return { data, isLoading, error };
};

export default useAllTransaction;
