// src/pages/Menu.jsx
import React, { useEffect, useRef } from "react";
import { FaShoppingCart, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaQuoteLeft, FaStar } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Expanded Menu Items (Used by the Section component) ---
const items = [
  // --- Veg Starters & Mains (20 Items) ---
  { category: "Veg", name: "Paneer Butter Masala", price: "$18.00", img: "https://images.pexels.com/photos/12737916/pexels-photo-12737916.jpeg" },
  { category: "Veg", name: "Veg Biryani", price: "$16.50", img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f" },
  { category: "Veg", name: "Palak Paneer", price: "$17.00", img: "https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg" },
  { category: "Veg", name: "Malai Kofta", price: "$18.50", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { category: "Veg", name: "Aloo Gobi", price: "$14.00", img: "https://images.unsplash.com/photo-1585845511269-e77a1198c610" },
  { category: "Veg", name: "Chana Masala", price: "$15.00", img: "https://images.unsplash.com/photo-1596707337775-65487779d72a" },
  { category: "Veg", name: "Dal Makhani", price: "$16.00", img: "https://images.unsplash.com/photo-1606774843793-7182245e9545" },
  { category: "Veg", name: "Mushroom Curry", price: "$17.50", img: "https://images.unsplash.com/photo-1623916962454-00d938b8d4f4" },
  { category: "Veg", name: "Vegetable Korma", price: "$17.00", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },
  { category: "Veg", name: "Baingan Bharta", price: "$15.50", img: "https://images.unsplash.com/photo-1595183354964-b654e87707e7" },
  { category: "Veg", name: "Masala Dosa", price: "$12.00", img: "https://images.unsplash.com/photo-1634533039643-4f938222a01d" },
  
    // --- Non-Veg Starters & Mains (20 Items) ---
  { category: "Non-Veg", name: "Chicken Tikka Masala", price: "$22.00", img: "https://images.unsplash.com/photo-1603894584373-5ac78b2aa58c" },
  { category: "Non-Veg", name: "Butter Chicken", price: "$21.50", img: "https://images.unsplash.com/photo-1631515243349-4b063ea5342a" },
  { category: "Non-Veg", name: "Lamb Rogan Josh", price: "$25.00", img: "https://images.unsplash.com/photo-1603213303681-37f22a571f11" },
  { category: "Non-Veg", name: "Goan Fish Curry", price: "$23.50", img: "https://images.unsplash.com/photo-1615719398715-99932145e54d" },
  { category: "Non-Veg", name: "Chicken Biryani", price: "$19.00", img: "https://images.unsplash.com/photo-1565299624942-4c2780e5b72e" },
  { category: "Non-Veg", name: "Seekh Kebab", price: "$14.00", img: "https://images.unsplash.com/photo-1611720853528-56900f6063e7" },
  { category: "Non-Veg", name: "Tandoori Chicken", price: "$20.00", img: "https://images.unsplash.com/photo-1626027376326-79774581f4f5" },
  { category: "Non-Veg", name: "Prawn Vindaloo", price: "$24.00", img: "https://images.unsplash.com/photo-1612999403816-1f6b5790c507" },
  { category: "Non-Veg", name: "Mutton Curry", price: "$26.00", img: "https://images.unsplash.com/photo-1594967389599-2a9442a9a957" },
  
  { category: "Desserts", name: "Gulab Jamun (2 Pcs)", price: "$8.00", img: "https://images.unsplash.com/photo-1601362752157-195c808f86f8" },
  { category: "Desserts", name: "Rasgulla (2 Pcs)", price: "$7.50", img: "https://images.unsplash.com/photo-1602741512411-9a706b4502d3" },
  { category: "Desserts", name: "Gajar Ka Halwa", price: "$9.00", img: "https://images.unsplash.com/photo-1571995893354-9e3f94747123" },
  { category: "Desserts", name: "Kulfi Falooda", price: "$10.00", img: "https://images.unsplash.com/photo-1605389441113-d492476b70c8" },
  { category: "Desserts", name: "Rasmalai (2 Pcs)", price: "$9.50", img: "https://images.unsplash.com/photo-1626027376326-79774581f4f5" },
  { category: "Desserts", name: "Jalebi (with Rabri)", price: "$11.00", img: "https://images.unsplash.com/photo-1568285516131-4099b244d2d4" },
  { category: "Desserts", name: "Ice Cream Scoop", price: "$5.00", img: "https://images.unsplash.com/photo-1594967389599-2a9442a9a957" },
  { category: "Desserts", name: "Shahi Tukda", price: "$10.50", img: "https://images.unsplash.com/photo-1603894584373-5ac78b2aa58c" },
  { category: "Desserts", name: "Modak (Seasonal)", price: "$6.00", img: "https://images.unsplash.com/photo-1565299624942-4c2780e5b72e" },
  { category: "Desserts", name: "Fruit Salad", price: "$8.00", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd" },

  // --- Drinks (10 Items) ---
  { category: "Drinks", name: "Masala Chai", price: "$4.00", img: "https://images.unsplash.com/photo-1586186001091-72f90a9058b8" },
  { category: "Drinks", name: "Sweet Lassi", price: "$6.00", img: "https://images.unsplash.com/photo-1616718536098-90f7a93a3889" },
  { category: "Drinks", name: "Salted Lassi", price: "$6.00", img: "https://images.unsplash.com/photo-1634533039643-4f938222a01d" },
  { category: "Drinks", name: "Mango Shake", price: "$7.00", img: "https://images.unsplash.com/photo-1583279313098-b016e100d075" },
  { category: "Drinks", name: "Fresh Lime Soda", price: "$5.00", img: "https://images.unsplash.com/photo-1521568161747-d5d8e78f4a61" },
  { category: "Drinks", name: "Coke / Pepsi", price: "$3.00", img: "https://images.unsplash.com/photo-1549420084-21589d892d11" },
  { category: "Drinks", name: "Bottled Water", price: "$2.00", img: "https://images.unsplash.com/photo-1595183354964-b654e87707e7" },
  { category: "Drinks", name: "Badam Milk", price: "$6.50", img: "https://images.unsplash.com/photo-1582236683884-604313f892f2" },
  { category: "Drinks", name: "Jaljeera", price: "$5.50", img: "https://images.unsplash.com/photo-1627961226750-f8f9f9e9f9c0" },
  { category: "Drinks", name: "Filter Coffee", price: "$4.50", img: "https://images.unsplash.com/photo-1612450005741-28564177d9c6" },
];


// --- 1. Hero Section (MUST BE DEFINED BEFORE Menu uses it) ---
const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    gsap.to(textRef.current, {
      y: 150, 
      opacity: 0.2, 
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-screen relative overflow-hidden bg-rose-900 flex items-center justify-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1544025166-5110e527b10c)`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div
        ref={textRef}
        className="relative z-10 text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
      >
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-widest leading-snug">
          The Grand Feast
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-rose-300 font-medium italic">
          Taste the Tradition, Experience the Legacy
        </p>
      </div>
    </div>
  );
};

// --- 2. About Us Section (Pin & Image Zoom) ---
const AboutSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        pin: true, 
        scrub: 1, 
        pinSpacing: false,
      },
    });

    tl.to(imageRef.current, { 
        scale: 1.1, 
        y: -50, 
        ease: "power1.inOut" 
    }, 0)
      .fromTo(textRef.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.5 }, 
        0.5 
      );
  }, []);

  return (
    <div ref={containerRef} className="h-screen bg-rose-100 flex flex-col lg:flex-row items-center justify-center relative overflow-hidden">
      <div className="lg:w-1/2 h-full p-10 flex items-center justify-center relative">
        <div 
            ref={imageRef}
            className="w-full max-w-lg h-96 bg-cover rounded-3xl shadow-2xl overflow-hidden"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555562024-4f2537c0414f')` }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>
      <div ref={textRef} className="lg:w-1/2 p-10 text-center lg:text-left z-10 max-w-2xl">
        <h2 className="text-6xl font-black text-rose-900 mb-6">Our Story</h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-6">
          Established in 1985, The Grand Feast has been a beacon of authentic Indian cuisine, blending traditional recipes passed down through generations with a modern culinary touch. We believe that food is not just sustenance, but an experience that connects culture, family, and celebration.
        </p>
        <div className="flex justify-center lg:justify-start space-x-4">
            <FaStar className="text-yellow-500 text-2xl"/>
            <FaStar className="text-yellow-500 text-2xl"/>
            <FaStar className="text-yellow-500 text-2xl"/>
            <FaStar className="text-yellow-500 text-2xl"/>
            <FaStar className="text-yellow-500 text-2xl"/>
        </div>
      </div>
    </div>
  );
};


// --- 3. The Chef Section (Image Scroll & Opacity) ---
const ChefSection = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.to(imageRef.current, {
            scale: 1.2,
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom", 
                end: "bottom top", 
                scrub: true,
            }
        });
    }, []);

    return (
        <div ref={containerRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-rose-900">
            <div 
                ref={imageRef} 
                className="absolute inset-0 bg-cover bg-center transition-all duration-300" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547432085-f3775087a14e')`, backgroundPosition: 'center 30%'}}
            >
            </div>
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 max-w-3xl p-10 text-center text-white">
                <FaQuoteLeft className="text-5xl text-rose-500 mb-6 mx-auto" />
                <h2 className="text-5xl font-extrabold mb-4 text-rose-100">Meet Chef Sanjay</h2>
                <p className="text-xl italic mb-6">
                    "Cooking is not just about following recipes; it's about connecting with ingredients, mastering fire, and serving love on a plate. Every dish tells a story of tradition and passion."
                </p>
                <p className="text-2xl font-bold text-rose-300">- Executive Chef Sanjay Kumar</p>
            </div>
        </div>
    );
};


// --- 4. Snowfall/Particle Animation Component ---
const SnowfallEffect = () => {
    const particlesRef = useRef(null);

    useEffect(() => {
        const numParticles = 30;
        const container = particlesRef.current;

        // Create particles
        for (let i = 0; i < numParticles; i++) {
            const p = document.createElement('div');
            p.className = 'particle fixed pointer-events-none text-rose-300 text-opacity-70';
            p.innerHTML = '●'; 
            p.style.fontSize = `${gsap.utils.random(10, 20)}px`;
            p.style.zIndex = 1000;
            container.appendChild(p);

            gsap.set(p, {
                x: gsap.utils.random(0, window.innerWidth),
                y: gsap.utils.random(0, window.innerHeight),
                opacity: gsap.utils.random(0.4, 0.9),
                scale: gsap.utils.random(0.5, 1.5),
            });
            
            // Create a custom animation timeline for each particle
            gsap.to(p, {
                y: '+=100vh', 
                x: `+=${gsap.utils.random(-100, 100)}`,
                rotation: gsap.utils.random(-360, 360),
                duration: gsap.utils.random(10, 20),
                repeat: -1,
                ease: "none",
                delay: -i * (20 / numParticles), 
            });
        }

        // GSAP Scroll Interaction: Fading the particles slightly on scroll
        gsap.to(container, {
            opacity: 0.5,
            ease: "none",
            scrollTrigger: {
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
        
    }, []);

    return <div ref={particlesRef} className="w-full h-full fixed top-0 left-0 overflow-hidden"></div>;
};


// --- 5. Section Component with Circular Fold Reveal Animation ---
const Section = ({ title, data }) => {
  const sectionRef = useRef([]);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Section Title Animation (Staggered Slide-In)
    gsap.fromTo(
      titleRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Circular Fold Reveal Card Animation
    sectionRef.current.forEach((el) => {
      if (el) { 
        gsap.fromTo(
          el,
          { 
            opacity: 0, 
            y: 70, 
            scale: 0.2, 
            rotation: 180, 
            skewX: 60, 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            skewX: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)", 
            scrollTrigger: {
              trigger: el,
              start: "top 90%", 
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, [data]);

  // 3D Tilt Effect on Cursor
  useEffect(() => {
    const cards = sectionRef.current.filter(Boolean); 
    cards.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(card, {
          rotationY: x / 25, 
          rotationX: -y / 25,
          scale: 1.05, 
          transformPerspective: 800, 
          ease: "power3.out",
          duration: 0.3,
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.5,
        });
      };
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => { 
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);


  return (
    <div className="mb-24 pt-10" ref={containerRef}>
      <h2 
        ref={titleRef}
        className="text-4xl sm:text-5xl font-extrabold text-rose-700 mb-10 border-l-8 border-rose-500 pl-4 tracking-tight"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data.map((item, i) => (
          <div
            key={`${item.name}-${i}`} 
            ref={(el) => (sectionRef.current[i] = el)}
            className="bg-white border-2 border-rose-100 rounded-3xl shadow-xl overflow-hidden transition-transform duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-60 object-cover rounded-t-3xl"
              loading="lazy"
            />

            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-rose-800 mb-1">{item.name}</h3>
              <p className="text-sm text-rose-500 italic mb-3">{item.category}</p>
              <p className="text-2xl text-rose-900 font-extrabold mb-4">{item.price}</p>

              <button className="bg-rose-700 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center mx-auto gap-2 transition transform hover:scale-[1.02] shadow-lg">
                <FaShoppingCart className="text-lg" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 6. Reservations/CTA Section ---
const CTAReservation = () => {
    const ctaRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(ctaRef.current, 
            { scale: 0.8, opacity: 0 }, 
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ctaRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            }
        );
    }, []);
    return (
        <div ref={ctaRef} className="bg-rose-800 text-white py-20 my-20 rounded-3xl shadow-2xl mx-auto max-w-7xl">
            <div className="text-center px-10">
                <h2 className="text-5xl font-black mb-4">Ready for The Grand Feast?</h2>
                <p className="text-xl mb-8">
                    Secure your table for an unforgettable culinary journey.
                </p>
                <button className="bg-white text-rose-800 hover:bg-rose-100 font-extrabold text-lg px-10 py-4 rounded-full transition transform hover:-translate-y-1 shadow-lg">
                    Book Your Reservation Now
                </button>
            </div>
        </div>
    );
};

// --- 7. Footer Component ---
const Footer = () => {
    const footerRef = useRef(null);
    const socialRef = useRef(null);
  
    useEffect(() => {
      gsap.fromTo(footerRef.current, 
          { y: 100, opacity: 0 }, 
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
      );
      
      gsap.fromTo(socialRef.current.children, 
          { scale: 0, opacity: 0, rotation: 180 }, 
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
      );
  
    }, []);
  
    return (
      <footer ref={footerRef} className="bg-rose-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-rose-700 pb-10 mb-10">
            <h2 className="text-4xl font-extrabold mb-6 md:mb-0">
              The Grand Feast
            </h2>
            <nav className="text-lg space-x-6">
              <a href="#" className="hover:text-rose-300 transition duration-300">Home</a>
              <a href="#" className="hover:text-rose-300 transition duration-300">About</a>
              <a href="#" className="hover:text-rose-300 transition duration-300">Reservations</a>
              <a href="#" className="hover:text-rose-300 transition duration-300">Contact</a>
            </nav>
          </div>
  
          <div className="flex justify-center mb-10" ref={socialRef}>
            <a href="#" className="mx-3 text-3xl text-white hover:text-rose-400 transition transform hover:scale-125 duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="mx-3 text-3xl text-white hover:text-rose-400 transition transform hover:scale-125 duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="mx-3 text-3xl text-white hover:text-rose-400 transition transform hover:scale-125 duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="mx-3 text-3xl text-white hover:text-rose-400 transition transform hover:scale-125 duration-300">
              <FaYoutube />
            </a>
          </div>
  
          <p className="text-center text-rose-300 text-sm mt-4">
            &copy; {new Date().getFullYear()} The Grand Feast. All rights reserved. | 123 Spice Route, Culinary City, CA 90210
          </p>
        </div>
      </footer>
    );
  };


// --- 8. Main Menu Component ---
const Menu = () => {
  const categories = ["Veg", "Non-Veg", "Desserts", "Drinks"];
  const mainTitleRef = useRef(null);

  // Scroll-Based Fade and Rotate for Main Title
  useEffect(() => {
    gsap.to(mainTitleRef.current, {
      opacity: 0.2, 
      rotation: 5, 
      y: -50, 
      ease: "none",
      scrollTrigger: {
        trigger: mainTitleRef.current,
        start: "top 10%", 
        end: "bottom top", 
        scrub: true, 
      }
    });
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Snowfall Effect Layer */}
      <SnowfallEffect />
      
      {/* 1. Hero section pinned at the top */}
      <Hero />

      {/* 2. New Static Sections */}
      <AboutSection />
      <ChefSection />

      {/* Main Menu Content */}
      <div className="max-w-8xl mx-auto px-5 sm:px-10 lg:px-20 bg-rose-50 pb-20 pt-10 relative z-10">
        <h1 
          ref={mainTitleRef}
          // Added sticky to main title for the GSAP scrub effect
          className="text-4xl sm:text-6xl font-black sticky top-0 md:top-5 text-center text-rose-900 mt-10 mb-20 tracking-tighter z-20 bg-rose-50/90 py-5 transition-all duration-500"
        >
          Our Extensive Menu
        </h1>

        {categories.map((cat) => (
          <Section
            key={cat}
            title={cat}
            data={items.filter((i) => i.category === cat)}
          />
        ))}
        
        {/* 6. CTA Section */}
        <CTAReservation />
      </div>
      
      {/* 7. The Premium Footer */}
      <Footer />
    </div>
  );
};

export default Menu;