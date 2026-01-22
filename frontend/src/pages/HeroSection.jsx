import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const titleRef = useRef(null);
  const heroImgRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const heroImages = [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1500&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1500&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1500&q=80",
  ];

  // Slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // slower slide transition
    return () => clearInterval(interval);
  }, []);

  

  // GSAP fade + scale animation for slides
  useEffect(() => {
    heroImgRefs.current.forEach((img, i) => {
      gsap.to(img, {
        opacity: i === currentSlide ? 1 : 0,
        scale: i === currentSlide ? 1 : 1.1,
        duration: 1.5,
        ease: "power2.inOut",
      });
    });
  }, [currentSlide]);

  // Bounce letters animation
  useEffect(() => {
    const letters = titleRef.current.querySelectorAll(".bounce-letter");
    gsap.fromTo(
      letters,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
        duration: 1.2,
      }
    );

    // Animate button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-[1500px] mx-auto h-[650px] md:h-[750px] bg-gradient-to-b from-rose-200 to-rose-300">
        {heroImages.map((src, i) => (
          <img
            key={i}
            ref={(el) => (heroImgRefs.current[i] = el)}
            src={src}
            alt={`Slide ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-100/40 via-rose-200/50 to-rose-300/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-6">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-5 text-rose-700 flex flex-wrap justify-center gap-1 drop-shadow-lg"
          >
            {"SMART".split("").map((char, i) => (
              <span key={i} className="bounce-letter text-rose-600 inline-block">
                {char}
              </span>
            ))}
            <span className="ml-2 text-rose-900">RESTAURANT</span>
          </h1>

          {user ? (
            <p className="text-lg sm:text-xl font-semibold text-rose-900 mt-2">
              Welcome back, {user.name}! 👋
            </p>
          ) : (
            <p className="text-md sm:text-lg max-w-xl mx-auto text-rose-800">
              Discover flavors, creativity, and passion on every plate 🍽️
            </p>
          )}

          {/* CTA Button */}
          <button
            ref={buttonRef}
            className="mt-6 px-8 py-3 rounded-full bg-rose-700 hover:bg-rose-600 text-white font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            Explore Menu
          </button>
        </div>
      </div>
    </>
  );
}
