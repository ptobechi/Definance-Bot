import portfolio from "@/img/portfolio.png";
import { ImQuotesRight } from "react-icons/im";
import Image from "next/image";
import { Fa1, Fa2, Fa3 } from "react-icons/fa6";

const AdvisorsCard = () => {
  return (
    <section className="p-4 py-6 lg:max-w-screen-xxl lg:mx-auto mt-12 flex flex-col lg:flex-row">
      <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      
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
        <p className="text-primaryColor text-base font-normal text-left mb-5">
          3 simple steps to achieving success with us:
        </p>
        <div className="flex mb-6 gap-x-6">
          <div className="px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-primaryColor py-4 text-white text-[1.875rem]">
              <Fa1 />
            </div>
          </div>
          <div className="">
            <h1 className="text-sm font-bold mb-1 x:text-[22px] lg:text-[18px] text-primaryColor">
              Find your Niche:
            </h1>
            <p className="font-normal text-pcolor text-[14px] x:text-base">
              By focusing on a particular market or strategy—such as tech 
              stocks in the NASDAQ, safe-haven assets like Gold, 
              or emerging cryptocurrencies—you can leverage your strengths 
              and interests to choose what you will like to invest in.
            </p>
          </div>
        </div>
        <div className="flex mb-6 gap-x-6">
          <div className="px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-white py-4 text-primaryColor border border-mainGreen text-[1.875rem]">
              <Fa2 />
            </div>
          </div>
          <div className="">
            <h1 className="text-sm font-bold mb-1 x:text-[22px] lg:text-[18px] text-primaryColor">
              ⁠Fund your Defibot account with capital:
            </h1>
            <p className="font-normal text-pcolor text-sm x:text-base">
              This refers to the process of adding capital to your trading 
              account to start investing in markets like the S&P 500, 
              NASDAQ 100, Gold, Bitcoin, and Ethereum. 
              This initial investment allows you to purchase assets and 
              take advantage of market opportunities. 
              By effectively funding your account, you position 
              yourself to grow your portfolio across diverse asset classes, 
              leveraging both traditional and emerging markets to achieve 
              your financial goals.
            </p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className=" px-2">
            <div className="w-16 h-16 rounded-md flex items-center justify-center bg-primaryColor py-4 text-white text-[1.875rem]">
              <Fa3 />
            </div>
          </div>
          <div className="">
            <h1 className="text-sm font-bold mb-1 x:text-[22px] lg:text-[18px] text-primaryColor">
              ⁠Fill up your pockets with profits
            </h1>
            <p className="font-normal text-pcolor text-sm x:text-base">
              By leveraging market trends, expert insights, and effective 
              trading strategies, investors aim to enhance their 
              financial wealth and achieve their financial objectives in 
              these diverse asset classes.
            </p>
          </div>
        </div>
      </div>

      <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
    </section>
  );
};

export default AdvisorsCard;
