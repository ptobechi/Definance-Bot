import JoinUs from "@/components/landing/join-us-card"
import SubCard from "@/components/sub-card"
import Link from "next/link"


const FAQ = () => {
    return (
        <div className="isolate bg-white px-2 lg:px-8">
            <SubCard/>

            <div className="p-8 bg-gray-50 rounded-lg shadow-md">
                {/* <!-- Grid or Flexbox Layout --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* <!-- Left Section (Heading and Subheading) --> */}
                    <div>
                    <h2 className="text-xl font-bold text-primaryColor mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-gray-600">
                        Can’t find the answer you’re looking for? Reach out to our  
                        <Link href={"/contact"} className="text-primaryColor mx-2">customer support</Link> team.
                    </p>
                    </div>

                    {/* <!-- Right Section (FAQ Items) --> */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            ⁠Do I need to have experience in trading to use an AI broker?
                            </h3>
                            <p className="text-gray-600 text-sm">
                            No, one of the key advantages of an AI trading broker is that it can 
                            cater to both novice and experienced traders.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            ⁠Is AI trading safe?
                            </h3>
                            <p className="text-gray-600 text-sm">
                            Yes as the algorithms call accurate price levels for executions
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            How much capital do I need to start using an AI trading broker? 
                            </h3>
                            <p className="text-gray-600 text-sm">
                            You can start with as little as $100
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            Is AI trading better than traditional human trading?
                            </h3>
                            <p className="text-gray-600 text-sm">
                            Yes, AI trading can offer advantages over traditional human trading, 
                            such as faster decision-making, 24/7 market monitoring, and the ability 
                            to analyze large datasets quickly.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            ⁠Can I withdraw my profits at the end of each trading session
                            </h3>
                            <p className="text-gray-600 text-sm">
                            Yes, you can withdraw as often as you want once your trading
                            session is over. You are in total control of your assets.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            ⁠Can investing with Definance give me over 1000% or more in profits 
                            </h3>
                            <p className="text-gray-600 text-sm">
                            Yes, you can generate an unimaginable amount of profits, 
                            and that is determined by your investment 
                            capital and plan you subscribe to.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-primaryColor mb-2">
                            ⁠Can the Definance's AI make losses in trading?  
                            </h3>
                            <p className="text-gray-600 text-sm">
                            Yes losses are inevitable, but we have strict risk management 
                            techniques that outweighs the losses and always keeps you 
                            99.9% profitable
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <JoinUs/>
        </div>
    )
}
export default FAQ