import React, { useContext, useLayoutEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Theme from '../Contexts/Theme';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#WhyChooseUs",
          start: "top 75%", // Adjust trigger points
          end: "bottom 25%",
          toggleActions: "play none none reverse",
        },
      });

      // Heading animation
      tl.from(".left h1", {
        opacity: 0,
        x: 200,
        duration: 1,
      });

      // Cards animation
      tl.from("#WhyChooseUs .card > div", {
        y: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.2, // Stagger child animations
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);
  
  const [isDarkMode] = useContext(Theme);
  
  return (
    <div
      id="WhyChooseUs"
      className={`${
        isDarkMode ? 'bg-gray-900' : 'bg-[#F4F7FF]'
      } p-10 flex flex-col justify-center items-center touch-pan-y`}
    >
      <div className="left px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-[#3361C0] via-[#5798DD] to-[#5494DB] text-transparent bg-clip-text">
          Why choose us for your service
        </h1>
      </div>

      <div className="card flex flex-wrap justify-center items-center gap-10 mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="child flex flex-col justify-center items-center gap-4 border-2 rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full sm:w-[18rem] md:w-[20rem]">
          <img
            className="w-[5rem] h-[6rem]"
            src="/OnlineSupport.png"
            alt=""
          />
          <h1 className="text-3xl font-black">Online Support</h1>
          <p>Seamless Help, Anytime, Anywhere.</p>
        </div>

        <div className="child flex flex-col justify-center items-center gap-4 border-2 rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full sm:w-[18rem] md:w-[20rem]">
          <img
            className="w-[5rem] h-[6rem]"
            src="/Tracking.png"
            alt=""
          />
          <h1 className="text-3xl font-black">Order Tracking</h1>
          <p>Stay Informed, Stay in Control.</p>
        </div>

        <div className="child flex flex-col justify-center items-center gap-4 border-2 rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full sm:w-[18rem] md:w-[20rem]">
          <img
            className="w-[5rem] h-[6rem]"
            src="/costSave.png"
            alt=""
          />
          <h1 className="text-3xl font-black">Cost Save</h1>
          <p>Maximizing Value, Minimizing Costs.</p>
        </div>

        <div className="child flex flex-col justify-center items-center gap-4 border-2 rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full sm:w-[18rem] md:w-[20rem]">
          <img
            className="w-[5rem] h-[6rem]"
            src="/DroneDelivery.png"
            alt=""
          />
          <h1 className="text-3xl font-black">Drone Delivery</h1>
          <p>Revolutionizing Delivery with Technology.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
