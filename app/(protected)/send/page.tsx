"use client"

import { transaction } from "@/actions/transactions"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import schema from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const DepositPage = () => {
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof schema.PaymentSchema>>({
        resolver: zodResolver(schema.PaymentSchema),
        defaultValues: {
            amount: "",
            from: "usdt",
            to: "",
            type: "transfer",
            network: "",
        }
    })

    const onSubmit = (values: z.infer<typeof
        schema.PaymentSchema>) => {
            
            setLoading(true)

            startTransition(() => {
                transaction(values)
                    .then((data) => {
                        if (data?.error) {
                            // set message
                            toast.error(data.error)
                        }
                        if (data?.success) {
                            toast.success(data.success);
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        }
                        setLoading(false)
                    })
                    .catch(() => {
                        toast.error("Unable to complete transaction at this time, please try again later")
                        setLoading(false)
                    });
            })
    }

    return (
        <PaymentCardWrapper
            headerLabel="Transfer"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver Address</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="receiver address" {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
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
                    <Button
                        type="submit"
                        className="w-full h-10"
                        disabled={isPending}
                    >
                        {
                            !loading ? "Transfer" : "processing"
                        }
                    </Button>
                </form>
            </Form>
        </PaymentCardWrapper>
    )
}
export default DepositPage