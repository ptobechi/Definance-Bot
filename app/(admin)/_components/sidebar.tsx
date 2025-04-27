"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import logo from '@/img/logo.png'
import { usePathname, useRouter } from 'next/navigation'
import {
    FcHome,
} from 'react-icons/fc'
import { IoLogOut } from 'react-icons/io5'
import Link from 'next/link'
import { BiTable } from 'react-icons/bi'
import { FaBitcoinSign, FaFileInvoiceDollar } from 'react-icons/fa6'
import { logOut } from '@/actions/logout'

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
    const nrouter = useRouter();
    const [isPending, setIsPending] = useState(false)

    const handleLogout = async () => {
        setIsPending(true)
        const result = await logOut();
        
        if (result?.success) {
            nrouter.refresh(); // Force session refresh after logout
        }
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
                    <Link href="/admin">
                        {/*eslint-disable-next-line*/}
                        <img
                            src={logo.src}
                            alt="Defbots"
                            width={200}
                            height={200}
                        />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Home"
                        route="/admin"
                        icon={<FcHome />}
                    />
                    {/* <MenuItem
                        name="Users"
                        route="/users"
                        icon={<FaUserCheck />}
                    /> */}
                    <MenuItem
                        name="Transactions"
                        route="/transactions"
                        icon={<BiTable />}
                    />
                    <MenuItem
                        name="Investments"
                        route="/investment-table"
                        icon={<FaFileInvoiceDollar />}
                    />
                    <MenuItem
                        name="Deposit Address"
                        route="/addresses"
                        icon={<FaBitcoinSign />}
                    />
                    <div
                        onClick={handleLogout}
                        className={`flex gap-1 text-[#b1a3a3] cursor-pointer [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10`}
                    >
                        <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                            <IoLogOut />
                        </div>
                        <div>{isPending ? "Logging Out" : "Log Out"} </div>
                    </div>
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}