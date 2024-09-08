'use client'

import SubCard from '@/components/sub-card'
import { MdEmail, MdLocationPin } from 'react-icons/md'
import { IoTime } from 'react-icons/io5'

const Contact = () => {

    return (
      <div className="isolate bg-white px-2 lg:px-8">
        <SubCard/>

        <div className="lg:grid grid-cols-2 gap-8 lg:p-8 bg-gray-50">
            <div className="bg-secondaryColor text-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                    Get in touch
                </h2>
                <p className="text-white mb-8">
                For any inquiries or support, we're here to help. 
                Reach out to us using the contact details below:
                </p>
                <div className="space-y-6 text-white">
                    <div className="flex items-start">
                        <MdLocationPin className="text-primaryColor text-2xl mr-4" />
                        <div>
                        545 Mavis Island<br />
                        Chicago, IL 99191
                        </div>
                    </div>
                    <div className="flex items-start">
                        <IoTime className="text-primaryColor text-2xl mr-4" />
                        <div>
                        +1 (555) 234-5678
                        </div>
                    </div>
                    <div className="flex items-start">
                        <MdEmail className="text-primaryColor text-2xl mr-4" />
                        <div>
                        support@definancebot.com
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
                <form action="#" method="POST">
                <div className="grid grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
                    />
                    </div>
                    <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
                    />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
                    />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone number</label>
                    <input
                        type="tel"
                        id="phone-number"
                        name="phone-number"
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
                    />
                    </div>
                    <div className="col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primaryColor focus:border-primaryColor"
                    ></textarea>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primaryColor text-white rounded-md shadow-md hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
                    >
                    Send message
                    </button>
                </div>
                </form>
            </div>
        </div>

      </div>
    )
}
export default Contact;