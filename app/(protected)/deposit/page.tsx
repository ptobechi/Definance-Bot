"use client"

import PaymentCardWrapper from "@/components/dashbaord/payment-card-wrapper"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import schema from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CopyIcon } from "@radix-ui/react-icons"
import {useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import QRCode from "react-qr-code";
import { transaction } from "@/actions/transactions"
import { toast } from "sonner"

const DepositPage = () => {

    const [isPending, startTransition] = useTransition()
    const [completePayment, setCompletePayment] = useState(false)
    // const [paymentAddr, setPaymentAddr] = useState<string | undefined>()

    const form = useForm<z.infer<typeof schema.PaymentSchema>>({
        resolver: zodResolver(schema.PaymentSchema),
        defaultValues: {
            amount: "100",
            from: "usdt",
            to: "",
            type: "deposit",
            network: "erc20",
        }
    })

    const onSubmit = (values: z.infer<typeof
        schema.PaymentSchema>) => {
            startTransition(() => {
                transaction(values)
                    .then((data) => {
                        console.log(data)
                        if (data?.error) {
                            // set message
                            toast.error(data.error)
                        }
                        if (data?.paymentAddr) {
                            form.setValue("to", data.paymentAddr)
                            setCompletePayment(true)
                        }
                        if (data?.success) {
                            toast.success(data.success);
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        }
                    })
                    .catch(() => {
                        toast.error("Unable to complete transaction at this time, please try again later")
                    });
            })
    }

    return (
        <PaymentCardWrapper
            headerLabel="Deposit"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    {!completePayment && (<>
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <Select
                                    disabled={isPending}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Currency"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="btc">Bitcoin</SelectItem>
                                        <SelectItem value="usdt">Tether USDT</SelectItem>
                                        <SelectItem value="eth">Ethereum</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="amount" {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Minimum 100.00 USD 
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </>)}
                    {
                        completePayment && (
                            <div className="flex flex-col items-center justify-center gap-5">
                                <div className="bg-white p-2 rounded-md h-[200px] w-[200px] flex items-center justify-center shadow-sm shadow-[#171717]">
                                        <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={form.getValues("to")}
                                            viewBox={`0 0 256 256`}
                                        />
                                </div>

                                <div className="flex items-center space-x-2 w-full">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                        Link
                                        </Label>
                                        <Input
                                            // id="link"
                                            name="to"
                                            placeholder={form.getValues("to")}
                                            readOnly
                                        />
                                    </div>
                                    <Button type="button" size="sm" className="px-3">
                                        <span className="sr-only">Copy</span>
                                        <CopyIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                <FormDescription>
                                    Kindly proceed to make a payment
                                    of {form.getValues("amount")} to the address 
                                    above or scan QRCode
                                </FormDescription>
                            </div>
                        )
                    }

                    <Button
                        type="submit"
                        className="w-full h-10"
                        disabled={isPending}
                    >
                        {
                            completePayment ? "Confirm Deposit" : "Continue to Deposit"
                        }
                    </Button>
                </form>
            </Form>
        </PaymentCardWrapper>
    )
}
export default DepositPage