"use client";

import AnimateOnScroll from "@/utils/AnimateOnScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { testimonials } from "@/data/testimonial";

const JoinUs = () => {

  return (
    <section
      style={{ marginTop: "-1em" }}
      className="lg:max-w-screen-xxl flex flex-col justify-center items-center mx-auto"
    >
      <div className="bg-gray-800 w-full rounded-md mt-10">
        <div className="py-20 px-6 text-left">
          <AnimateOnScroll animation="fadeInDown">
            <h2 className="text-xl text-white mb-8">
            Investors remarks:
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeInUp">
          
          {/* <section className="relative isolate bg-white overflow-hidden px-6 lg:px-8"> */}
          <section className="relative isolate bg-secondaryColor rounded-md overflow-hidden px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-secondaryColor shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              loop={true}
              spaceBetween={30}
              className="max-w-2xl lg:max-w-4xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <figure className="mt-10">
                    <blockquote className="text-center text-sm font-semibold text-gray-900">
                      <p>{testimonial.text}</p>
                    </blockquote>
                    <figcaption className="mt-5 pb-5">
                      <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <svg
                          width={3}
                          height={3}
                          viewBox="0 0 2 2"
                          aria-hidden="true"
                          className="fill-gray-900"
                        >
                          <circle r={1} cx={1} cy={1} />
                        </svg>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

            <button 
              className="btn p-4 rounded-sm bg-primaryColor text-white font-bold transition-all duration-300 mt-10"
              >Get Started</button>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
