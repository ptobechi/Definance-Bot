"use client"

import { formatToUSD } from "@/_functions"
import ClockTimer from "@/components/dashbaord/clock-timer";
import useWalletPortfolio from "@/hooks/useWalletPortfolio";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import { PiArrowDownLeft } from "react-icons/pi";

const WalletPortfolio = () => {
    const {data: db_wallet, wallet, isLoading, error} = useWalletPortfolio()

    return (
        <section className="mb-5">
            <h4 className="text-xl mb-1.5 font-bold text-sideBg mt-6">
                Wallet Portfolio
            </h4>
            <p className="text-[#8094ae] font-normal text-sm md:text-base mb-6">
                <ClockTimer/>
            </p>
            {isLoading && (
                <div className="col-12  d-flex justify-content-center">
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}

            {!isLoading && wallet && wallet.length > 0 && (
                <div className="grid md:grid-cols-2 xls:grid-cols-3 gap-4">
                    {wallet.map((w, index) => (
                        <div
                            className="w-full border border-[#dbdfea] rounded-md shadow-md"
                            key={index}
                            >
                            <div className="py-4 px-6 border-b border-[#dbdfea]">
                                <h2 className="flex items-center mb-2 text-gray-800">
                                <span className="pr-2 text-[1.5rem] md:text-[1.8rem]">
                                    <img
                                        src={w.logo_url}
                                        width={25}
                                        height={25}
                                        alt={w.crypto_symbol}
                                        srcSet=""
                                        />
                                    </span>
                                    {w.crypto_name}
                                </h2>

                                <p className="font-semibold text-sideBg text-lg md:text-2xl mb-1">
                                {formatToUSD(w.usd_balance)} <span className="text-sm text-pcolor">USD</span>
                                </p>
                                <p className="text-sideBg text-base font-medium">
                                {w.crypto_bal}{" "}
                                <span className="text-pcolor font-normal">
                                    {w.crypto_symbol.toUpperCase()}
                                </span>
                                </p>
                            </div>
                            <div className="px-3 xs:px-6 py-4 flex justify-between text-sm xs:text-base text-gray-600">
                                <Link href={"/deposit"} className="flex items-center gap-x-2">
                                    <PiArrowDownLeft color="#00BD6F" />
                                    Deposit
                                </Link>
                                <Link href={"/send"} className="flex items-center gap-x-2">
                                    <PiArrowUpRight color="#00BD6F" />
                                    Withdraw
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && !error && wallet && wallet.length === 0 && (
                <div className="col-12  d-flex justify-content-center">
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </section>
    )
}
export default WalletPortfolio
