"use client"

import useSWR from "swr";
import { useCurrentUser } from "./active-user-session";
import { privateRequest } from "@/config";


interface PaymentAddress {
    id:                         string;
    name:                       string;
    network:                    string;
    symbol:                     string;
    publicAddress?:             string;
}

// grab the mutate function from this hook and call it in
// specific places that the transaction updates to fetch 
// fresh data from the backend
const useAllPaymentAddress =  () => {
    const loggedUser = useCurrentUser();

    if (!loggedUser || !loggedUser.id) return {}

    // Define a fetcher that uses the loggedUser.id
    const fetcher = (url: string) => 
        privateRequest.get<PaymentAddress[]>(`${url}`).then((res) => res.data);

    // Call useSWR with the key, fetcher, and config object
    const { data, isLoading, error, mutate } = useSWR(
        "/all-wallet/",
        fetcher,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        }
    );

    
    return { data, isLoading, error };
};

export default useAllPaymentAddress;
