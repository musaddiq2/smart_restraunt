import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const titleRef = useRef(null);
  const heroImgRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Images
  const heroImages = [
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1500&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1500&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1500&q=80",
  ];

  // 🍕 Most Popular Dishes
  const popularDishes = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Rich, creamy curry made with tender chicken in spiced tomato sauce.",
      price: 299,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1603898037225-8494e1f08358?w=800&q=80",
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cubes of paneer with smoky tandoori spices.",
      price: 249,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1625944524472-fd278f5b3b60?w=800&q=80",
    },
    {
      id: 3,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice layered with marinated chicken and spices.",
      price: 329,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1598514982586-3dc1c4458b36?w=800&q=80",
    },
  ];

  // 🍰 Desserts
  const desserts = [
    {
      id: 1,
      name: "Chocolate Lava Cake",
      image: "https://images.unsplash.com/photo-1606312619070-d6d3b3dcdbcd?w=800&q=80",
      desc: "Soft cake with molten chocolate center — pure indulgence.",
    },
    {
      id: 2,
      name: "Gulab Jamun",
      image: "https://images.unsplash.com/photo-1626594996880-7b61c04357e3?w=800&q=80",
      desc: "Classic Indian dessert soaked in rose syrup.",
    },
    {
      id: 3,
      name: "Cheesecake",
      image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?w=800&q=80",
      desc: "Creamy and rich with buttery biscuit crust.",
    },
  ];

  // 🥗 Veg Dishes
  const vegDishes = [
    {
      id: 1,
      name: "Veg Pulao",
      image: "https://images.unsplash.com/photo-1617196034796-ae2e74a1e52b?w=800&q=80",
    },
    {
      id: 2,
      name: "Dal Tadka",
      image: "https://images.unsplash.com/photo-1668236543093-9f9b3b7e4e19?w=800&q=80",
    },
    {
      id: 3,
      name: "Palak Paneer",
      image: "https://images.unsplash.com/photo-1627308595187-2d8b07e2768f?w=800&q=80",
    },
  ];

  // 🌈 Hero Slider Animation
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroImages.length;
      const current = heroImgRefs.current[currentSlide];
      const next = heroImgRefs.current[nextSlide];
      gsap.to(current, { opacity: 0, duration: 1 });
      gsap.to(next, { opacity: 1, duration: 1, delay: 0.5 });
      setCurrentSlide(nextSlide);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  // 🅰️ Bouncing Text Animation
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

  // ✨ Scroll Animations
  useEffect(() => {
    gsap.utils.toArray(".fade-up").forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }, []);

  return (
    <>
      <Navbar />

      {/* 🌟 Hero Section */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-[1500px] mx-auto h-[650px] mb-20">
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
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
          <h1
            ref={titleRef}
            className="text-6xl font-extrabold mb-4 drop-shadow-lg flex gap-1"
          >
            {"SMART".split("").map((char, i) => (
              <span
                key={i}
                className="bounce-letter text-[#ff4e50] inline-block"
              >
                {char}
              </span>
            ))}
            <span className="ml-2">RESTAURANT</span>
          </h1>
          <p className="text-lg max-w-xl mx-auto">
            Discover flavors, creativity, and passion on every plate 🍴
          </p>
        </div>
      </div>

      {/* 🍕 Most Popular Dishes */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ff4e50]">
          Most Popular Dishes
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="fade-up bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-3 transition-transform duration-300"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {dish.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{dish.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-[#ff4e50] font-bold text-lg">
                    ₹{dish.price}
                  </span>
                  <span className="bg-yellow-400 text-sm px-2 py-1 rounded-lg font-medium">
                    ⭐ {dish.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🍰 Desserts */}
      <section className="bg-pink-50 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ff4e50]">
          Sweet Treats & Desserts
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {desserts.map((item) => (
            <div
              key={item.id}
              className="fade-up bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🥗 Veg Dishes */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#ff4e50]">
          Vegetarian Favorites
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {vegDishes.map((item) => (
            <div
              key={item.id}
              className="fade-up bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👨‍🍳 Special Dish Preparation */}
      <section className="bg-gradient-to-r from-orange-100 to-red-100 py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <img
            src="https://images.unsplash.com/photo-1601050690597-9d1f47f79da1?w=800&q=80"
            alt="Special Dish"
            className="rounded-3xl shadow-lg w-full md:w-1/2 object-cover"
          />
          <div className="fade-up md:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-[#ff4e50]">
              Chef’s Special: Royal Dum Biryani
            </h2>
            <p className="text-gray-700 mb-3">
              A royal dish slow-cooked in layers of saffron-infused rice and
              tender spiced chicken, sealing the aroma perfectly.
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>Marinate chicken overnight with yogurt and spices.</li>
              <li>Layer with fragrant basmati rice.</li>
              <li>Seal the pot and cook on low flame for 45 minutes.</li>
              <li>Serve with mint raita and fried onions.</li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
