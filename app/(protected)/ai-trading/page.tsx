"use client"

import { useState } from "react";
import DashHeader from "../_components/dash-header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Page = () => {

    const [step, setStep] = useState(0);

    return (
        <>
            <DashHeader
                title="AI Trading"
                subTitle=""
            />

            <section className="flex justify-center items-center">
                <Card className="w-full mx-auto">
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
                        <form>
                            {
                                step === 0 ? 
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">
                                            What are your primary trading goals
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="next">capital appreciation</SelectItem>
                                                <SelectItem value="sveltekit">income generation</SelectItem>
                                                <SelectItem value="astro">risk management</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">
                                            What is your target annual return?
                                        </Label>
                                        <Input id="name" placeholder="Amount" />
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="framework">Trading Frequency and Style</Label>
                                        <Select>
                                            <SelectTrigger id="framework">
                                            <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="1">high-frequency trading</SelectItem>
                                                <SelectItem value="2">day trading</SelectItem>
                                                <SelectItem value="3">swing trading</SelectItem>
                                                <SelectItem value="4"> long-term investing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                :
                                step === 1 ?
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="framework">How often do you want the bot to execute trades</Label>
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
                                            Which cryptocurrencies or assets do you prefer to trade?
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
                                <CardFooter>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="w-full mt-5" variant="outline">
                                            Connect Wallet
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Oops
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This service is not available at the moment
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                    {/* <Button className="w-full mt-5">
                                        Connect Wallet 
                                    </Button> */}
                                </CardFooter>
                                </>
                            }
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {
                            step < 2 && (
                                <>
                                {
                                    step > 0 && 
                                    <Button onClick={() => setStep(step - 1)} variant="outline">Prev</Button>
                                }
                                    <Button onClick={() => setStep(step + 1)}>Next</Button>
                                </>
                            )
                        }
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}
export default Page;
