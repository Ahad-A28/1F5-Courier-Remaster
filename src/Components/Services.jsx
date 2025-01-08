import React, { useContext, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Theme from "../Contexts/Theme";
import { Link } from "react-router";
gsap.registerPlugin(ScrollTrigger);
const Services = () => {
  useEffect(() => {
    // Animate OurPartners section with ScrollTrigger
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#Services",
        start: "top 50%", // Animation starts when top of #OurPartners hits center of viewport
        toggleActions: "play none none reverse", // Play on enter, reverse on leave
      },
    });

    tl2.from(".container", {
      opacity: 0,
      scale: 0,
      duration: 1,
    });
  }, []);

  const [isDarkMode] = useContext(Theme);
  return (
    <>
      <div
        id="Services"
        className={`${
          isDarkMode ? "bg-gray-900" : "bg-[#F4F7FF]"
        } flex justify-center touch-pan-y`}
      >
        <div className="container   p-10 w-[80vw] h-full  bg-[#89BCFF] rounded-lg ">
          <h1 className="text-center text-5xl font-bold pt-10 text-black">
            Services
          </h1>
          <h1 className="text-center text-2xl font-bold pt-10 text-black">
            We provide safe and reliable Cargo Solutions
          </h1>

          <div className="cards flex gap-10 justify-center pt-10 pb-10 flex-wrap">
            <div className="RoadTransport rounded-xl overflow-hidden cursor-pointer bg-white border-2 border-black flex flex-col p-5 md:p-10 w-full md:w-[30vw] group perspective">
              <div className="relative mb-4">
                <img
                  className="w-full md:w-[30vw] transition-all duration-700 ease-in-out group-hover:[transform:translateX(5%)_translateZ(50px)] h-[40vw] md:h-[15vw] translate-x-[-60%] translate-y-[-30%]"
                  src="/Services Images/Road Transport/Truck.png"
                  alt="Truck"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-left font-bold text-2xl md:text-4xl">
                  Road Transport
                </h1>
                <p className="text-left text-[#9CA3AF] text-sm md:text-lg">
                  From Start to End, Your Trusted Friend
                </p>
                <Link
                  to={"/contactus"}
                  className={`text-sm p-3 text-center rounded-md md:rounded-md uppercase transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-black text-white"
                      : "bg-white border-2 border-blue-400 text-black"
                  }`}
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="OceanFreight rounded-xl overflow-hidden cursor-pointer bg-white border-2 border-black flex flex-col p-5 md:p-10 w-full md:w-[30vw] group perspective">
              <div className="relative mb-4">
                <img
                  className="w-full md:w-[30vw] transition-all duration-700 ease-in-out group-hover:[transform:translateX(5%)_translateZ(50px)] h-[40vw] md:h-[15vw] translate-x-[-60%] translate-y-[-30%]"
                  src="/Services Images/Ocean Fright.png"
                  alt="Truck"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-left font-bold text-2xl md:text-4xl">
                  OceanFreight
                </h1>
                <p className="text-left text-[#9CA3AF] text-sm md:text-lg">
                  Through the Waves, Your Trust We Save
                </p>
                <Link
                  to={"/contactus"}
                  className={`text-sm p-3 text-center rounded-md md:rounded-md uppercase transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-black text-white"
                      : "bg-white border-2 border-blue-400 text-black"
                  }`}
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="AirFreight rounded-xl overflow-hidden cursor-pointer bg-white border-2 border-black flex flex-col p-5 md:p-10 w-full md:w-[30vw] group perspective">
              <div className="relative mb-4">
                <img
                  className="w-full md:w-[30vw] transition-all duration-700 ease-in-out group-hover:[transform:translateX(5%)_translateZ(50px)] h-[40vw] md:h-[15vw] translate-x-[-60%] translate-y-[-30%]"
                  src="/Services Images/Air Feright.png"
                  alt="Truck"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-left font-bold text-2xl md:text-4xl">
                  Air Freight
                </h1>
                <p className="text-left text-[#9CA3AF] text-sm md:text-lg">
                  Beyond the Sky, Your Needs We Supply
                </p>
                <Link
                  to={"/contactus"}
                  className={`text-sm p-3 text-center rounded-md md:rounded-md uppercase transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-black text-white"
                      : "bg-white border-2 border-blue-400 text-black"
                  }`}
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className="Drone Parcel delivery rounded-xl overflow-hidden cursor-pointer bg-white border-2 border-black flex flex-col p-5 md:p-10 w-full md:w-[30vw] group perspective">
              <div className="relative mb-4">
                <img
                  className="w-full md:w-[30vw] transition-all duration-700 ease-in-out group-hover:[transform:translateX(5%)_translateZ(40px)] h-[40vw] md:h-[15vw] translate-x-[-40%] translate-y-[-30%]"
                  src="\Services Images\Drone Parcle Delivery.png"
                  alt="Truck"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="text-left text-2xl font-bold md:text-4xl">
                  Drone Parcel delivery
                </h1>
                <p className="text-left text-[#9CA3AF] text-sm md:text-lg">
                  On the Wings, We Bring Your Things
                </p>
                <Link
                  to={"/contactus"}
                  className={`text-sm p-3 text-center rounded-md md:rounded-md uppercase transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-black text-white"
                      : "bg-white border-2 border-blue-400 text-black"
                  }`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
