import React, { useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    const data = {
      fullName: name,
      mailAddress: email,
      subject: subject,
      message: message,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1.0/contact/query",
        data
      );
      setStatusMessage("Message sent successfully. You will hear from us shortly. Please do not send multiple messages.");

      setTimeout(() => {
        setStatusMessage("");
      }, 10000); // Clear the status message after 10 seconds

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatusMessage("Failed to send message. Please try again.");
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="w-3/4 mx-auto">
        <h1 className="text-4xl font-semibold mb-5">Reach Us</h1>
        <div className="flex items-center mb-4">
          <FaLocationDot className="mr-2" />
          <h1 className="text-xl font-semibold">Address:</h1>
        </div>
        <p>
          AR Creations Pvt Ltd <br />
          Arya Nagar, Shastri Market, Near Monark Hotel, Firozabad-283203 <br />
          <br />
          Email us at <strong>support@arcreations.com</strong>
        </p>

        {/* Contact form */}
        <div className="mt-12 w-full max-w-[550px]">
          <h1 className="text-3xl my-5">Contact us</h1>

          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="subject"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Message
              </label>
              <textarea
                rows="4"
                name="message"
                id="message"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-md border-2 border-[#e0e0e0] bg-white py-3 px-6 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow"
                required
              ></textarea>
            </div>
            {statusMessage && (
              <p className="mb-5 text-base font-medium text-green-600">
                {statusMessage}
              </p>
            )}
            <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
