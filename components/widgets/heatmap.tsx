"use client"
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function Heatmap() {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (container.current) {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
              {
                "exchanges": [],
                "dataSource": "SPX500",
                "grouping": "sector",
                "blockSize": "market_cap_basic",
                "blockColor": "change",
                "locale": "en",
                "symbolUrl": "",
                "colorTheme": "dark",
                "hasTopBar": false,
                "isDataSetEnabled": false,
                "isZoomEnabled": true,
                "hasSymbolTooltip": true,
                "isMonoSize": false,
                "width": "100%",
                "height": "500px"
                }`;
            container.current.appendChild(script);
        }
    },[container]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(Heatmap);
