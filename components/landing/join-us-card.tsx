
import AnimateOnScroll from "@/utils/AnimateOnScroll";

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
            Join Definance Bot Today!
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fadeInUp">
            <p className="text-white">
            Ready to transform your financial future? Sign up now with Definance Bot and take full control of your digital assets, investments, and financial goals. 
            </p>
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
