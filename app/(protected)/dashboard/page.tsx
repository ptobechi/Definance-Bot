"use client"
import React, { Suspense, useEffect } from "react";
import DashHeader from "../_components/dash-header";
import WalletPortfolio from "../_components/wallet";
import useWalletPortfolio from "@/hooks/useWalletPortfolio";
import { formatToUSD } from "@/_functions";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";


const Dashbaord = () => {
    const role = useCurrentRole();
    const navigate = useRouter();

    useEffect(() => {
        if (role !== "USER") {
            navigate.back(); // Redirects the user to the previous page
        }
    }, [role, navigate]);

    const {totalBalance} = useWalletPortfolio();

    return (
        <section>
            <DashHeader
                title="My Account"
                subTitle="A glance summary of your trading account. Have fun!"
                isButton
            />
            <div
                className="border border-[#dbdfea] h-[150px] rounded-md py-8 px-6 text-white"
                style={{
                    background: "linear-gradient(145deg, #a43862, #4a031f)"
                }}
            >
                <div className="flex gap-x-1 items-center mb-2">
                <h4 className="text-sm xs:text-[1rem] x:text-[1.3rem] mb-1.5 font-medium text-pcolor">
                    Account Balance /
                </h4>
                <button
                    className={`text-[8px] font-semibold text-pcolor flex items-center gap-x-2 px-3 rounded-md border border-[#dbdfea]`}
                >
                    {"usd".toUpperCase()}
                </button>
                </div>
                <h5 className="text-[1.25rem] md:text-[1.5rem] text-mainGreen">
                {formatToUSD(totalBalance)}
                </h5>
            </div>

            <Suspense fallback={<p>Loading feed...</p>}>
                <WalletPortfolio/>
            </Suspense>
        </section>
    )
}
export default Dashbaord;
