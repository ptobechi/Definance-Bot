"use client";

import { useEffect } from "react";

export default function Reload() {
    useEffect(() => {

        const timeout = setTimeout(() => {
            window.location.reload();
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="col-12  d-flex justify-content-center">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
