import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collectionGroup, doc, updateDoc } from "firebase/firestore";
import Theme from "../Contexts/Theme";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify/unstyled";

const UpdateTracking = ({ onClose, trackingData , fetchData }) => {
  // States for form fields
  const [trackingNumber, setTrackingNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [Items, setItems] = useState("");
  const [destination, setDestination] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [ThirdPartyName, setThirdPartyName] = useState("");
  const [ThirdPartyTr, setThirdPartyTr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode] = useContext(Theme);
 

 
 

  // Populate form with existing data
  useEffect(() => {
    if (trackingData) {
      setTrackingNumber(trackingData.trackingNumber || "");
      setCustomerName(trackingData.customerName || "");
      setItems(trackingData.Items || "");
      setDestination(trackingData.destination || "");
      setEstimatedDelivery(trackingData.estimatedDelivery || "");
      setCurrentLocation(trackingData.currentLocation || "");
      setThirdPartyName(trackingData.ThirdPartyName || "");
      setThirdPartyTr(trackingData.ThirdPartyTr || "");
    }
  }, [trackingData]);

  const handleUpdate = async () => {
    // Strict validation
    if (!trackingData?.id) {
      console.error("Missing tracking ID:", trackingData);
      toast.error("Unable to update: Invalid tracking ID");
      return;
    }

    // Validate required fields
    if (!trackingNumber || !customerName || !destination || !estimatedDelivery || !currentLocation) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);
    try {
      // Explicitly create document reference with collection path
      const trackingRef = doc(db, "trackingData", String(trackingData.id));
      
      const updateData = {
        trackingNumber,
        customerName,
        Items,
        destination,
        estimatedDelivery,
        currentLocation,
        ThirdPartyName,
        ThirdPartyTr,
      };

      // Debug log before update
      console.log("Attempting update with:", {
        docId: trackingData.id,
        updateData
      });

      await updateDoc(trackingRef, updateData);
      toast.success("Tracking updated successfully!");
      fetchData();
      setIsVisible(false);
      setTimeout(() => onClose(), 300);
    } catch (error) {
      console.error("Update Error Details:", {
        error,
        trackingId: trackingData?.id,
        collection: "trackingData"
      });
      toast.error(`Update failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    isVisible && (
      <>
      <ToastContainer/>
      <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center 
        transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"} 
        ${isDarkMode && "text-gray-900"}`}>
        <div className="bg-white p-6 rounded shadow-lg transition-transform duration-300 min-w-[40vw]">
          <h2 className="text-xl font-bold mb-4">Update Tracking</h2>
          <div className="inputs flex flex-col">
            <input
              type="text"
              placeholder="Third party Name"
              className="border p-2 mb-4 uppercase"
              value={ThirdPartyName}
              onChange={(e) => setThirdPartyName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Third party Tr"
              className="border p-2 mb-4"
              value={ThirdPartyTr}
              onChange={(e) => setThirdPartyTr(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tracking Number"
              className="border p-2 mb-4 uppercase"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              
            />
            <input
              type="text"
              placeholder="Customer Name"
              className="border p-2 mb-4"
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
              className="border p-2 mb-4"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <input
              type="date"
              className="border p-2 mb-4"
              value={estimatedDelivery}
              onChange={(e) => setEstimatedDelivery(e.target.value)}
            />
            <input
              type="text"
              placeholder="Current Location"
              className="border p-2 mb-4"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className={`px-4 py-2 mr-2 rounded ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className={`px-4 py-2 rounded text-white ${
                isLoading 
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Tracking"}
            </button>
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default UpdateTracking;
