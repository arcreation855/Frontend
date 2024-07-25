import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMobileInput = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 10) {
      setFormData({ ...formData, contactNumber: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long, including one capital letter, one special symbol, and one number."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!/^\d{10}$/.test(formData.contactNumber)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1.0/user/register", {
        loginId: formData.email,
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        password: formData.password,
      });
      console.log(response.data);
      alert("Registration successful!");
      navigate("/login")
    } catch (error) {
      console.error(error);
      alert(`Registration failed!. ${error.response.data.message}`);
    }
  };

  return (
    <div className="bg-gray-100 md:py-16">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </h1>

            <form className="space-y-4 md:space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contactNumber"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Mobile Number
                </label>
                <input
                  type="number"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="9999999999"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.contactNumber}
                  onChange={handleMobileInput}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-600 rounded focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-800">
                    I accept the{" "}
                    <Link to="/terms-conditions" target="_blank">
                      <a className="font-medium text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>
                    </Link>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-800">
                Already have an account?{" "}
                <Link to="/login">
                  <a className="font-medium text-blue-600 hover:underline">
                    Login here
                  </a>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
