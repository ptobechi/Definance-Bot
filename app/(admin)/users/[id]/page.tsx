"use client";
import { useParams } from "next/navigation";
import {
    BellRing,
    Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/user";
import { useEffect, useState, useTransition } from "react";
import { coinDetail, formatToUSD } from "@/_functions";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { 
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import FormError from "@/components/form-error";
import FormSucces from "@/components/form-success";

interface CryptoPortfolio {
    crypto_name:            string;
    crypto_symbol:          string;
    crypto_bal:             string;
    crypto_prev_bal?:       string;
    logo_url?:              string;
    usd_balance?:           string;
    crypto_rate?:           string;
}


const Page = () => {
    const param = useParams();
    const id = Array.isArray(param.id) ? param.id[0] : param.id;
    const {data: user, isLoading, error} = useUser(id);
    const [walletBal, setWalletBal] = useState(0);
    const [wallet, setWallet] = useState<CryptoPortfolio[]>();
    const [investmentSum, setInvestmentSum] = useState(0);
    const [isPending, startTransition] = useTransition()
    const [error_msg, setErrorMsg] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    useEffect(() => {
        const getWalletPortfolio = async () => {
            const walletInfo: CryptoPortfolio[] = [];
            let totalBal = 0;

            if (user && user.cryptoPortfolio) {
                for (let i = 0; i < user.cryptoPortfolio.length; i++) {
                    const coinInfo = await (await coinDetail(user.cryptoPortfolio[i].crypto_symbol)).json()
                    
                    const usdBal: any = parseFloat(user.cryptoPortfolio[i].crypto_bal) * parseFloat(coinInfo.rate);
                    totalBal += parseFloat(usdBal);

                    walletInfo.push({
                        crypto_name: coinInfo.name,
                        crypto_symbol: user.cryptoPortfolio[i].crypto_symbol,
                        crypto_bal: Number.isInteger(user.cryptoPortfolio[i].crypto_bal) ? user.cryptoPortfolio[i].crypto_bal : parseFloat(user.cryptoPortfolio[i].crypto_bal).toFixed(5),
                        usd_balance: (parseFloat(user.cryptoPortfolio[i].crypto_bal) * parseFloat(coinInfo.rate)).toString(),
                        crypto_rate: (coinInfo.rate).toString(),
                        logo_url: coinInfo.webp64,
                    });
                }
            }
            setWalletBal(totalBal)
            setWallet(walletInfo);
        }
        getWalletPortfolio()
    }, [user])

    return (
        <Card className="w-full">
            <CardHeader>
            <CardTitle>
                Profile Information {isLoading && "Loading..."}
                {error && !user && (<> <br /><br />
                    <span className="text-red-600">
                        unable to load data at this moment, 
                        kindly refresh the page and check internet connectivity
                    </span>
                </>)}
            </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <BellRing />
                    <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                        2FA
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Require 2fa auth.
                    </p>
                    </div>
                    <Switch checked={user?.isTwoFactorEnabled ? true : false} />
                </div>
                <div>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                            {/* Name Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter Name"
                                    defaultValue={user?.name}
                                />
                            </div>

                            {/* Framework Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter Email"
                                    defaultValue={user?.email}
                                />
                            </div>

                            {/* Second Row - Name Input */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    placeholder="Enter Password"
                                    defaultValue={user?.password}
                                />
                            </div>

                            {/* Second Row - Framework Select */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="status">Account Status</Label>
                                <Input
                                    id="status"
                                    placeholder="Status"
                                    defaultValue={user?.emailVerified ? "active" : "not active"}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Wallet Portfolio
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatToUSD(walletBal)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-full">
                                <AlertDialogTitle>Wallet Portfolio</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user wallet portfolio
                                </AlertDialogDescription>
                                <form className="space-y-8">
                                    {
                                        wallet?.map((data, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`address-${index}`}>
                                                    {data.crypto_name.toUpperCase()}
                                                </Label>

                                                <div className="flex items-center gap-2">
                                                    {/* "Use" Label Before the First Input */}
                                                    <Label htmlFor={`address-${index}`} className="text-sm font-medium">
                                                        USD
                                                    </Label>
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.usd_balance}
                                                        disabled={isPending}
                                                    />
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.crypto_bal}
                                                        disabled={true}
                                                    />
                                                    {/* Crypto Symbol After the Second Input */}
                                                    <span className="text-sm font-medium">
                                                        {data.crypto_symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    }

                                    <FormError message={error_msg}/>
                                    <FormSucces message={success}/>

                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button className="mx-5" disabled={isPending} type="submit">Submit</Button>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Investment Portfolio
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatToUSD(investmentSum)}
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-full">
                                <AlertDialogTitle>Wallet Portfolio</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user wallet portfolio
                                </AlertDialogDescription>
                                <form className="space-y-8">
                                    {
                                        wallet?.map((data, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`address-${index}`}>
                                                    {data.crypto_name.toUpperCase()}
                                                </Label>

                                                <div className="flex items-center gap-2">
                                                    {/* "Use" Label Before the First Input */}
                                                    <Label htmlFor={`address-${index}`} className="text-sm font-medium">
                                                        USD
                                                    </Label>
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.usd_balance}
                                                        disabled={isPending}
                                                    />
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.crypto_bal}
                                                        disabled={true}
                                                    />
                                                    {/* Crypto Symbol After the Second Input */}
                                                    <span className="text-sm font-medium">
                                                        {data.crypto_symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    }

                                    <FormError message={error_msg}/>
                                    <FormSucces message={success}/>

                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button className="mx-5" disabled={isPending} type="submit">Submit</Button>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>

                <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Transactions
                        </p>
                    </div>
                    <DropdownMenu>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    View All
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-full">
                                <AlertDialogTitle>Wallet Portfolio</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is a user wallet portfolio
                                </AlertDialogDescription>
                                <form className="space-y-8">
                                    {
                                        wallet?.map((data, index) => (
                                            <div key={index} className="grid w-full items-center gap-1.5">
                                                <Label htmlFor={`address-${index}`}>
                                                    {data.crypto_name.toUpperCase()}
                                                </Label>

                                                <div className="flex items-center gap-2">
                                                    {/* "Use" Label Before the First Input */}
                                                    <Label htmlFor={`address-${index}`} className="text-sm font-medium">
                                                        USD
                                                    </Label>
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.usd_balance}
                                                        disabled={isPending}
                                                    />
                                                    <Input
                                                        id={`address-${index}`}
                                                        placeholder="Address"
                                                        type="text"
                                                        defaultValue={data.crypto_bal}
                                                        disabled={true}
                                                    />
                                                    {/* Crypto Symbol After the Second Input */}
                                                    <span className="text-sm font-medium">
                                                        {data.crypto_symbol.toUpperCase()}
                                                    </span>
                                                </div>
                                                <hr />
                                            </div>
                                        ))
                                    }

                                    <FormError message={error_msg}/>
                                    <FormSucces message={success}/>

                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <Button className="mx-5" disabled={isPending} type="submit">Submit</Button>
                                </form>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenu>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Update Profile <Check />
                </Button>
            </CardFooter>
        </Card>
    )

}
export default Page;
