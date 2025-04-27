"use client"

import useSWR from "swr";
import { privateRequest } from "@/config";
import { useEffect, useState } from "react";
// import { coinDetail } from "@/_functions";

interface CryptoPortfolio {
    crypto_name:            string;
    crypto_symbol:          string;
    crypto_bal:             string;
    crypto_prev_bal?:       string;
    logo_url?:              string;
    usd_balance?:           string;
    crypto_rate?:           string;
}

// grab the mutate function from this hook and call it in
// specific places that the transaction updates to fetch 
// fresh data from the backend
const useWalletPortfolio =  () => {
    // const loggedUser = useCurrentUser();
    const [wallet, setWallet] = useState<CryptoPortfolio[]>([]);
    const [totalBalance, setTotalBalance] = useState(0)

    // Define a fetcher that uses the loggedUser.id
    const fetcher = (url: string) => 
        privateRequest.get<CryptoPortfolio[]>(`${url}`).then((res) => res.data);

    // Call useSWR with the key, fetcher, and config object
    const { data, isLoading, error, mutate } = useSWR(
        "/wallet-portfolio/",
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    useEffect(() => {
        const getWalletPortfolio = async () => {
            const walletInfo: CryptoPortfolio[] = [];
            let totalBal = 0;

            // if (data) {
            //     for (let i = 0; i < data.length; i++) {
            //         const coinInfo = await (await coinDetail(data[i].crypto_symbol)).json()
                    
            //         const usdBal: any = parseFloat(data[i].crypto_bal) * parseFloat(coinInfo.rate);
            //         totalBal += parseFloat(usdBal);

            //         walletInfo.push({
            //             crypto_name: coinInfo.name,
            //             crypto_symbol: data[i].crypto_symbol,
            //             crypto_bal: Number.isInteger(data[i].crypto_bal) ? data[i].crypto_bal : parseFloat(data[i].crypto_bal).toFixed(5),
            //             usd_balance: (parseFloat(data[i].crypto_bal) * parseFloat(coinInfo.rate)).toString(),
            //             crypto_rate: (coinInfo.rate).toString(),
            //             logo_url: coinInfo.webp64,
            //         });
            //     }
            // }
            // setTotalBalance(totalBal)
            // setWallet(walletInfo);

            if (data) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data)
                    totalBal += parseFloat(data[i].crypto_bal);
                    walletInfo.push({
                        crypto_name: data[i].crypto_name,
                        crypto_symbol: data[i].crypto_symbol,
                        crypto_bal: data[i].crypto_bal,
                        usd_balance: data[i].crypto_bal,
                        crypto_rate: "",
                        logo_url: `/${data[i].crypto_symbol}.webp`
                    })
                }
            }
            setTotalBalance(totalBal)
            setWallet(walletInfo);
        }
        getWalletPortfolio()
    }, [data])

    
    return { data, wallet, isLoading, totalBalance, error };
};

export default useWalletPortfolio;
