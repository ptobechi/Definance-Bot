"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter to refresh the session
import DashHeader from "../_components/dash-header";
import WalletPortfolio from "../_components/wallet";
import useWalletPortfolio from "@/hooks/useWalletPortfolio";
import { formatToUSD } from "@/_functions";
import { useCurrentUser } from "@/hooks/active-user-session";
import Reload from "../_components/reload";

const Dashboard = () => {
    const router = useRouter();
    const user = useCurrentUser();
    const { totalBalance } = useWalletPortfolio();
    const [currentUser, setCurrentUser] = useState(user);
    
    // Force session refresh when user is undefined
    useEffect(() => {
        if (!user) {
            router.refresh(); // Forces Next.js to re-fetch session
        } else {
            setCurrentUser(user); // Update state when user is available
        }
    }, [user, router]);

    // Show loading state only if user data is still missing after refresh
    if (!currentUser) {
        return <Reload />
    }

    return (
        <section>
            <DashHeader
                title={`Welcome, ${currentUser.name}`}
                subTitle="A glance summary of your trading account. Have fun!"
                isButton
            />

            {/* Account Balance Card */}
            <div
                className="border border-[#dbdfea] h-[150px] rounded-md py-8 px-6 text-white"
                style={{
                    background: "linear-gradient(145deg, #a43862, #4a031f)",
                }}
            >
                <div className="flex gap-x-1 items-center mb-2">
                    <h4 className="text-sm xs:text-[1rem] x:text-[1.3rem] mb-1.5 font-medium text-pcolor">
                        Account Balance /
                    </h4>
                    <button
                        className="text-[8px] font-semibold text-pcolor flex items-center gap-x-2 px-3 rounded-md border border-[#dbdfea]"
                    >
                        USD
                    </button>
                </div>
                <h5 className="text-[1.25rem] md:text-[1.5rem] text-mainGreen">
                    {totalBalance !== undefined ? formatToUSD(totalBalance) : "Loading..."}
                </h5>
            </div>

            {/* WalletPortfolio Component */}
            <WalletPortfolio />
        </section>
    );
};

export default Dashboard;
