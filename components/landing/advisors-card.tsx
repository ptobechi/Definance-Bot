import portfolio from "@/img/portfolio.png";
import { ImQuotesRight } from "react-icons/im";
import { FaSearchDollar } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import Image from "next/image";

const AdvisorsCard = () => {
  return (
    <section className="p-4 py-6 lg:max-w-screen-xxl lg:mx-auto mt-12 flex flex-col lg:flex-row">
      <div className="relative lg:w-1/2">
        <Image
          className="object-cover rounded-md"
          src={portfolio}
          alt="successful trader"
        />
        <div className="p-10 bg-secondaryColor investment-margin -translate-y-3/4 xxl:-translate-x-[10%] rounded-md relative">
          <h1 className="text-white font-normal italic text-base md:text-lg">
            “The goal of a successful trader is to make the best trades. Money
            is secondary.”
          </h1>
          <span className="text-white text-5xl absolute right-2 top-1/2 -translate-y-1/2 opacity-25 -z-10 w-1/4">
            <ImQuotesRight />
          </span>
        </div>
      </div>

      <div className="lg:ml-[6%] lg:w-1/2">
        <p className="text-primaryColor text-base font-normal text-left mb-8">
          Grow with advisors you trust.
        </p>
        <div className="flex mb-6 gap-x-6">
          <div className="px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-primaryColor py-4 text-white text-[1.875rem]">
              <FaSearchDollar />
            </div>
          </div>
          <div className="">
            <h1 className="text-[20px] x:text-[22px] lg:text-xl text-primaryColor mb-2">
              Funding Life Goals
            </h1>
            <p className="font-normal text-pcolor text-sm x:text-base">
              From retirement planning to education funding, eldercare
              considerations, and legacy planning. KoinMart financial advisors
              work with their clients to understand their most urgent concerns
              and create custom financial strategies to set them on the right
              path.
            </p>
          </div>
        </div>
        <div className="flex mb-6 gap-x-6">
          <div className=" px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-white py-4 text-primaryColor border border-mainGreen text-[1.875rem]">
              <ImStatsDots />
            </div>
          </div>
          <div className="">
            <h1 className="text-[20px] x:text-[22px] lg:text-xl text-primaryColor mb-2">
              Investment Management
            </h1>
            <p className="font-normal text-pcolor text-sm x:text-base">
              A financial plan is only as good as the investment engine that
              powers it. KoinMart builds, manages, and monitors investment
              portfolios for clients that are tailored to their personal risk
              tolerances and designed to help them achieve their financial and
              life goals.
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className=" px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-primaryColor py-4 text-white text-[1.875rem]">
              <GiWallet />
            </div>
          </div>
          <div className="">
            <h1 className="text-[20px] x:text-[22px] lg:text-xl text-primaryColor mb-2">
              Risk Management
            </h1>
            <p className="font-normal text-pcolor text-sm x:text-base">
              Protecting against unforeseen events is a critical part of a
              well-crafted plan. KoinMart helps clients identify the many
              risks they face, stress test their financial plans, and implement
              strategies to manage risks to their lives, goals, and plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisorsCard;