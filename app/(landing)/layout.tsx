import type { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/landing/footer";
import Header from "@/components/header";


export const metadata: Metadata = {
  title: "Definance Bot :: Financial Assets Holding and Recovery Market Place",
  description: `Definance Bot investment management brings you a comprehensive System designed to streamline and optimize your inventory 
      control processes. Elevate your business with Definance Bot – Your Partner in Seamless 
      investment Management`,
};

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Header />
      {children}
      <Footer />
      <Toaster />
    </SessionProvider>
  );
}
