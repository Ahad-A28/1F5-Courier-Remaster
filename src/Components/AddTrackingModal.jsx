import React, { useContext, useState } from "react";
import { db } from "../firebase/firebase"; // Import your Firebase configuration
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import Theme from "../Contexts/Theme";

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir"
];

const AddTrackingModal = ({ onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [isclicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Manage visibility
 const [isDarkMode] = useContext(Theme);
  const handleSubmit = async () => {
    // Validate inputs
    if (!trackingNumber || !customerName || !destination || !estimatedDelivery || !currentLocation) {
      alert("All fields are required!");
      return;
    }

    try {
      // Save data to Firebase
      await addDoc(collection(db, "trackingData"), {
        trackingNumber,
        customerName,
        destination,
        estimatedDelivery,
        currentLocation
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
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"} ${isDarkMode && 'text-gray-900'}`}>
      
        <div className="bg-white p-6 rounded shadow-lg transition-transform duration-300">
          <h2 className="text-xl font-bold mb-4">Add New Tracking</h2>
          <input
            type="text"
            placeholder="Tracking Number"
            className="border p-2 mb-4 w-full"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2 mb-4 w-full"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            className="border p-2 mb-4 w-full"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 mb-4 w-full"
            value={estimatedDelivery}
            onChange={(e) => setEstimatedDelivery(e.target.value)}
          />
          <select
            className="border p-2 mb-4 w-full"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
          >
            <option value="">Current Location</option>
            {statesOfIndia.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <button onClick={handleClose} className={`px-4 py-2 mr-2 bg-gray-200 rounded ${isclicked && 'disabled bg-gray-500 cursor-not-allowed'}`}>
              Cancel
            </button>
            <button onClick={()=>(handleSubmit(), setIsClicked(true)) }  className={`px-4 py-2 rounded ${isclicked ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}>
              Add Tracking
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTrackingModal;
