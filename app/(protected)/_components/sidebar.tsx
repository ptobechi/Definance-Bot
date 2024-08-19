"use client"

import React, { Dispatch, SetStateAction } from 'react'
import logo from '@/img/logo.svg'
import { usePathname } from 'next/navigation'
import {
    FcCandleSticks,
    FcComboChart,
    FcCurrencyExchange,
    FcDataRecovery,
    FcHome,
    FcSteam,
} from 'react-icons/fc'
import { PiBagFill} from 'react-icons/pi'
import { IoLogOut } from 'react-icons/io5'
import {signOut } from "next-auth/react";
import Link from 'next/link'

interface sidebarProps {
    show: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
}
interface menuProps {
    icon: React.ReactNode;
    name: string;
    route: string;
    onClick?: () => void; // Optional onClick property
}
export default function Sidebar({ show, setter }: sidebarProps) {
    const router = usePathname();

    const onSubmit = () => {
        signOut()
    }

    // Define our base class
    const className = "z-50 bg-sideBarColor w-[250px] h-full transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }: menuProps) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router === route ? "text-white" : "text-white/50 hover:text-white";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter((oldVal) => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter((oldVal: any) => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}
                style={{
                    background: "linear-gradient(135deg, #6c1638, #4a031f)"
                }}
            >
                <div className="p-2 flex">
                    <Link href="/dashboard">
                        {/*eslint-disable-next-line*/}
                        <img
                            src={logo.src}
                            alt="Company Logo"
                            width={200}
                            height={200}
                        />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Home"
                        route="/dashboard"
                        icon={<FcHome />}
                    />
                    <MenuItem
                        name="Stock Market"
                        route="/stock-market"
                        icon={<FcCandleSticks />}
                    />
                    <MenuItem
                        name="Investment"
                        route="/investment"
                        icon={<FcSteam />}
                    />
                    <MenuItem
                        name="AI Bot"
                        route="/ai-trading"
                        icon={<FcComboChart />}
                    />
                    <MenuItem
                        name="Assets Recovery"
                        route="/recovery"
                        icon={<FcDataRecovery />}
                    />
                    <MenuItem
                        name="Convert"
                        route="/convert"
                        icon={<FcCurrencyExchange />}
                    />
                    <MenuItem
                        name="Portfolio"
                        route="/portfolio"
                        icon={<PiBagFill />}
                    />
                    <div
                        onClick={onSubmit}
                        className={`flex gap-1 text-[#b1a3a3] cursor-pointer [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10`}
                    >
                        <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                            <IoLogOut />
                        </div>
                        <div>Log Out</div>
                    </div>
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}