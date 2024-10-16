"use client";

import { useState, useEffect, useRef } from "react";
import widgets from "@/img/widgets.png";
import AnimateOnScroll from "@/utils/AnimateOnScroll";
import Image from "next/image";
import Heatmap from "../widgets/heatmap";
import TickerTape from "../widgets/tickerTape";


const HowWeWork = () => {
  const [percentage, setPercentage] = useState(0);

  const progressBarRef = useRef(null);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            setPercentage((prevPercentage) => {
              const nextPercentage = prevPercentage + 1;
              return nextPercentage <= 100 ? nextPercentage : 100;
            });
          }, 3500 / 100);

          return () => clearInterval(interval);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    });

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  return (
    <section className="px-5 lg:max-w-screen-xxl lg:mx-auto flex flex-col lg:flex-row lg:items-center">
      <div className="lg:w-1/2 mb-16 lg:mb-0">
        <h1 className="text-[1.5rem] lg:text-xl mb-2 font-bold lg:mb-6 text-primaryColor">
          How We Work
        </h1>
        <p className="text-sm lg:text-sm text-pcolor mb-5">
          At Definancebot, we leverage cutting-edge artificial intelligence 
          to empower investors with data-driven insights and automated 
          trading strategies. Our process is designed to 
          enhance decision-making and optimize returns:
        </p>
        
        <p className="text-base lg:text-sm text-pcolor mb-2">
          <span className="text-sm mr-1 lg:text-sm mb-2 font-bold lg:mb-6 text-primaryColor">
          Advanced AI Algorithms:
          </span>
          Our proprietary AI models analyze vast 
          amounts of historical and real-time market data across various assets, 
          including the Nvidia, S&P 500, NASDAQ 100, Gold, Bitcoin, 
          and Ethereum. These models identify patterns and trends 
          that human analysts might miss.
        </p>

        <p className="text-sm lg:text-sm text-pcolor mb-2">
          <span className="mr-1 lg:text-sm mb-2 font-bold lg:mb-6 text-primaryColor">
          Predictive Analytics:
          </span>
          Based on data analysis, our AI generates accurate price predictions, 
          helping investors understand potential market movements. 
          This predictive capability allows for timely and informed 
          trading decisions.
        </p>

        <TickerTape/>

        <p className="text-sm lg:text-sm text-pcolor mb-2">
          <span className="mr-1 lg:text-sm mb-2 font-bold lg:mb-6 text-primaryColor">
            Automated Trade Execution: 
          </span>
          Investors can set their trading preferences and let 
          our platform execute trades automatically based on AI 
          recommendations. This ensures swift action on favorable market 
          conditions, maximizing profit potential while minimizing 
          emotional decision-making.
        </p>

        <p className="text-sm lg:text-sm text-pcolor mb-2">
          <span className="mr-1 lg:text-sm mb-2 font-bold lg:mb-6 text-primaryColor">
          Continuous Learning 
          </span>
          Our AI systems continually learn from market performance and adapt 
          strategies accordingly. This ongoing refinement process 
          helps maintain accuracy and relevance in ever-changing 
          market environments.
        </p>

        <p className="text-sm lg:text-sm text-pcolor mb-2">
          <span className="mr-1 lg:text-sm mb-2 font-bold lg:mb-6 text-primaryColor">
          Risk Management: 
          </span>
          We prioritize risk management by incorporating stop-loss orders 
          and portfolio diversification strategies. 
          Our AI assesses market volatility and adjusts 
          recommendations to help protect investors' capital.
        </p>

        <p className="text-sm lg:text-sm text-pcolor mb-2">
          By combining sophisticated technology with a focus on investor 
          education and support, Definancebot aims to deliver steady and 
          reliable returns while navigating the complexities of today’s 
          financial markets.
        </p>

        <div className="mb-8 flex flex-wrap items-center">
          <div className=" w-2/6 mb-4 md:mb-0 md:pr-8">
            <h2 className="md:text-nowrap pl-4 text-base lg:text-[1.25rem] text-primaryColor">
              Our Story
            </h2>
          </div>
          <div className="w-4/6">
            <p className="text-pcolor text-sm md:text-[0.94rem] md:border-l md:border-gray-300 px-4 md:px-12">
            Definance Bot was founded on the belief that investors deserve advisors who prioritize their clients' best interests above all else. We are dedicated to providing transparent, client-focused services that help you navigate the complexities of the digital asset market.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <div className="w-2/6 mb-4 md:mb-0 md:pr-8">
            <h2 className="md:text-nowrap pl-4  text-base md:text-[1.25rem] text-primaryColor">
              Our Mission
            </h2>
          </div>
          <div className="w-4/6">
            <p className="text-pcolor text-sm md:text-[0.94rem] md:border-l md:border-gray-300 px-4 md:px-12">
            At Definance Bot, our mission is to revolutionize cryptocurrency management and trading. We strive to deliver a seamless, secure, and personalized experience that meets the evolving needs of our clients in the fast-paced world of crypto finance.
            </p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 relative mt-8 lg:mt-0">
        <div className="mx-10">
          <Heatmap  />
        </div>

        {/* <AnimateOnScroll animation="fadeInRight">
          <Image
            className="object-cover"
            src={widgets}
            alt="images of various icons"
          />
        </AnimateOnScroll> */}
        <div
          ref={progressBarRef}
          className="w-2/5 sm:w-1/3 py-6 px-1 flex flex-col bg-gray-50  items-center justify-center absolute top-0 left-7 border border-gray-200 z-10 rounded-md"
        >
          <p className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-sideBg transition-all duration-500 xs:mb-0  sm:mb-2 text-nowrap flex items-center">
            {percentage}{" "}
            <span className="text-mainGreen md:text-2xl sm:text-lg text-base font-bold">
              %
            </span>
          </p>
          <p className="text-pcolor xs:text-sm sm:text-lg text-wrap text-center">
            Trusted Company
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
