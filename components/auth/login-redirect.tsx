"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.refresh(); // Force Next.js to refresh session
    }, []);

    return null;
}
