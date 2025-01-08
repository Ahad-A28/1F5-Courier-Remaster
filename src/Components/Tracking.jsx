import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import AddTrackingModal from './AddTrackingModal';
import Theme from '../Contexts/Theme';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Tracking = () => {
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState([]);
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [isDarkMode] = useContext(Theme);

  // Fetch tracking data when the component mounts
  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'trackingData'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrackingData(data);
    } catch (error) {
      console.error('Error fetching tracking data: ', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, currentLocation) => {
    try {
      const trackingRef = doc(db, 'trackingData', id);
      await updateDoc(trackingRef, { status, currentLocation });
      fetchTrackingData(); // Refresh the data
    } catch (error) {
      console.error('Error updating status: ', error);
    }
  };

  const deleteTracking = async (id) => {
    try {
      const trackingRef = doc(db, 'trackingData', id);
      await deleteDoc(trackingRef);
      fetchTrackingData();
    } catch (error) {
      console.error('Error deleting tracking data: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <div className={`p-5 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#F4F7FF] text-gray-900'} `}>
        <div className="flex flex-wrap mb-4">
          <button 
            onClick={() => setShowAddModal(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 sm:mb-0"
          >
            + Add New Tracking
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4 mb-2 sm:mb-0"
          >
            Log Out
          </button>
        </div>
        <div className="mt-6 overflow-x-auto rounded-lg  ">
          <table className={`w-full bg-white shadow rounded ${isDarkMode && 'text-gray-900'}  `}>
            <thead>
              <tr className="border-b">
                <th className="py-4 px-2 text-left">Tracking Number</th>
                <th className="py-4 px-2 text-left">Customer</th>
                <th className="py-4 px-2 text-left">Status</th>
                <th className="py-4 px-2 text-left">Destination</th>
                <th className="py-4 px-2 text-left">CurrentLocation</th>
                <th className="py-4 px-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-4 px-2 text-center">
                    Loading...
                  </td>
                </tr>
              ) : trackingData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-4 px-2 text-center">
                    No tracking data available.
                  </td>
                </tr>
              ) : (
                trackingData.map((tracking) => (
                  <tr key={tracking.id} className="border-b">
                    <td className="py-4 px-2">{tracking.trackingNumber}</td>
                    <td className="py-4 px-2">{tracking.customerName}</td>
                    <td
                      className={`py-4 px-2 ${
                        tracking.status === 'Delivered'
                          ? 'text-green-500'
                          : tracking.status === 'In Transit'
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {tracking.status}
                    </td>
                    <td className="py-4 px-2">{tracking.destination}</td>
                    <td className="py-4 px-2">{tracking.currentLocation}</td>
                    <td className="py-4 px-2 flex flex-col sm:flex-row sm:items-center">
                      <select
                        onChange={(e) => updateStatus(tracking.id, e.target.value, tracking.currentLocation)}
                        className="border rounded p-1 mb-2 sm:mb-0 sm:mr-2"
                      >
                        <option value="">Select Status</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Failed">Failed</option>
                      </select>
                      <button
                        onClick={() => deleteTracking(tracking.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddTrackingModal
          onClose={() => {
            setShowAddModal(false);
            fetchTrackingData(); // Refresh data after adding a new tracking record
          }}
        />
      )}
    </>
  );
};

export default Tracking;
