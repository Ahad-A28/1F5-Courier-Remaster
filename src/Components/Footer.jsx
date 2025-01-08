import React, { useContext } from "react";
import { Link as RouterLink } from "react-router";
import { Link as ScrollLink } from "react-scroll";
import Theme from "../Contexts/Theme";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = ( ) => {

  const [isDarkMode] = useContext(Theme)
  return (
    <footer
      className={`${
        isDarkMode  
          ? "bg-gray-900 text-gray-100"
          : "bg-[#F4F7FF] text-black"
      } py-10 transition-colors duration-300 touch-pan-y`}
    >
      <div
        className={`container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8`}
      >
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">1F5 Courier</h1>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Address</h3>
          <p className="text-sm">
           Hyderabad
          </p>
         
        </div>

        {/* Navigation Section 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Home</h3>
          <ul className="space-y-1">
           
            <li>
              <RouterLink to="/track" className="text-sm hover:underline hover:text-blue-700 ">
                Track your Parcle
              </RouterLink>
            </li>
         
            <li>
              <RouterLink to="/contactus" className="text-sm hover:underline hover:text-blue-700 ">
                Get Quotation
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/aboutus" className="text-sm hover:underline hover:text-blue-700 ">
                About
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/contactus" className="text-sm hover:underline hover:text-blue-700 ">
                Contact
              </RouterLink>
            </li>
          
            
          </ul>
        </div>

 

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
      
          <p className="text-sm">
            <a href="mailto:1f5courierhelp@gmail.com" className="hover:underline">
            1f5courierhelp@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Social Icons and Footer Bottom */}
      <div className="mt-10 border-t border-gray-300 pt-6">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center">
          {/* Developer Info */}
          <div className="flex flex-col justify-center items-center">
            <h1>Made By Ahad A28</h1>
            <div className="links flex justify-center items-center gap-4 mt-2">
              <a
                href="https://github.com/Ahad-A28"
                target="_blank"
                className="text-3xl hover:translate-y-[-0.5rem] transition-transform duration-200"
              >
               <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ahada28/"
                target="_blank"
                className="text-3xl text-[#2b62bf] hover:translate-y-[-0.5rem] transition-transform duration-200"
              >
            <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/ahad.a28/"
                target="_blank"
                className="w-[3rem] hover:translate-y-[-0.5rem] transition-transform duration-200"
              >
                <img src="/Instragram logo.png" alt="" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0">
            <p className="text-sm text-gray-500">
              Copyright © 2025 1F5 Courier | All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

