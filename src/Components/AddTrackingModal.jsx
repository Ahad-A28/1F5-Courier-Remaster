import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase"; // Import your Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import Theme from "../Contexts/Theme";
import { toast, ToastContainer } from "react-toastify";

const AddTrackingModal = ({ onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [Items, setItems] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [ThirdPartyName, setThirdPartyName] = useState("");
  const [ThirdPartyTr, setThirdPartyTr] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Manage visibility
  const [isDarkMode] = useContext(Theme);
  const [isTrackingAdded, setIsTrackingAdded] = useState(false);

  // Move toast to useEffect
  useEffect(() => {
    if (isTrackingAdded) {
      toast.success("Tracking Added Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isTrackingAdded]);

  const handleSubmit = async () => {
    // Validate inputs
    if (
      !trackingNumber ||
      !customerName ||
      !destination ||
      !estimatedDelivery ||
      !currentLocation
    ) {
      toast.error("All fields are required!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
  

      return;

    }
    else{
      setIsTrackingAdded(true); // Update tracking added status
    }

    try {
      // Save data to Firebase
      await addDoc(collection(db, "trackingData"), {
        trackingNumber,
        customerName,
        Items,
        destination,
        estimatedDelivery,
        currentLocation,
        ThirdPartyName,
        ThirdPartyTr,

      });
      
      setIsVisible(false); // Hide modal after successful submission
      setTimeout(() => onClose(), 300); // Allow animation to complete
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleClose = () => {
    setIsVisible(false); // Trigger animation
    setTimeout(() => onClose(), 300); // Allow animation to complete before unmounting
  };
 

 
  return (

    isVisible && (
      <>
      <ToastContainer/>
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isDarkMode && "text-gray-900"}`}
      >
        <div className="bg-white p-6 rounded shadow-lg transition-transform duration-300 min-w-[40vw]">
          <h2 className="text-xl font-bold mb-4">Add New Tracking</h2>
          <div className="inputs flex flex-col ">
          <input
            type="text"
            placeholder="Third party Name"
            className="border p-2 mb-4   uppercase"
            value={ThirdPartyName}
            onChange={(e) => setThirdPartyName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Third party Tr"
            className="border p-2 mb-4   "
            value={ThirdPartyTr}
            onChange={(e) => setThirdPartyTr(e.target.value)}
          />
         
          <input
            type="text"
            placeholder="Tracking Number"
            className="border p-2 mb-4   uppercase"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2 mb-4  "
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Items"
            className="border p-2 mb-4  "
            value={Items}
            onChange={(e) => setItems(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 mb-4  "
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 mb-4  "
            value={estimatedDelivery}
            onChange={(e) => setEstimatedDelivery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Current Location"
            className="border p-2 mb-4  "
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          />

          </div>
        
          
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className={`px-4 py-2 mr-2 bg-gray-200 rounded ${
                isclicked && "disabled bg-gray-500 cursor-not-allowed"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={() => (handleSubmit() )}
              className={`px-4 py-2 rounded bg-blue-500 text-white  
                 `}
            >
              Add Tracking
            </button>
          </div>
        </div>
      </div>
      </>
      
    )
  );
};

export default AddTrackingModal;
