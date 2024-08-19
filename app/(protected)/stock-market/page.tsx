"use client";

import StockCard from "@/components/dashbaord/stock-card";
import DashHeader from "../_components/dash-header";
import { useEffect } from "react";
import { formatToUSD, getStockCompanyInformation } from "@/_functions";

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

