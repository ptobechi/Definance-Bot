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
        <h1 className="text-[1.5rem] lg:text-2xl mb-4 lg:mb-6 text-primaryColor">
          How We Work
        </h1>
        <p className="text-base lg:text-lg text-pcolor mb-10">
          You may be planning for retirement, saving for education expenses, or
          looking for strategies to grow and preserve your nest egg. We're here
          to help you prioritize, plan, and stay on course to achieve your
          financial goals. During onboarding, an investment professional will
          guide you through a risk assessment to help determine your risk
          tolerance for active investing.
        </p>

        <div className="mb-8 flex flex-wrap items-center">
          <div className=" w-2/6 mb-4 md:mb-0 md:pr-8">
            <h2 className="md:text-nowrap pl-4 text-base lg:text-[1.25rem] text-sideBg">
              Our Story
            </h2>
          </div>
          <div className="w-4/6">
            <p className="text-pcolor text-sm md:text-[0.94rem] md:border-l md:border-gray-300 px-4 md:px-12">
              Our firm was built on the premise that investors are best served
              by advisors who are motivated to focus exclusively on the best
              interests of their clients.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <div className="w-2/6 mb-4 md:mb-0 md:pr-8">
            <h2 className="md:text-nowrap pl-4  text-base md:text-[1.25rem] text-sideBg">
              Our Mission
            </h2>
          </div>
          <div className="w-4/6">
            <p className="text-pcolor text-sm md:text-[0.94rem] md:border-l md:border-gray-300 px-4 md:px-12">
            At KoinMart, we are proud to unveil a groundbreaking platform tailored 
            for the dynamic and ever-evolving crypto trading industry. 
            Our mission is to redefine the way you experience cryptocurrency trading, 
            making it seamless, secure, and tailored to your unique needs.
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
