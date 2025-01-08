import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Theme from "../Contexts/Theme";
import Navbar2 from "./Navbar2";
import Footer from "./footer";
import Tracking from "./Tracking";
import { useAuth } from "../hooks/Auth";
import { toast, ToastContainer } from "react-toastify";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isDarkMode] = useContext(Theme);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login"); // Redirect to login if not authenticated
    } else if (!isLoading && user) {
      toast.success("Login successful", { position: "top-right"  });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Show a loading screen while checking auth state
  }

  return (
    <>
      <ToastContainer />
      <Navbar2 />
      <div
        className={`admin p-10 ${isDarkMode ? "bg-[#111827] text-white" : "bg-[#F4F7FF] text-black"}`}
      >
        <h1 className="text-4xl font-bold text-center mb-5">Admin Page</h1>
        <Tracking />
      </div>
      <Footer />
    </>
  );
};

export default Admin;
