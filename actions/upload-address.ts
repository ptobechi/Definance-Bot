"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import Schemas from "@/schema";

export const uploadWalletAddress = async (values: z.infer<typeof
    Schemas.PaymentAddressSchema>) => {
    try{
        const validatedValues = Schemas.PaymentAddressSchema.safeParse(values);

        if (!validatedValues.success)
            return {error: "Invalid fields!"}

        const {symbol, name, address, network} = validatedValues.data;

        const uploadData = await db.paymentWalletAddress.create({
            data: {
                symbol,
                name,
                publicAddress: address,
                network,
            },
        })
        if (uploadData)
            return {success: "Upload Done."}
        else
            return {error: "Upload failed!"}

    } catch {
        return { error: "An unexpected error occurred. Please try again." };
    }
}
