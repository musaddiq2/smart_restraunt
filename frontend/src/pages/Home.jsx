import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
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
      <Navbar />

      {/* 🌟 HERO SECTION (Black background) */}
      <div className="relative overflow-hidden rounded-3xl shadow-lg max-w-[1500px] mx-auto h-[650px] mb-20 bg-black">
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

      {/* 🍛 PORTFOLIO / MENU SECTION (Aqua + Sky Blue) */}
      <section className="max-w-[1300px] mx-auto px-5 pb-20 space-y-20 bg-gradient-to-br from-sky-100 via-cyan-100 to-blue-50 rounded-3xl shadow-inner pt-10">
        {/* 🥘 Special Biryani */}
        <div className="fade-up">
          <h2 className="text-4xl font-bold text-center text-sky-700 mb-10">
            🥘 Special Biryani
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <DishCard
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVDLqGo7kphimHrs5Q7LXjV5Nwnv444hGbrA&s"
              title="Hyderabadi Biryani"
              desc="Fragrant rice layered with juicy marinated chicken and spices."
              price="299"
            />
            <DishCard
              img="https://www.google.com/url?sa=i&url=https%3A%2F%2Fartofpalate.com%2Fmutton-biryani%2F&psig=AOvVaw1JrJipCfiNjdl2nkqZLY5O&ust=1763009122809000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIi6sdDv65ADFQAAAAAdAAAAABAE"
              title="Mutton Dum Biryani"
              desc="Slow-cooked mutton and saffron rice infused with royal flavors."
              price="349"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1606490192680-79c9b2d1a36a?w=800"
              title="Egg Biryani"
              desc="Soft-boiled eggs over basmati rice cooked with spicy masala."
              price="249"
            />
          </div>
        </div>

        {/* 🥦 Special Veg Items */}
        <div className="fade-up">
          <h2 className="text-4xl font-bold text-center text-sky-700 mb-10">
            🥦 Special Veg Items
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <DishCard
              img="https://images.unsplash.com/photo-1598514982589-16bdb98df91b?w=800"
              title="Paneer Butter Masala"
              desc="Soft paneer cubes in creamy, buttery tomato gravy."
              price="229"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1625948967270-b26e9e0a5df3?w=800"
              title="Veg Handi"
              desc="Mixed vegetables cooked in a rich traditional curry."
              price="199"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1626198044667-4d89c2b0ccbd?w=800"
              title="Malai Kofta"
              desc="Delicious dumplings in a cashew-cream sauce."
              price="249"
            />
          </div>
        </div>

        {/* 🍗 Special Chicken */}
        <div className="fade-up">
          <h2 className="text-4xl font-bold text-center text-sky-700 mb-10">
            🍗 Special Chicken
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <DishCard
              img="https://images.unsplash.com/photo-1606755962773-0f63bfc4b42f?w=800"
              title="Butter Chicken"
              desc="Tender chicken pieces in buttery tomato cream sauce."
              price="299"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1625948964241-df32d9a74d2a?w=800"
              title="Chicken Tikka"
              desc="Chargrilled chicken marinated in Indian spices."
              price="279"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d?w=800"
              title="Chicken Kebab"
              desc="Smoky, juicy kebabs grilled to perfection."
              price="259"
            />
          </div>
        </div>

        {/* 🍰 Dessert */}
        <div className="fade-up">
          <h2 className="text-4xl font-bold text-center text-sky-700 mb-10">
            🍰 Special Desserts by Smart Restaurant
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <DishCard
              img="https://images.unsplash.com/photo-1590080875831-45f0fdbf24a7?w=800"
              title="Rasmalai"
              desc="Soft cottage cheese dumplings soaked in sweet milk."
              price="149"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800"
              title="Chocolate Lava Cake"
              desc="Warm, gooey chocolate cake filled with molten chocolate."
              price="179"
            />
            <DishCard
              img="https://images.unsplash.com/photo-1626094837361-1b1cf3db99e1?w=800"
              title="Gulab Jamun"
              desc="Classic Indian dessert soaked in sugar syrup."
              price="129"
            />
          </div>
        </div>
      </section>
    </>
  );
}
