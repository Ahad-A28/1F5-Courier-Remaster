import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import gsap from 'gsap';
import Theme from '../Contexts/Theme';
import { useAuth } from '../hooks/Auth';
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { RiMenuFill } from 'react-icons/ri';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const loginRef = useRef(null);
  // const { user } = useAuth();
const [isDarkMode , setIsDarkMode ] = useContext(Theme)

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Animate menu items in
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      
      // Animate login section with a slight delay
      gsap.fromTo(loginRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <nav className={`relative flex flex-wrap justify-between   items-center p-5 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F4F7FF] text-black'} 
      transition-colors duration-300`}>
<h1
  className="text-2xl uppercase cursor-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 animate-gradient drop-shadow-[0_5px_15px_rgba(59,130,246,0.9)]"
>
  1F5 Courier
</h1>

   
      
<div className="flex  w-fit gap-10 justify-center items-center ">
          {/* Hamburger Menu */}
          <div 
  className={`hamburger lg:hidden text-2xl z-50 cursor-pointer ${
    isDarkMode ? 'text-white' : 'text-black'
  }`} 
  onClick={toggleMenu}
>
  {isMenuOpen ? <IoMdClose /> : <RiMenuFill />}
</div>


      <div ref={menuRef} className={`${
        isMenuOpen ? 'flex' : 'hidden'
        } lg:flex flex-col justify-center items-center font-bold lg:flex-row w-full lg:w-auto gap-5 text-lg
        absolute lg:static top-full left-0 right-0
        ${isDarkMode ? 'bg-gray-900' : 'bg-[#F4F7FF]'}
        p-4 lg:p-0
        shadow-lg lg:shadow-none
        z-50
        transition-colors duration-300
      `}>
        <ScrollLink className='cursor-pointer' to='Services' smooth={true} duration={500}>Services</ScrollLink>
        <ScrollLink className='cursor-pointer' to='OurPartners' smooth={true} duration={500}>Our Partners</ScrollLink>
        <RouterLink className='cursor-pointer' to='/track'>Track Your Parcel</RouterLink>
        <ScrollLink className='cursor-pointer' to='WhyChooseUs' smooth={true} duration={500}>Why choose us ?</ScrollLink>
     
     
      </div>

      <div className="theam cursor-pointer text-3xl  "   onClick={toggleTheme}>
      {
isDarkMode ? <IoMoonOutline /> : <FiSun />

      }

      </div>
</div>

      {/* Navigation Links */}
  
      
     
     
    
    </nav>
  )
}

export default Navbar
