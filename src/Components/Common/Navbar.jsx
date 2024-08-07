import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaRegUser } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import Logo from "/Icons/arCreationsLogo.png";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navbarRef = useRef(null);

  const token = localStorage.getItem("jwtToken");

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const expiration = localStorage.getItem("tokenExpiration");
    const isTokenValid = token && expiration && new Date().getTime() < expiration;

    setIsLoggedIn(isTokenValid);
  }, []);

  const handleLogout = async () => {
    const loginId = localStorage.getItem("loginId");

    if (token) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1.0/user/logout/${loginId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("loginId");
        alert(response.data.message);
      } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
        alert('Logout failed');
      }
    } else {
      alert('No token found, please log in');
    }
  };

  return (
    <nav ref={navbarRef} className="sticky w-full bg-white">
      <div className="my-6 mx-10 flex flex-wrap items-center">
        <div className="w-[70%] flex flex-wrap justify-center">

          {!isSearchVisible && (
            <>
              <img src={Logo} className="h-14 w-auto mx-10" alt="Logo" />
              <ul className="flex flex-wrap justify-center space-x-8 gap-y-2">
                <Link to="/">
                  <li className="hover:underline">Home</li>
                </Link>
                <Link to="/shop">
                  <li className="hover:underline">Shop</li>
                </Link>
                <Link to="/about">
                  <li className="hover:underline">About us</li>
                </Link>
                <li className="hover:underline"><a href="https://m.indiamart.com/ar-traders-firozabad/?pos=1&kwd=ar%20traders&tags=||Pref|Loc|0.0||company|pfSt|firozabad|TS|rsf:cmp-|-cq:firozabad|stype:attr=1-br|qr_nm:gd|res:RC4|com-cf:hh|ptrs:na|ktp:N0|mtp:no|qry_typ:C|lang:en|wc:3|cs:9899/" target="_blank">Buy in Wholesale</a></li>
                <Link to="/blogs">
                  <li className="hover:underline">Blogs</li>
                </Link>
                <Link to="/contact">
                  <li className="hover:underline">Contact</li>
                </Link>
              </ul>
            </>
          )}
        </div>

        {isSearchVisible ? (
          <form className="my-6">
            <input
              type="text"
              className="absolute w-[95%] md:w-[50%] top-2 left-3 md:left-[25%] px-4 py-2 bg-white border border-gray-600"
              placeholder="Search..."
            />
          </form>
        ) : (
          <>
            <div className="flex flex-wrap space-x-6 justify-center w-[30%] relative gap-y-4">
              <FaSearch
                className="h-6 w-auto cursor-pointer"
                onClick={handleSearchClick}
              />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white hover:bg-blue-500 px-3 py-1 rounded-lg"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <FaRegUser className="h-6 w-auto" />
                </Link>
              )}

              <Link to="/cart">
                <div className="relative">
                  <IoBagHandleOutline className="h-6 w-auto" />
                  <span className="absolute -top-3 -right-4 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                    3
                  </span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
      <hr />
    </nav>
  );
};

export default Navbar;
