import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (
    email: string, 
    name: string, 
    token: any
) => {
    const confirmationLink = `https://www.defbots.ai/verify-token?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@defbots.ai>',
        to: email,
        bcc: "support@defbots.ai",
        subject: 'Email Confirmation',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Confirmation</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f9f9f9;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: rgba(165, 42, 90, 0.8);
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                    }
                    .header img {
                        max-width: 100px;
                        margin-bottom: 10px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .content a {
                        color: rgba(165, 42, 90, 0.8);
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .footer {
                        background-color: #f3f3f3;
                        color: #666;
                        padding: 10px 20px;
                        text-align: center;
                        font-size: 14px;
                    }
                    .footer a {
                        color: rgba(165, 42, 90, 0.8);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                        <h1>Email Confirmation</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${name},</p>
                        <p>Thank you for signing up for our service. Please verify your email address by clicking the link below:</p>
                        <p><a href="${confirmationLink}">Verify Email</a></p>
                        <p>If you did not request this email, please ignore it.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                        <p><a href="https://www.defbots.ai">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
        `,
    });
};

export const sendResetPasswordLink = async (
    email: string,
    name: string,
    token: any
) => {
    const resetLink = `https://www.defbots.ai/reset-password?token=${token}`;

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@defbots.ai>',
        to: email,
        subject: 'Reset Your Password',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f9f9f9;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: rgba(165, 42, 90, 0.8);
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                    }
                    .header img {
                        max-width: 100px;
                        margin-bottom: 10px;
                    }
                    .header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                    }
                    .content p {
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    .content a {
                        color: rgba(165, 42, 90, 0.8);
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .footer {
                        background-color: #f3f3f3;
                        color: #666;
                        padding: 10px 20px;
                        text-align: center;
                        font-size: 14px;
                    }
                    .footer a {
                        color: rgba(165, 42, 90, 0.8);
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                        <h1>Password Reset</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${name},</p>
                        <p>You recently requested to reset your password. Please click the link below to reset it:</p>
                        <p><a href="${resetLink}">Reset Password</a></p>
                        <p>If you did not request this email, please ignore it or contact support if you have concerns.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                        <p><a href="https://www.defbots.ai">Visit our website</a></p>
                    </div>
                </div>
            </body>
            </html>
        `,
    });
};

export const sendTwoFactorTokenEmail = async (
    email: string,
    token: any
) => {

    await resend.emails.send({
        from: 'Profile Authentication Project <onboarding@defbots.ai>',
        to: email,
        subject: '2FA Confirmation Token',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Two-Factor Authentication Code</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #333;
                }
                .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                background-color: rgba(165, 42, 90, 0.8);
                color: #fff;
                padding: 20px;
                text-align: center;
                }
                .header h1 {
                margin: 0;
                font-size: 24px;
                }
                .content {
                padding: 20px;
                }
                .content p {
                font-size: 16px;
                line-height: 1.5;
                }
                .content .code {
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                background-color: #f3f3f3;
                padding: 10px;
                border-radius: 4px;
                display: inline-block;
                margin-top: 10px;
                }
                .footer {
                background-color: #f3f3f3;
                color: #666;
                padding: 10px 20px;
                text-align: center;
                font-size: 14px;
                }
                .footer a {
                color: rgba(165, 42, 90, 0.8);
                text-decoration: none;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <div class="header">
                <div>
                    <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                </div>
                <h1>Two-Factor Authentication Code</h1>
                </div>
                <div class="content">
                <p>Dear ${email},</p>
                <p>Your Two-Factor Authentication (2FA) code is:</p>
                <p class="code">{{token}}</p>
                <p>Please use this code to complete your login. If you did not request this email, please secure your account immediately.</p>
                </div>
                <div class="footer">
                <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                <p><a href="https://www.defbots.ai">Visit our website</a></p>
                </div>
            </div>
            </body>
            </html>
        `.replace('{{token}}', token),
    })
};

export const sendDepositInitiatedMessage = async (
    email: string,
    amount: string,
    currency: string,
    depositAddr: string
) => {
    const confirmationMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Initiated</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: rgba(165, 42, 90, 0.8);
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 100px;
                    margin-bottom: 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    background-color: #f3f3f3;
                    color: #666;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 14px;
                }
                .footer a {
                    color: rgba(165, 42, 90, 0.8);
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                    <h1>Deposit Initiated</h1>
                </div>
                <div class="content">
                    <p>Dear ${email},</p>
                    <p>We have received your deposit request</p>
                    <p>Amount:<strong>${amount} ${currency}</strong> .</p>
                    <p>Deposit Address:<strong>${depositAddr}</strong> .</p>
                    <p>Your deposit is currently being processed and is awaiting confirmation on the blockchain. This may take a few moments.</p>
                    <p>Once the deposit is confirmed, you will receive another notification, and the funds will be credited to your account.</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                    <p><a href="https://www.defbots.ai">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

    await resend.emails.send({
        from: 'Defbots Notifications <notifications@defbots.ai>',
        to: email,
        bcc: "support@defbots.ai",
        subject: 'Deposit Initiated: Awaiting Confirmation',
        html: confirmationMessage,
    });
};

export const sendDepositCompletedMessage = async (
    email: string, 
    amount: string, 
    currency: string
) => {
    const confirmationMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Deposit Completed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: rgba(34, 139, 34, 0.8);
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 100px;
                    margin-bottom: 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    background-color: #f3f3f3;
                    color: #666;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 14px;
                }
                .footer a {
                    color: rgba(34, 139, 34, 0.8);
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                    <h1>Deposit Completed</h1>
                </div>
                <div class="content">
                    <p>Dear ${email},</p>
                    <p>Your deposit of <strong>${amount} ${currency}</strong> has been successfully confirmed and credited to your account.</p>
                    <p>Thank you for using Defbots. Your updated balance is now available in your portfolio.</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                    <p><a href="https://www.defbots.ai">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

    await resend.emails.send({
        from: 'Defbots Notifications <notifications@defbots.ai>',
        to: email,
        bcc: "support@defbots.ai",
        subject: 'Deposit Completed: Funds Credited',
        html: confirmationMessage,
    });
};

export const sendWithdrawalInitiatedMessage = async (
    email: string, 
    amount: string, 
    currency: string
) => {
    const initiatedMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Initiated</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: rgba(220, 53, 69, 0.9);
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 100px;
                    margin-bottom: 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    background-color: #f3f3f3;
                    color: #666;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 14px;
                }
                .footer a {
                    color: rgba(220, 53, 69, 0.9);
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                    <h1>Withdrawal Initiated</h1>
                </div>
                <div class="content">
                    <p>Dear ${email},</p>
                    <p>Your withdrawal request of <strong>${amount} ${currency}</strong> has been successfully initiated.</p>
                    <p>Please allow some time for the transaction to be processed and confirmed on the blockchain.</p>
                    <p>If you have any questions about the status of your withdrawal, please contact our support team at your earliest convenience.</p>
                    <p>Thank you for choosing Defbots for your financial needs!</p>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                    <p><a href="https://www.defbots.ai">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

    await resend.emails.send({
        from: 'Defbots Notifications <notifications@defbots.ai>',
        to: email,
        bcc: "support@defbots.ai",
        subject: 'Withdrawal Initiated: Processing in Progress',
        html: initiatedMessage,
    });
};


export const sendWithdrawalCompletedMessage = async (
    email: string,
    amount: string,
    currency: string,
    transactionId: string
) => {
    const completedMessage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Withdrawal Completed</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: rgba(0, 123, 255, 0.9);
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                }
                .header img {
                    max-width: 100px;
                    margin-bottom: 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.5;
                }
                .footer {
                    background-color: #f3f3f3;
                    color: #666;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 14px;
                }
                .footer a {
                    color: rgba(0, 123, 255, 0.9);
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://www.defbots.ai/_next/static/media/logo.5a4b0497.png" alt="Defbots Logo" />
                    <h1>Withdrawal Completed</h1>
                </div>
                <div class="content">
                    <p>Dear ${email},</p>
                    <p>We are pleased to inform you that your withdrawal request for <strong>${amount} ${currency}</strong> has been successfully processed and completed.</p>
                    <p>Your funds have been sent to your specified wallet address. The transaction ID is provided below for your reference:</p>
                    <p><strong>Transaction ID:</strong> ${transactionId}</p>
                    <p>If you have any concerns or questions, feel free to reach out to our support team for assistance.</p>
                    <p>Thank you for choosing Defbots for your financial needs.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2025 Defbots.ai. All rights reserved.</p>
                    <p><a href="https://www.defbots.ai">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
    `;

    await resend.emails.send({
        from: 'Defbots Notifications <notifications@defbots.ai>',
        to: email,
        bcc: "support@defbots.ai",
        subject: 'Withdrawal Completed: Funds Transferred',
        html: completedMessage,
    });
};
