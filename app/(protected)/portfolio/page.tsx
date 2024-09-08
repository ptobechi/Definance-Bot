"use client"

import DashHeader from "../_components/dash-header";
import { calculateProfit, formatToUSD } from "@/_functions";
import ClockTimer from "@/components/dashbaord/clock-timer";
import useUserPortfolio from "@/hooks/useUserPortfolio";

const Page = () => {
    const {data: portfolio, isLoading, error} = useUserPortfolio()
    
    return (
        <>
            <DashHeader
                title="Portfolio"
                subTitle="Active Portfolio"
            />
            <p className="text-[#8094ae] font-normal text-sm md:text-base mb-6">
                <ClockTimer/>
            </p>

            {error && (
                <p className="text-pcolor text-base">
                Couldn't fetch portfolio, Try again later!
                </p>
            )}
            {isLoading && (
                <div className="flex items-center mt-6 ml-3">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-mainGreen border-solid"></div>
                </div>
            )}

            {!isLoading && !error && portfolio && portfolio.length > 0 && (
                <div className="border border-[#dbdfea] rounded-md">
                    {portfolio.map((data, index) => (
                        <div
                            className={`flex items-center justify-between p-6 border-b border-[#dbdfea] ${
                                index === portfolio.length - 1 ? "border-b-0" : ""
                            }`}
                            key={index}
                        >
                            <div className="flex flex-col">
                                <p className="text-sm md:text-base text-primaryColor font-medium">
                                    {data.name}
                                </p>
                                <p className="text-[0.75rem] font-semibold text-pcolor">
                                    {data.sector}
                                </p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-medium text-sideBg text-base">
                                        {formatToUSD(data.amount)}
                                    </h1>
                                    <p className="text-pcolor text-sm text-green-500">
                                        {data.amount && data.opened_date && data.close_date && data.roi &&
                                            formatToUSD(calculateProfit(data.amount, data.opened_date, data.close_date, data.roi))
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
export default Page;