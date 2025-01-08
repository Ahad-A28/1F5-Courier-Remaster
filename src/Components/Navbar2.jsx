import React, { useState, useRef, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import gsap from 'gsap';
import Theme from '../Contexts/Theme';
import { useAuth } from '../hooks/Auth';
import { IoMoonOutline } from 'react-icons/io5';
import { FiSun } from 'react-icons/fi';
import { RiMenuFill } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
const Navbar2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const loginRef = useRef(null);
  // const { user } = useAuth();
  const [isDarkMode , setIsDarkMode ] = useContext(Theme)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
   };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
      
      gsap.fromTo(loginRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  return (
    <nav className={`relative flex flex-wrap justify-between items-center p-5 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F4F7FF] text-black'} 
      transition-colors duration-300`}>
      <h1
  className="text-2xl uppercase cursor-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 animate-gradient drop-shadow-[0_5px_15px_rgba(59,130,246,0.9)]"
>
  1F5 Courier
</h1>
      
      {/* Hamburger Menu */}
<div className="flex  w-fit gap-10 justify-center items-center">
<div 
  className={`hamburger lg:hidden text-2xl z-50 cursor-pointer ${
    isDarkMode ? 'text-white' : 'text-black'
  }`} 
  onClick={toggleMenu}
>
  {isMenuOpen ? <IoMdClose /> : <RiMenuFill />}
</div>
      

      {/* Navigation Links */}
      <div ref={menuRef} className={`${
        isMenuOpen ? 'flex' : 'hidden'
        } lg:flex flex-col justify-center items-center font-bold lg:flex-row w-full lg:w-auto gap-5 text-lg
        absolute lg:static top-full left-0 right-0
        ${isDarkMode ? 'bg-gray-900' : 'bg-[#F4F7FF]'}
        p-4 lg:p-0 shadow-lg lg:shadow-none z-50
        transition-colors duration-300`}>
        <Link to="/">Home</Link>
        <Link to='/aboutus'>About Us</Link>
        <Link to='/contactus'>Contact Us</Link>
        <Link to='/track'>Track Your Parcel</Link>
      </div>

     
           <div className="theam cursor-pointer text-3xl "   onClick={toggleTheme}>
      {
isDarkMode ? <IoMoonOutline /> : <FiSun />

      }

      </div>
</div>
     
    
    </nav>
  )
}

export default Navbar2
