import { optional, z } from "zod";

/**
 * login form validation schema
 */
const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: optional(z.string())
})

/**
 * register form validation schema
 */
const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "A min of 6 characters is required"
    })
})

/**
 * register form validation schema
 */
const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

/**
 * payment form validation schema
 */
const PaymentSchema = z.object({
    from: z.string({
        message: "Kindly select a prefered currency"
    }),
    to: z.string({
        message: "Required"
    }),
    amount: z.string({
        message: "Amount is required"
    }),
    type: z.string(),
    network: z.string()
})

const PortfolioSchema = z.object({
    name: z.string({
        message: "portfolio name"
    }),
    sector: z.string({
        message: "sector"
    }),
    amount: z.string({
        message: "amount"
    }),
    roi: z.string({
        message: "Daily ROI"
    }),
    closing_date: z.string({
        message: "closing date"
    }),
    userid: optional(z.string())
})

export default {
    LoginSchema,
    RegisterSchema,
    ResetSchema,
    PaymentSchema,
    PortfolioSchema,
}
