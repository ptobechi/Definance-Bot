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
                    Welcome to Definance Bot, where we redefine financial management with cutting-edge solutions and a client-first approach. Definance Bot has emerged as a trusted leader in digital asset management, serving millions of users worldwide. Our mission is to offer seamless, secure, and personalized financial experiences that meet the diverse needs of our clients.
                    </p>

                    <h1 className="text-[20px] font-bold mt-6 x:text-[22px] lg:text-xl text-primaryColor mb-2">
                    Explore Definance Bot’s Features and Services 
                    </h1>

                    <p className="font-normal text-pcolor text-sm x:text-base">
                    At Definance Bot, our core values drive our culture and define who we are:
                    </p>

                    <ul className="mt-3 space-y-3">
                        <li className="text-sm">
                            <strong>Secure Financial Management: </strong>
                            Utilizing state-of-the-art encryption and security protocols, we ensure your digital assets and financial data are always protected.
                        </li>
                        <li className="text-sm">
                            <strong>Comprehensive Asset Management: </strong> 
                            Manage your crypto portfolio effortlessly with our intuitive interface and advanced tools, designed to optimize your investment strategies.
                        </li>
                        <li className="text-sm">
                            <strong>24/7 Customer Support: </strong> 
                            Our dedicated support team is available around the clock to assist you with any questions or concerns, ensuring a smooth and reliable experience.
                        </li>
                        <li className="text-sm">
                            <strong>Excellence: </strong> 
                            We are committed to excellence in every aspect of our operations, continuously improving to provide the best service to our clients.
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
                        At Definance Bot, we leverage the latest advancements in AI and machine learning to deliver state-of-the-art financial solutions. Our technology enhances your crypto management and investment experience, making it smarter and more efficient.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Personalized Financial Services
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        We recognize that every financial journey is unique. Definance Bot offers tailored advice and customizable tools designed to meet your specific needs and help you achieve your financial goals.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Unmatched Security
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Your security is our utmost priority. We utilize advanced encryption, multi-factor authentication, and robust security protocols to ensure your digital assets and transactions are always protected.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center py-3 px-4 gap-5 lg:max-w-screen-xxl lg:mx-auto">
                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Exceptional Customer Support
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Our dedicated support team is available 24/7, providing you with timely assistance and expert guidance whenever you need it. We're here to ensure your experience with Definance Bot is seamless and stress-free.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        User-Centric Design
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Definance Bot’s platform is designed with your needs in mind. Our intuitive and user-friendly interface simplifies the management of your crypto assets, investments, and financial planning.
                        </p>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-xl text-primaryColor font-bold mb-2">
                        Comprehensive Resources
                        </h2>
                        <p className="text-sm" style={{lineHeight: "30px", display:"block"}}>
                        Empower yourself with a wide range of resources, including tutorials, FAQs, and performance analytics. Definance Bot equips you with the knowledge and tools you need to make informed financial decisions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>

    )
}
export default WhoWeAre;