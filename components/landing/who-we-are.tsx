import who_we_are from "@/img/who-we-are.jpg"
import Image from "next/image";
const WhoWeAre = () => {
    return (
        <>
        <section className="p-4 lg:max-w-screen-xxl lg:mx-auto mt-12 flex flex-col lg:flex-row">
            <div className="relative lg:w-1/2 mb-5 lg:my-auto">
                <Image
                    className="object-cover rounded-md"
                    src={who_we_are}
                    alt="Who we are"
                />
            </div>

            <div className="lg:ml-[6%] lg:w-1/2 my-auto">
                <p className="text-secondaryColor text-base font-bold text-left mb-5">
                Who we are
                </p>
                <div className="flex mb-6 gap-x-6">
                <div className="">
                    <h1 className="text-[20px] font-bold x:text-[22px] lg:text-xl text-primaryColor mb-2">
                    Company Overview
                    </h1>
                    <p className="font-normal text-pcolor text-sm x:text-base">
                    Welcome to Foris AI Bank, where we redefine banking with innovative solutions and a customer-centric approach. 
                    Foris AI Bank has grown to become a leading financial institution, trusted by millions. 
                    Our mission is to provide seamless, secure, and personalized banking experiences that cater to the diverse needs of our customers.
                    </p>

                    <h1 className="text-[20px] font-bold mt-6 x:text-[22px] lg:text-xl text-primaryColor mb-2">
                    Explore Foris Bank’s Features and Services
                    </h1>

                    <p className="font-normal text-pcolor text-sm x:text-base">
                    At Foris AI Bank, we are guided by a set of core values that shape our 
                    culture and define our identity:
                    </p>

                    <ul className="mt-3 space-y-3">
                        <li className="text-sm">
                            <strong>Secure Banking: </strong>State-of-the-art encryption and security protocols to safeguard your financial data.
                        </li>
                        <li className="text-sm">
                            <strong>Comprehensive Asset Management: </strong> Easily manage your assets with our user-friendly interface and powerful tools.
                        </li>
                        <li className="text-sm">
                            <strong>24/7 Customer Support: </strong> Dedicated support team available around the clock to assist with any queries or issues.
                        </li>
                        <li className="text-sm">
                            <strong>Excellence: </strong> We strive for excellence in every aspect of our business.
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </section>
        <section className="p-4 lg:max-w-screen-xxl lg:mx-auto flex flex-col lg:flex-row">
            <div className="my-auto">
                <p className="text-secondaryColor text-base font-bold text-center mb-5">
                Why We Are Different
                </p>
                <div className="flex flex-col lg:flex-row justify-center items-center py-3 px-4 gap-5 lg:max-w-screen-xxl lg:mx-auto">
                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Innovative Technology
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        At Foris Bank, we utilize the latest in AI and machine learning to 
                        provide cutting-edge financial solutions that enhance your trading and 
                        banking experience.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Personalized Financial Services
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        We understand that every financial journey is unique. Our platform offers 
                        tailored advice and customizable tools to meet your specific needs and goals.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Unmatched Security
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Your security is our top priority. We implement advanced encryption and 
                        multi-factor authentication to safeguard your data and transactions.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center py-3 px-4 gap-5 lg:max-w-screen-xxl lg:mx-auto">
                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Exceptional Customer Support
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Our support team is available 24/7, ensuring that you 
                        receive timely assistance and guidance whenever you need it.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        User-Centric Design
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Our platform is designed with you in mind. Enjoy an 
                        intuitive and user-friendly interface that makes managing 
                        your finances and investments straightforward and efficient.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Comprehensive Resources
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Access a wealth of resources, including tutorials, FAQs, 
                        and performance analytics, to empower you to make 
                        informed financial decisions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>

    )
}
export default WhoWeAre;