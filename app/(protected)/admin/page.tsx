"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const role = useCurrentRole();
    const navigate = useRouter();

    useEffect(() => {
        if (role !== "ADMIN") {
            navigate.back(); // Redirects the user to the previous page
        }
    }, [role, navigate]);
    return (
        <div>Welcome to the admin page</div>
    )
}
export default Page;