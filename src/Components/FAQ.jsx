import React, { useState, useEffect, useContext } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Theme from "../Contexts/Theme";

gsap.registerPlugin(ScrollTrigger);

const FAQItem = ({ question, answer}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode] = useContext(Theme)
  return (
    <div
      className={`faq-item border rounded-lg mb-4 transition-all duration-300 ${
        isOpen
          ? "bg-black text-white"
          : isDarkMode
          ? "bg-gray-700 text-gray-300"
          : "bg-gray-100 text-black"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-question p-4 font-bold text-lg sm:text-xl md:text-2xl flex justify-between items-center cursor-pointer">
        {question}
        {/* Arrow */}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          ➤
        </span>
      </div>
      <div
        className={`faq-answer overflow-hidden transition-all duration-500 text-base sm:text-lg md:text-xl ${
          isOpen ? "max-h-[500px] p-5 text-[#4B5F90]" : "max-h-0"
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".faq-container", // The FAQ container class
        start: "top 80%", // Start animation when 80% of FAQ is in view
        end: "bottom center",
        toggleActions: "play none none reverse",
      
      },
    })
      .fromTo(
        ".faq-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        ".faq-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.3, duration: 0.8 },
        "-=0.5"
      );
  }, []);
  const [isDarkMode] = useContext(Theme)
  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-300" : "bg-[#F4F7FF] text-black touch-pan-y"
      }`}
    >
      <div className="faq-container mx-auto px-4 py-7">
        <h1 className="faq-title text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h1>
        <div className="max-w-4xl mx-auto">
          {[
            {
              question: "What is your refund policy?",
              answer: "You can request a refund within 24 hour of purchase.",
            },
            {
              question: "How do I track my order?",
              answer: "Use the tracking ID sent to your Email or Whatsapp.",
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept Visa, MasterCard, PayPal, Paytm, G-pay, Phone-pay and more.",
            },
            {
              question: "How can I resolve my query?",
              answer: "If you have any questions, concerns, or need assistance, please don't hesitate to contact us. Our dedicated support team is here to help. You can reach us through the Contact Us page or via email, as provided on our website. We aim to respond promptly and ensure your concerns are addressed effectively",
            },
             
          ].map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
