import SubCard from "@/components/sub-card";
import AnimateOnScroll from "@/utils/AnimateOnScroll";

const Services = () => {
    return (
        <section className="mx-2 px-2 lg:px-28">
            <SubCard/>
            <AnimateOnScroll animation="fadeInDown">
                <div className="lg:flex gap-3 mb-10">
                <div className="flex-1 my-auto">
                    <h2 className="lg:text-xl text-lg mb-3 text-primaryColor">
                    Stock Market
                    </h2>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    The stock market is a dynamic environment where shares of publicly traded companies are bought, sold, and issued. It operates through various exchanges that offer a regulated and transparent platform for these transactions. Prominent stock exchanges include the New York Stock Exchange (NYSE), NASDAQ, and the London Stock Exchange (LSE). 
                    </p>
                    <ul className="text-[0.75rem] mt-3">
                    <li className="py-1">
                        <strong>Market Orders </strong>
                        A market order executes immediately at the current market price.
                    </li>
                    <li className="py-1">
                        <strong>Limit Orders:</strong>
                    A limit order sets a specific price for buying or selling and will only execute if the market reaches that price.
                    </li>
                    <li className="py-1">
                        <strong>Stocks: </strong>
                        Shares represent ownership in a company. Common stocks generally provide voting rights in corporate matters and may offer dividends.                    </li>
                    <li className="py-1">
                        <strong>Individual Investors: </strong>
                        Private individuals who buy and sell stocks to build personal wealth.                    </li>
                    <li className="py-1">
                        <strong>Institutional Investors: </strong>
                        Organizations such as mutual funds, pension funds, and insurance companies that invest large amounts of capital.                    </li>
                    <li className="py-1">
                        <strong>Traders: </strong>
                        Individuals or entities who engage in short-term buying and selling to profit from market price movements.                    </li>
                    </ul>
                </div>
                </div>
            </AnimateOnScroll>


            <AnimateOnScroll animation="fadeInLeft">
                <div className="lg:flex gap-3 mb-10">
                <div className="flex-1 my-auto">
                <h2 className="lg:text-xl text-lg mb-3 text-primaryColor">
                    Investments
                    </h2>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    Investing involves allocating funds with the goal of generating returns over time. Different investment options come with unique characteristics, risks, and potential rewards. Here’s an overview of various investment strategies and their ideal targets:                    </p>
                    <ul className="text-[0.75rem] mt-3">
                    <li className="py-1">
                        <strong>World Leader: </strong>
                        Tailored for elite investors looking to capitalize on global economic trends and opportunities, aiming for leadership in international markets.
                    </li>

                    <li className="py-1">
                        <strong>Emerging Market Entry: </strong>
                        Designed for investors beginning their journey into international markets, offering exposure to emerging economies with high growth potential.                    </li>

                    <li className="py-1">
                        <strong>Diverse Explorer: </strong>
                        Suitable for investors seeking diversified exposure across a blend of developed and emerging markets, spreading risk and potential rewards.                    </li>

                    <li className="py-1">
                        <strong>Frontier Pioneer: </strong>
                        Crafted for those interested in exploring high-potential frontier markets, which are less mature but offer significant growth opportunities.
                    </li>

                    <li className="py-1">
                        <strong>Global Strategist: </strong>
                        Ideal for seasoned investors who prefer a strategic and aggressive approach to global investing, focusing on high-impact opportunities across various regions.
                    </li>
                    
                    </ul>
                </div>
                </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInRight">
                <div className="lg:flex gap-3 mb-10">
                <div className="flex-1 my-auto">
                <h2 className="lg:text-xl text-lg mb-3 text-primaryColor">
                    Bot Trading
                    </h2>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    Bot trading, also known as algorithmic or automated trading, involves the use of computer programs to execute trades in financial markets based on predefined criteria and algorithms. These trading bots operate at speeds and efficiencies far beyond human capabilities, making them a preferred tool for both individual traders and financial institutions. Here’s a detailed overview: 
                    </p>

                    <h6 className="mt-3 text-[0.9rem] font-bold">How It Works:</h6>
                    <ul className="text-[0.75rem] mt-2">
                        <li>Trading bots use algorithms to analyze market data and execute trades automatically. They follow predefined rules and criteria, such as price thresholds or technical indicators, to make trading decisions.</li>
                    </ul>

                    <h6 className="mt-3 text-[0.9rem] font-bold">Benefits</h6>
                    <ul className="text-[0.75rem] mt-2">
                        <li>
                            <strong>Speed and Efficiency: </strong>
                            Bots can execute trades in milliseconds, capitalizing on market opportunities that might be missed by human traders.
                        </li>

                        <li>
                            <strong>Emotionless Trading: </strong>
                            Automated trading removes emotional biases from decision-making, leading to more consistent execution of trading strategies.
                        </li>

                        <li>
                            <strong>24/7 Operation</strong>
                            Bots can operate around the clock, allowing for trading in various global markets without the need for constant human oversight.
                        </li>
                        <li>
                            <strong>Backtesting</strong>
                            Algorithms can be tested on historical data to evaluate their performance before applying them in live markets.
                        </li>
                    </ul>

                    <h6 className="mt-3 text-[0.9rem] font-bold">Risks</h6>
                    <ul className="text-[0.75rem] mt-2">
                        <li>
                            <strong>System Failures: </strong>
                            Technical issues or bugs in the algorithm can lead to unintended trading errors or losses.
                        </li>

                        <li>
                            <strong>Market Conditions: </strong>
                            Bots may not adapt well to sudden or unexpected market changes, leading to potential losses.
                        </li>

                        <li>
                            <strong>Over-Reliance:</strong>
                            Excessive dependence on bots can lead to neglecting manual analysis and market insights.
                        </li>
                    </ul>
                </div>
                </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp">
                <div className="lg:flex gap-3 mb-10">
                <div className="flex-1 my-auto">
                    <h2 className="lg:text-xl text-lg mb-3 text-primaryColor">
                    Loan Services
                    </h2>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    Definance Bot offers a variety of flexible loan options to cater to your financial needs, whether you're looking to make a significant purchase, consolidate debt, or address unexpected expenses. Our loan services are designed with competitive interest rates, transparent terms, and a seamless application process.
                    </p>

                    <h2 className="lg:text-lg text-lg mb-2 mt-3">
                    Types of Loans:
                    </h2>
                    <ul className="lg:text-sm text-[0.7rem]">
                    <li className="py-1"><strong>Personal Loans: </strong> 
                    Ideal for consolidating debt or covering personal expenses with tailored terms and competitive rates.                    </li>
                    <li className="py-1">
                        <strong>Home Loans: </strong>
                        Benefit from attractive rates for purchasing or refinancing your home, making home ownership more accessible.                    </li>
                    <li className="py-1">
                        <strong>Business Loans: </strong>
                        Customized financing solutions to support your business's growth and operational needs.                    </li>
                    </ul>

                    <h2 className="lg:text-[0.9rem] text-[0.8rem] mb-2 mt-3">
                    Why Choose Definance Bot Loans?
                    </h2>
                    <ul className="lg:text-sm text-[0.7rem]">
                    <li className="py-1"><strong>Competitive Rates: </strong> 
                    Access favorable interest rates that help reduce the cost of borrowing.                    </li>
                    <li className="py-1">
                        <strong>Flexible Terms: </strong>
                        Select repayment plans that fit your financial situation and budget.                    </li>
                    <li className="py-1">
                        <strong>Quick Approval: </strong>
                        Experience a fast and efficient loan approval process, getting the funds you need without unnecessary delays.                    </li>
                    </ul>

                    <h2 className="lg:text-[0.9rem] text-[0.8rem] mb-2 mt-3">
                    How It Works
                    </h2>
                    <ul className="lg:text-sm text-[0.7rem]">
                    <li className="py-1"><strong>Apply Online: </strong> 
                    Sign your loan contract application form.
                    </li>
                    <li className="py-1">
                        <strong>Get Approved: </strong>
                        Receive a quick decision on your loan.
                    </li>
                    <li className="py-1">
                        <strong>Receive Funds: </strong>
                        Access your funds as soon as the next business day.
                    </li>
                    </ul>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    Start your application today and take the next step towards achieving your financial goals with Definance Bot’s loan services.                    </p>
                </div>
                </div>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fadeInUp">
                <div className="lg:flex gap-3 mb-10">
                <div className="flex-1 my-auto">
                <h2 className="lg:text-xl text-lg mb-3 text-primaryColor">
                    Referrals
                    </h2>
                    <p className="text-sm" style={{display: "block", lineHeight: "30px"}}>
                    Referral new clients and start earning on active referrals.
                    </p>
                </div>
                </div>
            </AnimateOnScroll>
        
        </section>
    )
}
export default Services;