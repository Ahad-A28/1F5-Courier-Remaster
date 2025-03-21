import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Theme from "../Contexts/Theme";
import Navbar2 from "./Navbar2";
import Footer from "./footer";
import Tracking from "./Tracking";
import { useAuth } from "../hooks/Auth";
import { toast, ToastContainer } from "react-toastify";
import TrackFooter from "./TrackFooter";
import "react-toastify/dist/ReactToastify.css";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isDarkMode] = useContext(Theme);
  const toastShownRef = useRef(false);
  const toastIdRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/login");
      } else if (!toastShownRef.current) {
        try {
          toastIdRef.current = toast.success("Login successful", {
            toastId: "login-success-" + Date.now(),
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            onOpen: () => {
              toastShownRef.current = true;
            },
            onClose: () => {
              toastShownRef.current = false;
              toastIdRef.current = null;
            }
          });
        } catch (error) {
          console.error("Toast error:", error);
        }
      }
    }

    return () => {
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    };
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
       
      <Navbar2 />
      <div
        className={`admin p-10 ${isDarkMode ? "bg-[#111827] text-white" : "bg-[#F4F7FF] text-black"} min-h-[77vh]`}
      >
        <h1 className="text-4xl font-bold text-center mb-5">Admin Page</h1>
        <Tracking />
      </div>
  <TrackFooter/> 
    </>
  );
};

export default Admin;
