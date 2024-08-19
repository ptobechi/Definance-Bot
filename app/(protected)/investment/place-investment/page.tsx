"use client"
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useState } from "react";
import { useSelectedPlan } from "@/hooks/selectedPlanContext";
import { DailyProfit, formatToUSD, futureDate } from "@/_functions";
import axios from "axios";
import { privateRequest } from "@/config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const InvestForm = () => {
  const { selectedPlan } = useSelectedPlan();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(0);
  const amounts = [3000, 3500, 4000, 4500, 5000, 10000];
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numberValue = parseFloat(inputValue); // Convert the input value to a number

    setSelectedAmount(numberValue); // Set the state with the number value
  };

  const handleFormSubmit = () => {
    setLoading(true);
    if (!selectedAmount || !selectedPlan) {
      toast.error("Please Select or Enter an amount to Invest.");
      setLoading(false);
      return;
    }

    if (selectedPlan && selectedAmount < parseFloat(selectedPlan.min)) {
      setLoading(false);
      toast.error(`Minimum amount is ${selectedPlan.min}`);
      return;
    }

    const data = {
      name: selectedPlan?.name,
      sector: "investment",
      amount: selectedAmount,
      roi: selectedPlan.roi,
      close_date: selectedPlan.duration
    };

    privateRequest
      .post("/wallet-portfolio", data)
      .then((response: any) => {
        if (response["status"] === 201) {
          toast(
            `You have successfully invested in
             ${selectedPlan?.name } with ${formatToUSD(selectedAmount)}
            `, {
            description:`
              Started:Today (${new Date()}
              Closing at: ${new Date(new Date().getTime() + parseFloat(selectedPlan.duration) * 24 * 60 * 60 * 1000)})
            `,
            action: {
              label: "View Portfolio",
              onClick: () => router.push('/portfolio'),
            },
          })
          router.push('/portfolio')
        }
      })
      .catch((error: any) => {
        // Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
          // Check if the status code is 403
          if (error.response && error.response.status === 403) {
          } else {
            toast("Error: try again"); // Handle 403 error here
          }
        } else {
          toast("Error:unknown error occured please try again later");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="py-4 lg:px-3">
      <div className="flex flex-col xxl:flex-row  gap-x-6">
        {/* <Toaster position="bottom-center" /> */}
        <div className="w-full xxl:w-1/2">
          <p
            onClick={() => {}}
            className="text-primaryColor mb-2 text-lg cursor-pointer"
          >
            <IoArrowBackSharp className="inline" /> Back to plan
          </p>
          <h1 className="text-[#364a63] mb-6 text-2xl md:text-3xl lg:text5xl">
            Ready to Get Started?
          </h1>
          <div className="py-5 flex items-center px-4 border-2 bg-gray-50 border-[#dbdfea] rounded-md mb-6">
            <span>
              <FaMoneyCheckAlt
                className="mr-4 text-secondaryColor"
                size={"1.5rem"}
              />
            </span>
            <div className="flex flex-col justify-center text-base text-planHeading font-medium">
              <p className="font-bold text-sideBg"> {selectedPlan?.name}</p>
              <p className="text-sm font-normal">
                Invest for {selectedPlan?.duration} days and get daily profit{" "}
                {selectedPlan?.roi}%
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="mb-2 text-sideBg">Choose Quick Amount to Invest</h5>
            <div className="grid grid-cols-3 x:grid-cols-4 md:grid-cols-5 gap-6 font-medium text-gray-600">
              {amounts.map((amount, index) => (
                <div
                  onClick={() => {
                    if (selectedAmount === amount) {
                      setSelectedAmount(null);
                    } else {
                      setSelectedAmount(amount);
                    }
                  }}
                  key={index}
                  className={`border-2 border-[#dbdfea] flex items-center justify-center w-full py-3 cursor-pointer rounded-md hover:bg-secondaryColor hover:text-white transition-all duration-200 ${
                    selectedAmount === amount
                      ? "bg-primaryColor text-white border-none"
                      : ""
                  }`}
                >
                  $ {amount}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h5 className="mb-2 text-sideBg">Or Enter Amount</h5>
            </div>
            <input
              className="border-2 border-[#dbdfea] py-4 px-2 w-full rounded-md outline-none mb-3"
              type="number"
              id=""
              placeholder="Enter Amount"
              name="selectedAmount"
              value={selectedAmount || ""}
              onChange={handleInputChange}
            />
            <p className="text-[0.75rem] italic font-semibold text-planHeading">
              Note: Minimum Invest {formatToUSD(selectedPlan?.min)} USD
            </p>
          </div>
        </div>

        <div className="w-full px-2 mt-8 xxl:ml-12">
          <div className="border-2 border-[dbdfea] bg-white w-full rounded-md py-1">
            <div className="p-6 px-7 border-b-2 border-[dbdfea]">
              <h1 className="text-sideBg text-lg md:text-2xl lg:text-3xl mb-5">
                Your Investment Details
              </h1>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm font-medium">
                <div>
                  <p className="text-[#8094ae]">Name of Scheme</p>
                  <p className="text-sideBg">
                    {selectedPlan && selectedPlan?.name}
                  </p>
                </div>
                <div>
                  <p className="text-[#8094ae]">Term of Days</p>
                  <p className="text-sideBg">
                    {selectedPlan && selectedPlan?.duration}
                  </p>
                </div>
                <div>
                  <p className="text-[#8094ae]">Daily Profit</p>
                  <p className="text-sideBg">
                    {selectedPlan &&
                      formatToUSD(
                        DailyProfit(selectedAmount, selectedPlan?.roi)
                      )}{" "}
                    <strong style={{ color: "green" }} className="text-success">
                      ({selectedPlan?.roi})
                    </strong>
                  </p>
                </div>
                <div>
                  <p className="text-[#8094ae]">Total Return</p>
                  <p className="text-sideBg">
                    {selectedPlan &&
                      selectedAmount &&
                      formatToUSD(
                        DailyProfit(selectedAmount, selectedPlan?.roi) *
                          parseFloat(selectedPlan?.duration)
                      )}
                  </p>
                </div>

                <div>
                  <p className="text-[#8094ae]">Total Net Profit</p>
                  <p className="text-sideBg">
                    {selectedPlan &&
                      selectedAmount &&
                      formatToUSD(
                        DailyProfit(selectedAmount, selectedPlan?.roi) *
                          parseFloat(selectedPlan?.duration) +
                          selectedAmount
                      )}
                  </p>
                </div>
                <div>
                  <p className="text-[#8094ae]">Term Starts at</p>
                  <p className="text-sideBg">
                    {new Date().toLocaleDateString("en-US")}
                  </p>
                </div>
                <div>
                  <p className="text-[#8094ae]">Term Ends at</p>
                  <p className="text-sideBg">
                    {selectedPlan && futureDate(selectedPlan?.duration)}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-7 py-4 text-sm">
              <div className="flex mb-2 justify-between">
                <p className="text-[#8094ae]">Amount to Invest</p>
                <p className="text-sideBg ">
                  {selectedAmount && formatToUSD(selectedAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center text-base font-bold text-white mt-5">
            <button
              className={`py-3 px-5 rounded-md bg-primaryColor hover:bg-secondaryColor transition-all duration-300${
                !loading ? "hover:bg-primaryColor" : ""
              } transition-all duration-300`}
              onClick={handleFormSubmit}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-primaryColor border-solid text-center"></div>
              ) : (
                "Confirm & Proceed"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestForm;
