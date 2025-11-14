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

  // ✅ Load user from localStorage (for “Welcome back, {name}”)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🎞️ Hero section background images
  const heroImages = [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1500&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1500&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1500&q=80",
  ];

  // 🔁 Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✨ GSAP fade animation for slides
  useEffect(() => {
    heroImgRefs.current.forEach((img, i) => {
      gsap.to(img, { opacity: i === currentSlide ? 1 : 0, duration: 1 });
    });
  }, [currentSlide]);

  // 🔤 Bouncing text animation for “SMART”
  useEffect(() => {
    const letters = titleRef.current.querySelectorAll(".bounce-letter");
    gsap.fromTo(
      letters,
      { y: 0 },
      {
        y: -12,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
        stagger: 0.15,
        duration: 1.4,
      }
    );
  }, []);

  

  // 🍽️ Reusable dish card component
  const DishCard = ({ img, title, desc, price }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img
        src={img}
        alt={title}
        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 text-center">
        <h3 className="text-2xl font-semibold mb-2 text-green-700">{title}</h3>
        <p className="text-gray-600 mb-3">{desc}</p>
        <p className="text-lg font-bold text-gray-900 mb-4">₹{price}</p>
        <button className="px-5 py-2 bg-white text-green-600 border-2 border-green-500 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all duration-300">
          Order Now
        </button>
      </div>
    </div>
  );

  return (
    <>
      

      {/* 🌟 HERO SECTION (Black background) */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-[1500px] mx-auto h-[650px] bg-black">
        {heroImages.map((src, i) => (
          <img
            key={i}
            ref={(el) => (heroImgRefs.current[i] = el)}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === 0 ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* 🔥 Dark Overlay + Text */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-center">
          <h1
            ref={titleRef}
            className="text-6xl font-extrabold mb-4 drop-shadow-lg flex gap-1"
          >
            {"SMART".split("").map((char, i) => (
              <span key={i} className="bounce-letter text-[#00ffff] inline-block">
                {char}
              </span>
            ))}
            <span className="ml-2 text-sky-400">RESTAURANT</span>
          </h1>

          {user ? (
            <p className="text-xl font-semibold text-yellow-300 mt-2">
              Welcome back, {user.name}! 👋
            </p>
          ) : (
            <p className="text-lg max-w-xl mx-auto">
              Discover flavors, creativity, and passion on every plate 🍴
            </p>
          )}
        </div>
      </div>

    </>
  );
}
