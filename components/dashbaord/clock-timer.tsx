"use client";

import { useEffect, useState } from "react";

const ClockTimer = () => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        };

        updateTime(); // Set the initial time

        const intervalId = setInterval(updateTime, 1000); // Update the time every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    return (
        <>{currentTime}</>
    )
}
export default ClockTimer