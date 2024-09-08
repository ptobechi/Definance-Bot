import JoinUs from "@/components/landing/join-us-card"
import SubCard from "@/components/sub-card"
import Link from "next/link"


const FAQ = () => {
    return (
        <div className="isolate bg-white px-2 lg:px-8">
            <SubCard/>

            <div className="p-8 bg-gray-50 rounded-lg shadow-md">
                {/* <!-- Grid or Flexbox Layout --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* <!-- Left Section (Heading and Subheading) --> */}
                    <div>
                    <h2 className="text-xl font-bold text-primaryColor mb-4">
                        Frequently asked questions
                    </h2>
                    <p className="text-gray-600">
                        Can’t find the answer you’re looking for? Reach out to our  
                        <Link href={"/contact"} className="text-primaryColor mx-2">customer support</Link> team.
                    </p>
                    </div>

                    {/* <!-- Right Section (FAQ Items) --> */}
                    <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-primaryColor mb-2">How do you make holy water?</h3>
                        <p className="text-gray-600 text-sm">
                        You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">What's the best thing about Switzerland?</h3>
                        <p className="text-gray-600 text-sm">
                        I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">What do you call someone with no body and no nose?</h3>
                        <p className="text-gray-600 text-sm">
                        Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Why do you never see elephants hiding in trees?</h3>
                        <p className="text-gray-600 text-sm">
                        Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                        </p>
                    </div>
                    </div>
                </div>
            </div>

            <JoinUs/>
        </div>
    )
}
export default FAQ