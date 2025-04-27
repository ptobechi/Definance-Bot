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
import { useRouter } from "next/navigation"
import {
    useEffect,
    useState,
    useTransition
} from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const ConvertPage = () => {

    const [isPending, startTransition] = useTransition()
    const [completePayment, setCompletePayment] = useState(false)
    const[loading, setLoading] = useState(false);
    const router = useRouter()

    const form = useForm<z.infer<typeof schema.PaymentSchema>>({
        resolver: zodResolver(schema.PaymentSchema),
        defaultValues: {
            amount: "100",
            from: "btc",
            to: "usdt",
            type: "convert",
            network: "blockchain",
        }
    })

    const handleSubmit = (values: z.infer<typeof
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
                            router.push('/portfolio')
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
            headerLabel="Convert"
        >
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full space-y-6"
                >
                    {!completePayment && (<>
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>From</FormLabel>
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
                                <FormLabel>To</FormLabel>
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
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full h-10"
                    >
                        {
                            loading ? "loading..." : "Convert"
                        }
                        
                    </Button>
                </form>
            </Form>
        </PaymentCardWrapper>
    )
}
export default ConvertPage