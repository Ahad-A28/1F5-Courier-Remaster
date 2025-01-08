import React, { useContext } from 'react'
import Theme from '../Contexts/Theme'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const TrackFooter = () => {
    const [isDarkMode,setIsDarkMode] = useContext(Theme)
    return (
     <>
     
     <div className="mt-10 border-t border-gray-300 pt-5 w-full   ">
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
     
     </>
  )
}

export default TrackFooter