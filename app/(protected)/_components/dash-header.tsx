import { CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BiTransferAlt } from "react-icons/bi";
import { FaArrowRightFromBracket } from "react-icons/fa6";

interface headerProps {
    title: string;
    subTitle: string;
    isButton?: boolean
}
const DashHeader = ({
    title,
    subTitle,
    isButton
}: headerProps) => {
    return (
        <div>
             <CardTitle>
                {title}
            </CardTitle>

            <div className="flex flex-col text-sm lg:flex-row lg:justify-between lg:items-center gap-y-4 mb-5 mt-5">
                <div>
                    <p className="text-pcolor text-sm md:text-base">
                        {subTitle}
                    </p>
                </div>
                {
                    isButton && (
                        <div className="flex gap-x-3">
                            <Link href={"/deposit"} className="flex flex-col items-center gap-y-1">
                                <button className="px-10 xs:px-14 py-3 bg-[#3b041a] hover:bg-[#893c5a] text-white rounded-md transition-all duration-300">
                                <span className="text-[1.3rem] xs:text-[1.5rem]">
                                    <FaArrowRightFromBracket />
                                </span>
                                </button>
                                <p className="text-[#8094ae] text-[12px] font-semibold">Deposit</p>
                            </Link>
                            <Link href={"/send"} className="flex flex-col items-center gap-y-1">
                                <button className="px-10 xs:px-14 py-3 bg-[#893c5a] hover:bg-[#3b041a] transition-all duration-300 rounded-md text-white">
                                <span className="text-[1.3rem] xs:text-[1.5rem]">
                                    <BiTransferAlt />
                                </span>
                                </button>
                                <p className="text-[#8094ae] text-[12px] font-semibold">Send</p>
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
export default DashHeader;