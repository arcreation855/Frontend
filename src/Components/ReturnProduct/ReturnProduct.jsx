import React from 'react'

const ReturnProduct = () => {
    return (
        <div className="bg-gray-100 py-12">
            <div className="w-3/4 mx-auto">
                <h1 className="text-3xl font-semibold mb-5">Returns & Exchanges</h1>

                <div className="mt-10 w-full max-w-[550px]">
                    <form action="" method="POST">
                        <div className="mb-5">
                            <label
                                for="orderNumber"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Order Number
                            </label>
                            <input
                                type="number"
                                name="orderNumber"
                                id="orderNumber"
                                placeholder="Order Number"
                                className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                for="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="example@domain.com"
                                className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                for="returnMessage"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Please specify reason for return or exchange
                            </label>
                            <textarea
                                rows="4"
                                name="returnMessage"
                                id="returnMessage"
                                placeholder="Type your reason..."
                                className="w-full resize-none rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReturnProduct