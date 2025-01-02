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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    )
}
export default Sponsors
  