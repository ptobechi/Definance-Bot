import { formatToUSD } from "@/_functions";
import { useSelectedPlan } from "@/hooks/selectedPlanContext";
import { FaCircleCheck } from "react-icons/fa6";

interface Props {
  _id: string;
  name: string;
  network: string;
  roi: string;
  duration: string;
  min: string;
  features: string[];
}

const Card = ({
  _id,
  name,
  network,
  roi,
  duration,
  min,
  features
}: Props) => {
  const { setSelectedId, selectedId } = useSelectedPlan();

  return (
    <div>
      <div
        className={`border ${
          selectedId === _id ? "border-primaryColor" : "border-[#dbdfea]"
        } shadow-sm py-6 w-full max-w-[320px] md:max-w-[360px] mx-auto rounded-md relative card-font transition-all duration-300`}
      >
        {selectedId === _id && (
          <span className="absolute text-2xl right-3 top-5 text-primaryColor">
            <FaCircleCheck />
          </span>
        )}
        <div className="px-6 md:px-8 border-b border-[#dbdfea]">
          <h1 className="text-[1.4rem] md:text-[1.6rem] text-planHeading font-bold mb-2 text-center">
            {name}
          </h1>
          <p className="text-planHeading text-sm font-light mb-4 text-center">
            {network}
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[1.8rem] md:text-[2rem] text-[#364a63] block font-medium mb-1">
                {roi}%
              </span>
              <p className="text-sm text-planHeading">Daily interest</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-[1.8rem] md:text-[2rem] text-[#364a63] block font-medium mb-1">
                {duration}
              </span>
              <p className="text-sm text-planHeading">Term Days</p>
            </div>
          </div>
        </div>

        <div className="px-6 md:px-8 text-[#526484] pt-4 pb-6">
          <ul className="p-0">
            <li className="flex justify-between gap-x-4 items-center text-[0.875rem] mb-1">
              <span className="block">Min Holding</span>
              <span className="block">-</span>
              <span className="block">{!Number.isNaN(Number(min)) ? formatToUSD(min) : min}</span>
            </li>
          </ul>
          <h6 className="text-left text-[1rem] font-bold mb-2">Features:</h6>
          <ul className="text-left list-disc pl-5">
            {features.map((feature, index) => (
              <li key={index} className="mb-1">{feature}</li>
            ))}
          </ul>
        </div>

        <div className="px-6 md:px-8 text-center py-4">
          <button
            onClick={() => {
              setSelectedId(_id);
            }}
            disabled={selectedId === _id}
            className={`text-center border border-[#dbdfea] bg-[#f5f6fa] py-2 px-4 md:px-5 rounded-md text-planHeading transition-all duration-300 ${
              selectedId === _id ? "bg-primaryColor text-white" : ""
            }`}
          >
            {selectedId === _id ? "Selected" : "Select Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
