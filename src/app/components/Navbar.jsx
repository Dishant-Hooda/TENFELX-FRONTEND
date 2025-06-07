"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const Navbar = () => {
  const sideMenuRef = useRef();
  const [isScroll, setIsScroll] = useState(false);

  const openMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(0)";
    }
  };

  const closeMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(-100%)";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>

      {/* Navbar starts */}
      <nav
        className={`w-full flex justify-between items-center px-10 py-5 fixed top-0 z-50 border-b border-white transition duration-300 ${
          isScroll ? "bg-black shadow-md backdrop-blur-lg" : "bg-black"
        }`}
      >
        {/* navbar logo with search bar */}
        <div className="flex items-center gap-10">
          <div className="logo">
            <h1 className="font-bold tracking-wider text-3xl text-white">
              TENFLE<span className="text-[#A020F0]">x</span>
            </h1>
          </div>

          <div className="search md:block hidden">
            <form className="flex items-center gap-2 transition-all duration-300">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-gray-300 bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#A020F0]"
              />
              <button type="submit" className="text-[#A020F0] hover:ml-2 transition-all duration-300">
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>


        <div className="flex items-center gap-4">
          <Link
            href={"/#home"}
            className="text-xl text-white"
          >
            <span className="relative text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2.5px] after:bg-[#A020F0] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">Sign <span className="font-bold text-[#A020F0]">In</span></span>
          </Link>


          <Link
            className="group relative hidden lg:flex items-center gap-3 px-10 py-2.5 border border-white rounded-full ml-4 overflow-hidden transition-all duration-300"
            href="/#contact"
          >
            <span className="relative z-10 text-white transition-all duration-300">
              Sign Up
            </span>
            <FaArrowRight className="relative z-10 transition-all duration-300 text-white " />
            <span className="absolute inset-0 bg-[#A020F0] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0"></span>
          </Link>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
