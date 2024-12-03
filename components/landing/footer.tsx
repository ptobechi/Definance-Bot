import { IoTime } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import AnimateOnScroll from "@/utils/AnimateOnScroll";
import Link  from "next/link"
import Logo from "../logo";

const Footer = () => {
  const quickLinks = [
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Brokers", path: "/brokers" },
    { title: "Terms and Condition", path: "/terms" },
    { title: "Legal Right", path: "/legal" },
  ];

  const support = [
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
  ];

  return (
    <footer className="bg-secondaryColor text-white mt-16">
      <div className="lg:max-w-screen-xxl w-screen lg:mx-auto px-6">
        <div className="pt-20 pb-5 grid md:grid-cols-2 lg:grid-cols-4 gap-8 content-center">
          <div className="col-span-2">
            <h4 className="text-primaryColor text-xl mb-8">About Company</h4>
            <p className="text-pcolor">
            Definance Bot is more than just a platform; it's your gateway to the future of digital finance. Whether you're a crypto trader, investor, or someone curious about the potential of digital assets, we invite you to join us on this transformative journey. Experience a platform as dynamic and innovative as the crypto industry itself – welcome to Definance Bot.
            </p>
          </div>

          <div>
            <h4 className="text-primaryColor text-xl mb-8">Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li className="text-pcolor my-2 lg:text-base" key={index}>
                  {link.path ? (
                    <Link
                      href={link.path}
                      className="hover:text-primaryColor hover:font-bold transition-all duration-300 cursor-pointer"
                    >
                      {" "}
                      {link.title}
                    </Link>
                  ) : (
                    <a className="hover:text-primaryColor hover:font-bold transition-all duration-300 cursor-pointer">
                      {link.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-primaryColor text-xl mb-8">Support</h4>

            <p className="text-base text-pcolor flex items-center mb-5">
              <span className="text-primaryColor text-lg mr-4">
                <MdEmail />
              </span>
              <a href="mailto:support@.com">support@definance.com</a>
            </p>
            <p className="text-base text-pcolor flex items-center mb-5">
              <span className="text-primaryColor text-lg mr-4">
                <IoTime />
              </span>
              Everyday 09:00AM to 17:00PM
            </p>
            <p className="text-base text-pcolor flex items-center">
              <span className="text-primaryColor text-lg mr-4">
                <MdLocationPin />
              </span>
              Nikokreontos 2, NICE DREAM, 6th floor, Flat/Office 601, 1066, Nicosia, Cyprus.
            </p>
          </div>
        </div>

        <h4 className="text-xl my-5 text-primaryColor">
              Legal Information
        </h4>
        <p className="text-sm">
        Copyright ©️ 2024 – All rights reserved. Definance Bot is a 
        trademark of Definance Group Ltd, a leading FinTech company. 
        This website is owned by Definance Group Ltd and operated by 
        Definance Capital Ltd, which is authorized and regulated by 
        the Financial Industry Regulatory Authority (FINRA) under 
        license No. SD026. The registered address is 155 North 
        Riverview Drive, 2nd Floor, SV, USA . The group also includes 
        Definance Global (CY) Ltd, with a registered address at 
        Nikokreontos 2, NICE DREAM, 6th floor, Flat/Office 601, 1066, 
        Nicosia, Cyprus.
        </p>
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center pb-12">
            <AnimateOnScroll animation="fadeInLeft">
                <Logo/>
            </AnimateOnScroll>
            <div className="w-full md:w-1/3 lg:2/5 border-t border-pcolor"></div>
            
            <div className="flex gap-3">
                {support.map((item, index) => (
                    <Link
                    key={index}
                    className=" hover:text-sideBg hover:font-bold transition-all duration-300 cursor-pointer"
                    href={item.path}
                    >
                    {item.title}
                    </Link>

                ))}
            </div>
            
            <AnimateOnScroll animation="fadeInRight">
                <p className="text-pcolor text-base mt-4 md:mt-0">
                Copyright &copy;. All rights Reserved
                </p>
            </AnimateOnScroll>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
