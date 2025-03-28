import { useContext, useEffect, useState } from "react";
import Navbar2 from "/src/Components/Navbar2.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Theme from "../Contexts/Theme";
import TrackFooter from "./TrackFooter";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Track() {
  const [isDarkMode, setIsDarkMode] = useContext(Theme);
  const [trackingData, setTrackingData] = useState([]);
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [selectedTracking, setSelectedTracking] = useState(null);

  useGSAP(() => {
    gsap.from(".track", {
      opacity: 0,
      scale: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  });

  useEffect(() => {
    onSnapshot(collection(db, "trackingData"), (snapshot) => {
      setTrackingData(snapshot.docs.map((data) => data.data()));
    });
  }, []);

  // Function to handle the input change
  const handleInputChange = (e) => {
    setTrackingNumberInput(e.target.value.toUpperCase());
  };

  // Function to handle the tracking number search
  const handleTrack = () => {
    const foundTracking = trackingData.find(
      (data) => data.trackingNumber === trackingNumberInput
    );
    setSelectedTracking(foundTracking || null);
  };

  return (
    <main
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-[#F4F7FF] text-black"
      } transition-colors duration-300 touch-pan-y`}
    >
      {/* Navbar */}
      <Navbar2 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Track Section */}
      <div
        className={`track flex-grow flex items-center justify-center p-5  md:p-10 max-w-[1200px] mx-auto mt-10 rounded-lg ${
          isDarkMode
            ? "bg-gray-900 border-gray-600 text-gray-200"
            : "bg-[#F4F7FF] border-gray-300 text-gray-900"
        }`}
      >
        <div className="left p-5 md:p-10 flex-1">
          <h1
            className={`text-3xl md:text-5xl   font-bold mb-4 ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Track Your Parcel
          </h1>
          <p className="mb-6 text-sm md:text-base">
            Enter your tracking number to check the status of your parcel.
          </p>
          <div
            className={`input-container w-full md:max-w-[400px] border-2 p-2 rounded-lg flex items-center ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            }`}
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumberInput}
              onChange={handleInputChange}
              className={`flex-grow outline-none p-2 bg-transparent font-semibold text-sm md:text-base uppercase ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            />
            <button
              onClick={handleTrack}
              className={`px-4 py-2 rounded-lg ml-2 text-sm md:text-base transition-colors ${
                isDarkMode
                  ? "bg-gray-200 text-gray-900"
                  : "bg-gray-900 text-white"
              }`}
            >
              Track
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right relative flex-1 flex items-center justify-center hidden lg:flex group perspective">
          <img
            className="h-[10rem] md:h-[15rem] lg:h-[20rem] max-w-full absolute bottom-10 left-1/2 transform -translate-x-1/2"
            src="/Tracking page images/train.png"
            alt="Train"
          />
          <img
            className="w-full max-w-full"
            src="/Tracking page images/railline.png"
            alt="Rail Line"
          />
        </div>
      </div>

      {/* Result Card */}
      {selectedTracking ? (
        <div className="result p-5 flex justify-center items-center mt-[-1rem]">
          <div
            className={`container flex flex-col max-w-[550px] w-full ${
              isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "text-gray-700 bg-white"
            } p-5 rounded-lg shadow-lg`}
          >
            {/* Tracking Information */}
            <div className="img flex justify-between items-center p-2 mb-4">
              <h1 className="text-2xl font-bold uppercase ">
                Tracking # {selectedTracking.trackingNumber}
              </h1>
              <div className="image flex flex-col items-center justify-center">
                {selectedTracking.status === "Delivered" ? (
                  <DotLottieReact
                    src="https://lottie.host/381c9afa-2929-4f81-8841-c5d7a30f6618/0o1hIoJgHh.lottie"
                    loop
                    autoplay
                  />
                ) : selectedTracking.status === "Out Of Delivery" || selectedTracking.status === "In Transit" || selectedTracking.status === "Dispatch" ? (
                  <img className="h-[8rem]" src="Cardimages/Transit.gif" alt="Out Of Delivery" />
                ) :""}
        {selectedTracking.status === "Failed" ?  (
                  <DotLottieReact
                    src="https://lottie.host/68c4ed63-c61d-4740-a48a-6772742889e0/c2bhEYuuuA.lottie"
                    loop
                    autoplay
                  />
                ) : selectedTracking.status === "Slightly Delay" ?   <DotLottieReact
                src="https://lottie.host/b9429a47-9da6-4fa8-92ed-1e3b5457133d/pGsZvOsKZi.lottie"
                loop
                autoplay
              /> : selectedTracking.status === "On Hold"? (
              <DotLottieReact
      src="https://lottie.host/9ebd716d-2101-49c5-8875-b9927ce75e07/ravShcVGyC.lottie"
      loop
      autoplay
    />):""
            
            }
                <p className="mt-2 font-bold text-xl ">
                  {selectedTracking.status}
                </p>
              </div>
            </div>

            {/* Other Info */}
            <div className="name flex gap-2 border-b-2 border-gray-300 p-2 justify-between">
              <h2 className="text-lg font-semibold">Customer</h2>
              <p className="">{selectedTracking.customerName}</p>
            </div>
            <div className="status flex justify-between border-b-2 border-gray-300 p-2">
              <h2 className="text-lg font-semibold">Status</h2>
              <p className="">{selectedTracking.status}</p>
            </div>
            <div className="CurrentLocation flex justify-between border-b-2 border-gray-300 p-2">
              <h2 className="text-lg font-semibold">Current Location</h2>
              <p className="">{selectedTracking.currentLocation}</p>
            </div>
            <div className="Destination flex justify-between border-b-2 border-gray-300 p-2">
              <h2 className="text-lg font-semibold">Destination</h2>
              <p className="">{selectedTracking.destination}</p>
            </div>
            <div className="EstimatedDeivery flex justify-between border-b-2 border-gray-300 p-2">
              <h2 className="text-lg font-semibold">Estimated Delivery</h2>
              <p className="">{selectedTracking.estimatedDelivery}</p>
            </div>
          </div>
        </div>
      ) : null
      // <div className="result p-5 flex justify-center items-center mt-[-1rem]">
      //   <div
      //     className={`container flex flex-col max-w-[550px] w-full ${
      //       isDarkMode ? "bg-gray-800 text-gray-200" : "text-gray-700 bg-white"
      //     } p-5 rounded-lg shadow-lg text-center`}
      //   >
      //     <h1 className="text-xl font-bold">No Data Found</h1>
      //     <p className="mt-2">Please check the tracking number and try again.</p>
      //   </div>
      // </div>
      }

      {/* Footer */}
      <div className="mt-auto w-full">
        <TrackFooter />
      </div>
    </main>
  );
}

export default Track;
