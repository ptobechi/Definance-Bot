"use client";

import StockCard from "@/components/dashbaord/stock-card";
import DashHeader from "../_components/dash-header";
import { useEffect } from "react";
import { formatToUSD } from "@/_functions";

export interface Stocks {
    _id:        string;
    name:          string;
    symbol:       string;
    volume:     string;
    price:      string;
    change:     string;
    img_url:    string;
}


const Page = () => {

    const stocks = [
        {
          "symbol": "AAPL",
          "price": 224.72,
          "beta": 1.244,
          "volAvg": 65234130,
          "mktCap": 3416665352000,
          "lastDiv": 1,
          "range": "164.08-237.23",
          "changes": 3,
          "companyName": "Apple Inc.",
          "currency": "USD",
          "cik": "0000320193",
          "isin": "US0378331005",
          "cusip": "037833100",
          "exchange": "NASDAQ Global Select",
          "exchangeShortName": "NASDAQ",
          "industry": "Consumer Electronics",
          "website": "https://www.apple.com",
          "description": "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games, and podcasts. In addition, the company offers various services, such as Apple Arcade, a game subscription service; Apple Fitness+, a personalized fitness service; Apple Music, which offers users a curated listening experience with on-demand radio stations; Apple News+, a subscription news and magazine service; Apple TV+, which offers exclusive original content; Apple Card, a co-branded credit card; and Apple Pay, a cashless payment service, as well as licenses its intellectual property. The company serves consumers, and small and mid-sized businesses; and the education, enterprise, and government markets. It distributes third-party applications for its products through the App Store. The company also sells its products through its retail and online stores, and direct sales force; and third-party cellular network carriers, wholesalers, retailers, and resellers. Apple Inc. was incorporated in 1977 and is headquartered in Cupertino, California.",
          "ceo": "Mr. Timothy D. Cook",
          "sector": "Technology",
          "country": "US",
          "fullTimeEmployees": "161000",
          "phone": "408 996 1010",
          "address": "One Apple Park Way",
          "city": "Cupertino",
          "state": "CA",
          "zip": "95014",
          "dcfDiff": 66.42477,
          "dcf": 158.1902269752495,
          "image": "https://financialmodelingprep.com/image-stock/AAPL.png",
          "ipoDate": "1980-12-12",
          "defaultImage": false,
          "isEtf": false,
          "isActivelyTrading": true,
          "isAdr": false,
          "isFund": false
        },
        {
          "symbol": "GOOG",
          "price": 163.17,
          "beta": 1.046,
          "volAvg": 17668906,
          "mktCap": 1996917426903,
          "lastDiv": 0.8,
          "range": "121.46-193.31",
          "changes": 1.14,
          "companyName": "Alphabet Inc.",
          "currency": "USD",
          "cik": "0001652044",
          "isin": "US02079K1079",
          "cusip": "02079K107",
          "exchange": "NASDAQ Global Select",
          "exchangeShortName": "NASDAQ",
          "industry": "Internet Content & Information",
          "website": "https://abc.xyz",
          "description": "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America. It operates through Google Services, Google Cloud, and Other Bets segments. The Google Services segment provides products and services, including ads, Android, Chrome, devices, Gmail, Google Drive, Google Maps, Google Photos, Google Play, Search, and YouTube. It is also involved in the sale of apps and in-app purchases and digital content in the Google Play and YouTube; and devices, as well as in the provision of YouTube consumer subscription services. The Google Cloud segment offers infrastructure, cybersecurity, databases, analytics, AI, and other services; Google Workspace that include cloud-based communication and collaboration tools for enterprises, such as Gmail, Docs, Drive, Calendar, and Meet; and other services for enterprise customers. The Other Bets segment sells healthcare-related and internet services. The company was incorporated in 1998 and is headquartered in Mountain View, California.",
          "ceo": "Mr. Sundar  Pichai",
          "sector": "Communication Services",
          "country": "US",
          "fullTimeEmployees": "179582",
          "phone": "650 253 0000",
          "address": "1600 Amphitheatre Parkway",
          "city": "Mountain View",
          "state": "CA",
          "zip": "94043",
          "dcfDiff": -63.97117,
          "dcf": 225.1225659832016,
          "image": "https://financialmodelingprep.com/image-stock/GOOG.png",
          "ipoDate": "2004-08-19",
          "defaultImage": false,
          "isEtf": false,
          "isActivelyTrading": true,
          "isAdr": false,
          "isFund": false
        },
        {
          "symbol": "TSLA",
          "price": 214.14,
          "beta": 2.313,
          "volAvg": 95143369,
          "mktCap": 684100209600,
          "lastDiv": 0,
          "range": "138.8-278.98",
          "changes": 12.76,
          "companyName": "Tesla, Inc.",
          "currency": "USD",
          "cik": "0001318605",
          "isin": "US88160R1014",
          "cusip": "88160R101",
          "exchange": "NASDAQ Global Select",
          "exchangeShortName": "NASDAQ",
          "industry": "Auto - Manufacturers",
          "website": "https://www.tesla.com",
          "description": "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. It operates in two segments, Automotive, and Energy Generation and Storage. The Automotive segment offers electric vehicles, as well as sells automotive regulatory credits; and non-warranty after-sales vehicle, used vehicles, retail merchandise, and vehicle insurance services. This segment also provides sedans and sport utility vehicles through direct and used vehicle sales, a network of Tesla Superchargers, and in-app upgrades; purchase financing and leasing services; services for electric vehicles through its company-owned service locations and Tesla mobile service technicians; and vehicle limited warranties and extended service plans. The Energy Generation and Storage segment engages in the design, manufacture, installation, sale, and leasing of solar energy generation and energy storage products, and related services to residential, commercial, and industrial customers and utilities through its website, stores, and galleries, as well as through a network of channel partners; and provision of service and repairs to its energy product customers, including under warranty, as well as various financing options to its solar customers. The company was formerly known as Tesla Motors, Inc. and changed its name to Tesla, Inc. in February 2017. Tesla, Inc. was incorporated in 2003 and is headquartered in Austin, Texas.",
          "ceo": "Mr. Elon R. Musk",
          "sector": "Consumer Cyclical",
          "country": "US",
          "fullTimeEmployees": "140473",
          "phone": "512 516 8177",
          "address": "1 Tesla Road",
          "city": "Austin",
          "state": "TX",
          "zip": "78725",
          "dcfDiff": 141.54018,
          "dcf": 72.12981713786282,
          "image": "https://financialmodelingprep.com/image-stock/TSLA.png",
          "ipoDate": "2010-06-29",
          "defaultImage": false,
          "isEtf": false,
          "isActivelyTrading": true,
          "isAdr": false,
          "isFund": false
        },
        {
            "symbol": "XAUUSD",
            "price": 2335.20,
            "beta": 0.0,
            "volAvg": 0,
            "mktCap": null,
            "lastDiv": 0.0,
            "range": "1810.00-2431.00",
            "changes": 5.25,
            "companyName": "Gold Spot",
            "currency": "USD",
            "cik": null,
            "isin": null,
            "cusip": null,
            "exchange": "COMMODITY",
            "exchangeShortName": "COMEX",
            "industry": "Precious Metals",
            "website": "https://www.investing.com/commodities/gold",
            "description": "Gold is a precious metal traded mainly on commodity markets, serving as a store of value and a hedge against inflation and economic uncertainty. It has been used historically as money and is now an important asset in central bank reserves and investment portfolios.",
            "ceo": null,
            "sector": "Basic Materials",
            "country": "GLOBAL",
            "fullTimeEmployees": null,
            "phone": null,
            "address": null,
            "city": null,
            "state": null,
            "zip": null,
            "dcfDiff": null,
            "dcf": null,
            "image": "https://financialmodelingprep.com/image-stock/XAUUSD.png",
            "ipoDate": null,
            "defaultImage": false,
            "isEtf": false,
            "isActivelyTrading": true,
            "isAdr": false,
            "isFund": false
        },
        {
            "symbol": "SPX",
            "price": 5090.34,
            "beta": 1.0,
            "volAvg": 0,
            "mktCap": null,
            "lastDiv": 0.0,
            "range": "4100.00-5250.00",
            "changes": 7.45,
            "companyName": "S&P 500 Index",
            "currency": "USD",
            "cik": null,
            "isin": null,
            "cusip": null,
            "exchange": "INDEX",
            "exchangeShortName": "S&P Dow Jones Indices",
            "industry": "Benchmark Index",
            "website": "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
            "description": "The S&P 500 Index is a stock market index tracking the stock performance of 500 large companies listed on stock exchanges in the United States. It is one of the most commonly followed equity indices, often used as a benchmark for the overall U.S. stock market performance.",
            "ceo": null,
            "sector": "Financial",
            "country": "US",
            "fullTimeEmployees": null,
            "phone": null,
            "address": null,
            "city": null,
            "state": null,
            "zip": null,
            "dcfDiff": null,
            "dcf": null,
            "image": "data:image/jpeg;base64,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",
            "ipoDate": null,
            "defaultImage": false,
            "isEtf": false,
            "isActivelyTrading": true,
            "isAdr": false,
            "isFund": false
        }
    ]

    useEffect(() => {
        // getStockCompanyInformation()
        //     .then((data) => {
        //         console.log(data)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])

    return (
        <>
            <DashHeader
                title="Stock Market"
                subTitle="Facilitate shares in the stock exchange market"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {
                    stocks.map((data, index) => (
                        <div key={index} className="p-2">
                            <StockCard
                                url={data.image}
                                btnLabel="Buy Stock"
                                name={data.companyName+" "+"("+data.symbol+")"}
                                volume={data.volAvg.toFixed()}
                                price={formatToUSD(data.price)}
                                change={data.changes.toFixed(2)+"%"}
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default Page;

