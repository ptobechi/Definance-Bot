import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen  overflow-hidden">
      {/* Dotted line path */}
      <div className="absolute right-0 top-1/2 w-1/2 h-1/2 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 right-0"
          style={{ opacity: 0.5 }}
        >
          <path
            d="M400,50 Q300,100 350,200 Q400,300 300,400 Q200,500 100,450"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="10 10"
            fill="none"
          />
        </svg>
      </div>

      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center relative z-10">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-black text-center mb-16 max-w-4xl">
          The Future of Crypto Trading
        </h1>

        {/* Download Button */}
        <Link
          href="#download"
          className="bg-[#6c5ce7] hover:bg-[#5b4bc9] text-black font-medium py-3 px-8 rounded-full text-lg transition-all"
        >
          Download
        </Link>

        {/* Phone Image */}
        <div className="mt-16 relative">
          <div className="absolute -inset-10 bg-gradient-radial from-[#ffffff20] to-transparent opacity-50 blur-md"></div>
          <Image
            src="/mfdwg.png?height=600&width=300"
            alt="Toka Trading App"
            width={300}
            height={600}
            className="relative z-10"
            priority
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-20 md:left-40 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/kgvmg.png?height=150&width=150"
              alt="Decorative element"
              width={150}
              height={150}
              className="object-cover"
            />
        </div>

        <div className="absolute top-40 right-20 md:right-40 transform translate-x-1/2 -translate-y-1/2">
            <Image
              src="/kgrnvm.png?height=150&width=150"
              alt="Decorative element"
              width={150}
              height={150}
              className="object-cover"
            />
        </div>

        <div className="absolute bottom-40 left-40 transform -translate-x-1/2 translate-y-1/2">
            <Image
              src="/rmgv.png?height=150&width=150"
              alt="Decorative element"
              width={150}
              height={150}
              className="object-cover"
            />
        </div>
      </main>
    </div>
  )
}
