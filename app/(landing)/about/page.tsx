import JoinUs from "@/components/landing/join-us-card";
import SubCard from "@/components/sub-card";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

const About = () => {
    return (
        <section className="lg:max-w-screen-xxl lg:mx-auto lg:px-24 px-5">
            <SubCard/>
            <div className="lg:w-2/2">
                <h2 className="font-bold text-xl text-primaryColor mb-1">
                    Overview
                </h2>
                <p className="text-pcolor text-[0.9375rem] x:text-[1rem] md:text-base mb-8">
                    Welcome to Foris Bank, where we redefine banking with innovative 
                    solutions and a customer-centric approach. 
                    Foris Bank has grown to become a leading financial institution, 
                    trusted by millions. Our mission is to provide seamless, secure, 
                    and personalized banking experiences that cater to the 
                    diverse needs of our customers.
                </p>

                <h2 className="text-primaryColor font-bold lg:text-lg text-lg mb-1">
                    Core Values and Culture
                </h2>

                <p className="font-normal text-pcolor text-sm x:text-base">
                    At Foris Bank, we are guided by a set of core values that shape our 
                    culture and define our identity:
                </p>

                <ul className="my-5 text-sm space-y-2">
                    <li>
                        <strong>Integrity: </strong>We uphold the highest standards of honesty and transparency in all our dealings.
                    </li>
                    <li>
                        <strong>Customer Focus: </strong> Our customers are at the heart of everything we do.
                    </li>
                    <li>
                        <strong>Innovation: </strong> We embrace change and continuously seek better ways to serve our clients
                    </li>
                    <li>
                        <strong>Excellence: </strong> We strive for excellence in every aspect of our business.
                    </li>
                </ul>

                <h2 className="text-xl font-bold text-primaryColor mb-1">
                    We’ve built a platform to buy and sell shares
                </h2>
                <p className="text-pcolor text-sm x:text-[1rem] md:text-base mb-8">
                    While existing solutions offer to solve just one problem at a time, 
                    our team is up to build a secure, useful, & easy-to-use product based 
                    on private blockchain. It will include easy cryptocurrency payments 
                    integration, and even a digital arbitration system.
                </p>
                <p className="text-pcolor text-[0.9375rem] x:text-[1rem] md:text-base mb-8">
                    At the end, Our aim is to integrate all companies, employees, 
                    and business assets into a unified blockchain ecosystem, 
                    which will make business truly efficient, transparent, and reliable.
                </p>
            </div>

            <p className="text-pcolor text-[0.9375rem] x:text-[1rem] md:text-base mb-8">
                <Link href={"/register"} className="text-primaryColor font-bold">Sign Up Now </Link>
                and embark on a new era of crypto trading excellence.
            </p>
            <div className="inline-grid md:grid-cols-2 gap-y-6 gap-x-8 justify-start">
                <div className="flex items-center justify-self-start">
                <span className="text-secondaryColor">
                    <FaCircleCheck />
                </span>
                <h6 className="text-sm md:text-[1rem] pl-3 text-pcolor font-normal">
                    Expert Advisor
                </h6>
                </div>
                <div className="flex items-center justify-self-start">
                <span className="text-secondaryColor">
                    <FaCircleCheck />
                </span>
                <h6 className="text-sm md:text-[1rem] pl-3 text-pcolor font-normal">
                    Technical Analysis
                </h6>
                </div>
                <div className="flex items-center justify-self-start">
                <span className="text-secondaryColor">
                    <FaCircleCheck />
                </span>
                <h6 className="text-sm md:text-[1rem] pl-3 text-pcolor font-normal">
                    98% Success Rate
                </h6>
                </div>
                <div className="flex items-center justify-self-start">
                <span className="text-secondaryColor">
                    <FaCircleCheck />
                </span>
                <h6 className="text-sm md:text-[1rem] pl-3 text-pcolor font-normal">
                    Free Consultation
                </h6>
                </div>
            </div>

            <div className="items-center gap-y-12 gap-x-8 my-10">
                <div className="lg:w-full mb-5">
                    <h4 className="text-xl text-primaryColor font-bold mb-1">
                        Our Objectives
                    </h4>
                    <p className="text-pcolor text-sm x:text-[1rem] md:text-base">
                        Over time we’ve found out that people often lose money to so many
                        platforms reason being that they either get scammed or lose out
                        because they have little or no knowledge of the tricks behind the
                        business they venture into, this is disheartening as we owe it to
                        humanity to point people to the right direction where their
                        investments will not only be secured but will be multiplying,it is
                        in light of this that Foris Bank, LLC was founded.
                    </p>
                </div>

                <div className="lg:w-6/8">
                    <h4 className="text-xl text-primaryColor font-bold mb-1">
                        Why you need Foris Bank
                    </h4>
                    <p className="text-pcolor text-sm x:text-[1rem] md:text-base">
                        Foris Bank not just a platform but a family with core
                        values and intentions of extending its relationship beyond United
                        States and Europe to collectively build a network of financially
                        stable friends and family across the globe. Note that one of the
                        additional advantage of Foris Bank that you can use
                        your Foris Bank assets as a legal means of exchange
                        which will be generally accepted by our community of
                        investors/users. More so, it’ll interest you to know that we are
                        rated 100% in excellence, we have direct affiliation with all
                        shortlisted companies under our platform, our Guarantee Bond(GB) is
                        the best security bond you can ever imagine, we offer the best
                        trading conditions for every investor and we further maintain a high
                        standard in securing trading environments. Every year we review and
                        improve our conditions and standards, this is usually done to make
                        trading with us more efficient and effective for every investor in
                        the market. Our size provides us with access to best-in-class
                        investment managers that we couple with customized wealth planning
                        services. Our business model means that our financial advisors’
                        interests are aligned with yours. They have no products to sell and
                        are in a position to offer truly objective advice.
                    </p>
                </div>
            </div>

            <JoinUs/>
        </section>
    )
}
export default About;