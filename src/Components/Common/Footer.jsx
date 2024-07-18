import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="mb-12">
        <h2 className="text-center text-xl m-8 font-medium">Quick Links</h2>
        <ul className="flex flex-wrap justify-center mx-auto space-x-12 gap-y-4 max-w-[51%]">
          <Link to="/faq">
            <li className="hover:underline">FAQ</li>
          </Link>
          <Link to="/privacy-policy">
            <li className="hover:underline">Privacy Policy</li>
          </Link>
          <li className="hover:underline">Return Policy</li>
          <li className="hover:underline">Shipping Policy</li>
          <li className="hover:underline">Partner With Us</li>
          <li className="hover:underline">Create a Return</li>
          <Link to="/shop">
            <li className="hover:underline">Shop</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline">About us</li>
          </Link>
          <Link to="/blogs">
            <li className="hover:underline">Blogs</li>
          </Link>
          <li className="hover:underline">Career</li>
        </ul>
      </div>
      <hr />
      <h2 className="text-center my-6">All rights reserved ©2024 AR Creations.</h2>
    </>
  );
};

export default Footer;
