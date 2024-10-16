import sp500 from "@/img/sp500.png"
import nasdaq from "@/img/nasdaq.jpeg"
import gold from "@/img/gold.jpg"
import bitcoin from "@/img/bitcoin.jpeg"
import ethereum from "@/img/ethereum.jpeg"
import nvidia from "@/img/nvidia.jpeg"
import Image from "next/image"

const Sponsors = () => {
    return (
      <div className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Our Key Offerings
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
            <Image
              alt="SP 500"
              src={sp500}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain"
            />
            <Image
              alt="Nasdaq"
              src={nasdaq}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain"
            />
            <Image
              alt="Gold"
              src={gold}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain"
            />
            <Image
              alt="Bitcoin"
              src={bitcoin}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain sm:col-start-2 lg:col-start-auto"
            />
            <Image
              alt="Ethereum"
              src={ethereum}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain"
            />
            <Image
              alt="Nvidia"
              src={nvidia}
              width={158}
              height={48}
              className="col-span-1 max-h-12 w-full object-contain"
            />
          </div>
        </div>
      </div>
    )
}
export default Sponsors
  