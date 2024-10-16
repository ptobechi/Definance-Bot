"use client";
import React, { useEffect, useRef, memo } from 'react';

function TickerTapeWidget() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Create the script element
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = JSON.stringify({
                symbols: [
                    {
                        proName: "FOREXCOM:SPXUSD",
                        title: "S&P 500 Index"
                    },
                    {
                        proName: "FOREXCOM:NSXUSD",
                        title: "US 100 Cash CFD"
                    },
                    {
                        proName: "FX_IDC:EURUSD",
                        title: "EUR to USD"
                    },
                    {
                        proName: "BITSTAMP:BTCUSD",
                        title: "Bitcoin"
                    },
                    {
                        proName: "BITSTAMP:ETHUSD",
                        title: "Ethereum"
                    }
                ],
                showSymbolLogo: true,
                isTransparent: false,
                displayMode: "adaptive",
                colorTheme: "dark",
                locale: "en"
            });
            
            // Append the script inside the container div
            containerRef.current.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(TickerTapeWidget);
