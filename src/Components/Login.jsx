import React, { useContext, useState } from "react";
import Theme from "../Contexts/Theme";
import Navbar2 from "./Navbar2";
import TrackFooter from "./TrackFooter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/Auth";

const Login = () => {
  const [isDarkMode] = useContext(Theme);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // Use the login function from useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    try {
      await login(email, password); // Authenticate user
      toast.success("User signed in successfully", {
        position: "top-right",
      });
      navigate("/admin");
    } catch (error) {
      toast.error( "Something went wrong", {
        position: "top-right",
      });
      console.error("Login error:", error.message);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <Navbar2 />
      <ToastContainer />
      <div
        className={`Login flex flex-col items-center justify-center min-h-screen p-6 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-[#F4F7FF] text-gray-800"
        }`}
      >
        <div
          className={`container mt-auto flex flex-col items-center justify-center w-full max-w-lg p-8 rounded-md shadow-lg ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          <h1 className="text-3xl uppercase font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            <div className="flex items-center p-3 mb-6 border rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none bg-transparent"
                type={isVisible ? "text" : "password"}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
              {isVisible ? (
                <i
                  onClick={toggleVisibility}
                  className="fa-solid fa-eye-slash text-2xl cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={toggleVisibility}
                  className="fa-solid fa-eye text-2xl cursor-pointer"
                ></i>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-3 font-bold text-white rounded-md transition-all duration-300 ${
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-5 w-5 border-2 border-t-2 border-white rounded-full"></div>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
        <div className="mt-auto w-full">
          <TrackFooter />
        </div>
      </div>
    </>
  );
};

export default Login;
