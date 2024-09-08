import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Definance Bot :: Financial Assets Holding and Recovery Market Place",
  description: `Definance Bot investment management brings you a 
        comprehensive System designed to streamline and optimize your inventory 
      control processes. Elevate your business with 
      Definance Bot – Your Partner in Seamless investment Management`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();

  return (
    <html lang="en">
        <body className={inter.className}>
          <SessionProvider session={session}>
              {children}
              <Toaster />
          </SessionProvider>
        </body>
    </html>
  );
}
