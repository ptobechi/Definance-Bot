"use client"

import { FaCircleCheck } from "react-icons/fa6";
import DashHeader from "../_components/dash-header";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { FaArrowLeft } from "react-icons/fa";

const Page = () => {
    const [step, setStep] = useState(0);

    return (
        <>
            <DashHeader
                title="Asset's Recovery"
                subTitle=""
            />

            <div className="relative">
                <article
                    className="border border-mainGreen" 
                >
                    <Card className="w-full mx-auto py-10">
                        <CardHeader>
                            <CardDescription>
                                {
                                    step > 1 && (
                                        <Button
                                            className="text-[0.65rem]"
                                            size="sm"
                                            onClick={() => setStep(0)}
                                        >
                                            <FaArrowLeft/>{" "} Back
                                        </Button>
                                    )
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                step === 0 ?
                                <div>
                                    <span className="absolute text-2xl right-3 top-5 text-primaryColor">
                                        <FaCircleCheck />
                                    </span>
                                    <div className="px-10 text-[#526484] pt-4 pb-6">
                                        <ul className="p-0">
                                            <li className="flex justify-between gap-x-8 items-center text-[0.925rem] mb-1">
                                                <span className="block text-primaryColor text-xl font-bold">Lost your cryptocurrency? </span>
                                            </li>
                                        </ul>
                                        <h6 className="flex items-left text-[0.759rem]">
                                            Our crypto asset recovery service helps you trace and retrieve your lost or stolen 
                                            funds. With expert assistance and cutting-edge technology, 
                                            we work to recover your valuable assets, providing peace of mind in the volatile 
                                            world of cryptocurrencies
                                        </h6>
                                    </div>

                                    <div className="px-10 text-center py-4">
                                        {
                                            <button
                                                onClick={() => setStep(step + 1)}
                                                className="text-center border border-[#dbdfea] bg-secondaryColor py-2 px-5 rounded-md text-planHeading transition-all duration-300 bg-mainGreen text-white"
                                            >
                                            Start Recovery
                                            </button>
                                        }
                                    </div>
                                </div>
                                :
                                step === 1 ?
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">
                                            What currency do you want to recover
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">Random</SelectItem>
                                                <SelectItem value="2">Daily</SelectItem>
                                                <SelectItem value="3">Weekly</SelectItem>
                                                <SelectItem value="4">Monthly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">
                                        Enter wallet address
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">Ethereum</SelectItem>
                                                <SelectItem value="2">Bitcoin</SelectItem>
                                                <SelectItem value="3">Binance Chain</SelectItem>
                                                <SelectItem value="4">None</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                :
                                <>
                                <Label className="text-[0.75rem]">
                                    Ethreum Mainnet Trading Bot utilizes advanced algorithms and 
                                    strategies, this bot aims to seize market opportunities, 
                                    optimize trade execution, and manage risks. 
                                    This smart contract-based bot operates continuously without human 
                                    intervention, ensuring efficient and timely transactions in the dynamic 
                                    crypto market.
                                </Label>
                                <Button className="w-full mt-5">
                                    Connect Wallet 
                                </Button></>
                            }
                        </CardContent>

                        <CardFooter className="flex justify-between">
                            {
                                step > 0 && step < 2 && (
                                    <>
                                    <Button onClick={() => setStep(step - 1)} variant="outline">Prev</Button>
                                        <Button onClick={() => setStep(step + 1)}>Next</Button>
                                    </>
                                )
                            }
                        </CardFooter>
                    </Card>

                </article>
            </div>
        </>
    )
}
export default Page;