import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (
    email: string,
    token: any
) => {
    const confirmationLink = `https://defbots.ai/verify-token?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@resend.dev>',
        to: email,
        subject: 'Email Confirmation',
        html: `<p>Verify email by clicking <a href=${confirmationLink}>Here</a></p>`,
    })
};

export const sendResetPassworLink = async (
    email: string,
    token: any
) => {
    const resetLink = `https://defbots.ai/reset-password?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@resend.dev>',
        to: email,
        subject: 'Reset Your Password',
        html: `<p>Reset your password by clicking <a href=${resetLink}>Here</a></p>`,
    })
};

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: any
) => {

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@resend.dev>',
        to: email,
        subject: '2FA Confirmation Token',
        html: `<p>Your 2FA code: ${token}</p>`,
    })
};
