import React from "react";
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "../ui/card";
import { Button } from "../ui/button";

interface PaymentCardWrapperProps {
    headerLabel: string
    children: React.ReactNode
    walletconnect?: boolean
}
const PaymentCardWrapper = ({
    headerLabel,
    children,
    walletconnect
}: PaymentCardWrapperProps) => {
    return (
        <Card className="md:w-[550px] mx-auto shadow-md justify-center items-center">
            <CardHeader className="text-center text-2xl font-extrabold">
                {headerLabel}
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>

            <CardFooter>
                {
                    walletconnect && (
                        <Button>
                            Wallet Connect
                        </Button>
                    )
                }
            </CardFooter>
        </Card>
    )
}
export default PaymentCardWrapper;