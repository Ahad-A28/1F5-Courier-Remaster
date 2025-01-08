import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Services from "./Components/Services";
import WhyChooseUs from "./Components/WhyChooseUs";
import FAQ from "./Components/FAQ";
import Footer from "./Components/footer";
import Theme from "./Contexts/Theme";

const App = () => {
  const [isDarkMode] = useContext(Theme);

  return (
    <main id="main"
      className={`${
        isDarkMode ? "bg-gray-900 " : "bg-[#F4F7FF]"
      } h-screen   transition-colors duration-300  touch-pan-y`}
    >
      <Navbar />
      <Banner />
      <Services />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </main>
  );
};

export default App;
