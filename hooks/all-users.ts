"use client"

import useSWR from "swr";
import { useCurrentUser } from "./active-user-session";
import { privateRequest } from "@/config";

interface Transaction {
    userid:                     string;
    transaction_type:           string;
    transaction_amount:         string;
    transaction_date:           string;
    transaction_status:         string;
    transaction_info:           string;
}

interface Portfolio {
    crypto_bal:              string;
    crypto_name:             string;
    crypto_prev_bal:         string;
    crypto_symbol:           string;
    id:                      string;
    userid:                  string;
}

interface userPortfolio {
    name:           string;
    userid:         string;
    sector:         string;
    roi:            string;
    amount:         string;
    opened_date:    string;
    close_date:     string;
}

interface PaymentAddress {
    id:                     string;
    name:                   string;
    network:                string;
    symbol:                 string;
    publicAddress:          string;
}

interface UserPortfolio {
    id:                         string;
    name:                       string;
    email:                      string;
    phone:                      string;
    status?:                    string;
    password?:                  string;
    accounts?:                  string;
    emailVerified?:             string;
    transactions:               Transaction[];
    cryptoPortfolio:           Portfolio[];
    userPortfolio:             userPortfolio[];
}

// grab the mutate function from this hook and call it in
// specific places that the transaction updates to fetch 
// fresh data from the backend
const useAllUser =  () => {
    const loggedUser = useCurrentUser();

    if (!loggedUser || !loggedUser.id) return {}

    // Define a fetcher that uses the loggedUser.id
    const fetcher = (url: string) => 
        privateRequest.get<UserPortfolio[]>(`${url}`).then((res) => res.data);

    // Call useSWR with the key, fetcher, and config object
    const { data, isLoading, error, mutate } = useSWR(
        "/all-users/",
        fetcher,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        }
    );

    
    return { data, isLoading, error };
};

export default useAllUser;
