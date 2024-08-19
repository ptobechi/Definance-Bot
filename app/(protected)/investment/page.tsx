"use client"

import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import DashHeader from "../_components/dash-header";
import InvestmentCard from "../_components/sharedCard";
import { useSelectedPlan } from "@/hooks/selectedPlanContext";
import { useRouter } from "next/navigation";

export interface Plan {
    _id: string;
    name: string;
    network: string;
    duration: string;
    roi: string;
    min: string;
    description: string;
    features: string[];
}

const Investment = () => {
  const investmentPlans: Plan[] = [
    {
      _id: "000001",
      name: "Emerging Market Entry",
      network: "Global Growth Gems",
      duration: '14',
      roi: "0.65",
      min: "3000",
      features: [
        "Investment in established blue-chip companies with steady dividends.",
        "Regular portfolio reviews with access to basic market analysis reports.",
        "Low management fees for maximizing returns on smaller investments."
      ],
      description: `Ideal for investors starting their journey in international market`,
    },
    {
      _id: "000002",
      name:"DiverseExplorer",
      network: "Global Growth Gems",
      duration: '30',
      roi: "0.85",
      min: "20000",
      features: [
        "Investment in established blue-chip companies with steady dividends.",
        "Regular portfolio reviews with access to basic market analysis reports.",
        "Low management fees for maximizing returns on smaller investments."
      ],
      description: ' Suitable for investors seeking diversified exposure to a mix of emerging and developed markets.',
    },
    {
      _id: "000003",
      name: "FrontierPioneer",
      network: "Global Growth Gems",
      duration: '60',
      roi: "1.10",
      min: "175000",
      features: [
        "Investment in established blue-chip companies with steady dividends.",
        "Regular portfolio reviews with access to basic market analysis reports.",
        "Low management fees for maximizing returns on smaller investments."
      ],
      description: 'Designed for the adventurous investor aiming to explore high-potential frontier markets.',
    },
    {
      _id: "000004",
      name: " GlobalStrategist",
      network: "Global Growth Gems",
      duration: '90',
      roi: "1.40",
      min: "400000",
      features: [
        "Investment in established blue-chip companies with steady dividends.",
        "Regular portfolio reviews with access to basic market analysis reports.",
        "Low management fees for maximizing returns on smaller investments."
      ],
      description: 'Tailored for seasoned investors seeking a strategic and aggressive approach to global investing.',
    },
    {
      _id: "000000",
      name: "WorldLeader",
      network: "Global Growth Gems",
      duration: '7',
      roi: "1.75",
      features: [
        "Investment in established blue-chip companies with steady dividends.",
        "Regular portfolio reviews with access to basic market analysis reports.",
        "Low management fees for maximizing returns on smaller investments."
      ],
      min: "750000",
      description: 'Ideal for elite investors aiming to lead and capitalize on global economic trends and opportunities.',
    },
  ];
  
  const settings = {
    className: "center",
    centerPadding: "15px",
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 2,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          centerPadding: "0",
        },
      },
    ],
  };

  const sliderRef = useRef<Slider | null>(null);

  const handleNextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const handlePrevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  const { setSelectedPlan, selectedId } = useSelectedPlan();
  const selectedPlan = investmentPlans?.filter((plan) => plan._id === selectedId);

  const router = useRouter();
  const handleInvestClick = () => {
    if (selectedPlan) {
      setSelectedPlan(selectedPlan[0]);
      router.push("/investment/place-investment");
    }
  };

  return (
    <>
      <DashHeader
        title="Investment Plan"
        subTitle="Choose your investment plan and start earning."
      />

      <section className="py-5 text-center">
        {investmentPlans && investmentPlans?.length >= 3 && (
          <div className="relative">
            <span
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
            >
              <FaArrowLeft color="red" size={24} />
            </span>
            <span
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
            >
              <FaArrowRight color="red" size={24} />
            </span>
            <Slider ref={sliderRef} {...settings}>
              {investmentPlans &&
                investmentPlans.length > 0 &&
                investmentPlans.map((plan, index) => (
                  <InvestmentCard key={index} {...plan} />
                ))}
            </Slider>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            onClick={handleInvestClick}
            className="text-lg py-3 px-5 bg-primaryColor text-white flex items-center rounded-md hover:bg-mainGreenRgbaxl transition-all duration-300"
            disabled={selectedPlan && !selectedPlan[0]}
          >
            Continue to Invest{" "}
            <span className="inline">
              <FaArrowRight className="pl-2" />
            </span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Investment;
