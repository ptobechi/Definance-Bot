"use client";

import { useState, useEffect, useRef } from "react";
import widgets from "@/img/widgets.png";
import AnimateOnScroll from "@/utils/AnimateOnScroll";
import Image from "next/image";


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
        <p className="text-base lg:text-sm text-pcolor mb-10">
        Whether you're planning for retirement, saving for education, or strategizing to grow your wealth, Definance Bot is here to guide you every step of the way. Our onboarding process includes a personalized risk assessment by an investment professional to help you align your investment strategy with your risk tolerance and financial goals.
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
        <AnimateOnScroll animation="fadeInRight">
          <Image
            className="object-cover"
            src={widgets}
            alt="images of various icons"
          />
        </AnimateOnScroll>
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
