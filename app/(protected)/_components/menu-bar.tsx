"use client"

import React from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

import logo from '@/img/logo.svg'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/active-user-session'
import { logOut } from '@/actions/logout'


export default function MenuBarMobile({ setter }: any) {
    const onSubmit = () => {
        logOut()
    }

    const user = useCurrentUser();

    return (
        <nav
            className="fixed top-0 left-0 right-0 h-[60px]
                flex [&>*]:my-auto px-2 border bg-white z-50">
            <button
                className="text-4xl flex text-black md:hidden"
                onClick={() => {
                    setter((oldVal: any) => !oldVal);
                }}
            >
                <Icon />
            </button>
            <Link href="/" className="mx-auto md:hidden">
                {/* eslint-disable-next-line */}
                <img
                    src={logo.src}
                    alt="Company Logo"
                    width={50}
                    height={50}
                />
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="text-3xl flex text-black
                            md:ml-auto mr-0 rounded-full 
                            p-4 py-4 items-center justify-center
                        "
                        >
                        <FaUser className='text-lg' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {user?.name}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {/* <DropdownMenuLabel>
                        <Link href={"/profile"}>
                            Profile
                        </Link>
                    </DropdownMenuLabel> */}

                    {/* <DropdownMenuLabel>
                        <Link href={"/activities"}>
                        Activities
                        </Link>
                    </DropdownMenuLabel> */}

                    <DropdownMenuLabel>
                        <div
                            onClick={onSubmit}
                            className={`flex gap-1 cursor-pointer [&>*]:my-auto text-md `}
                        >
                            <div>Log Out</div>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}