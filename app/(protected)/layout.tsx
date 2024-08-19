"use client"

import { SelectedPlanProvider } from "@/hooks/selectedPlanContext";
import SideBarMenu from "./_components/client-bar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = (
    {children}: ProtectedLayoutProps
) => {
    
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBarMenu />
            <div className="flex-1 md:mx-5 mx-2 mt-28 overflow-y-auto">
                <SelectedPlanProvider>
                    {children}
                </SelectedPlanProvider>
            </div>
        </div>
    )
}
export default ProtectedLayout;
