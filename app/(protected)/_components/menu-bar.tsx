"use client"
import React from 'react'
import Link from 'next/link'
import { FiMenu as Icon } from 'react-icons/fi'
import { FaUser } from 'react-icons/fa'

import logo from '@/img/logo.svg'

export default function MenuBarMobile({ setter }: any) {
    return (
        <nav
            className="fixed top-0 left-0 right-0 h-[60px]
                flex [&>*]:my-auto px-2 border">
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
            <Link
                className="text-3xl flex text-black md:ml-auto mr-0"
                href="/login"
            >
                <FaUser />
            </Link>
        </nav>
    )
}