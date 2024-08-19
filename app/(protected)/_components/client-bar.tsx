"use client";
import { useState } from "react";
import MenuBarMobile from "./menu-bar";
import Sidebar from "./sidebar";


const SideBarMenu = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
        <MenuBarMobile setter={setShowSidebar}/>
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        </>
    )
}
export default SideBarMenu;
