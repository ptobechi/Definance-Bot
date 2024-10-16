
import Sponsors from '@/components/landing/sponsors'
import HowWeWork from '@/components/landing/how-we-work'
import AdvisorsCard from '@/components/landing/advisors-card'
import JoinUs from '@/components/landing/join-us-card'
import WhoWeAre from '@/components/landing/who-we-are'
import Link from 'next/link'
import Footer from '@/components/landing/footer'
import Header from '@/components/header'


const Home = () => {
  return (
    <>
    <Header/>
    <div className="bg-white">
      <div className="relative isolate px-6 pt-10 lg:px-8">
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

        <div className="mx-auto max-w-2xl pt-20 sm:pt-48 lg:pt-56">
          <div className="text-left">
            <h1 className="text-4xl font-bold tracking-tight
             text-gray-900 sm:text-6xl"
            >
              Where Smart Investing Meets AI Innovation!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Unlock the potential of your investments with our cutting-edge AI technology. Join a community of forward-thinking investors and take control of your financial future today! Let’s turn your investment dreams into reality!
            </p>
            <div className="mt-5 flex items-center gap-x-6">
              <Link
                href="register"
                className="rounded-md bg-primaryColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
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

      <Sponsors/>
      <div className="lg:px-20 md:px-10">
        <HowWeWork/>
        <AdvisorsCard/>
        <JoinUs/>
        <WhoWeAre/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home
