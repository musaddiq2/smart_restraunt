import { Construction, Wrench, HardHat, AlertTriangle, Clock, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Orders() {
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Generate random floating icons
    const icons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
    setFloatingIcons(icons);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Tool Icons */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute opacity-10"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animation: `float ${icon.duration}s ease-in-out infinite`,
            animationDelay: `${icon.delay}s`,
          }}
        >
          {icon.id % 4 === 0 && <Wrench size={40} className="text-rose-400" />}
          {icon.id % 4 === 1 && <HardHat size={40} className="text-pink-400" />}
          {icon.id % 4 === 2 && <AlertTriangle size={40} className="text-purple-400" />}
          {icon.id % 4 === 3 && <Construction size={40} className="text-rose-400" />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        
        {/* Animated Construction Icon Container */}
        <div className="relative mb-12">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-40 h-40 -m-8">
            <div className="w-full h-full border-4 border-rose-200 rounded-full animate-ping opacity-75"></div>
          </div>
          
          {/* Middle Ring */}
          <div className="absolute inset-0 w-32 h-32 -m-4">
            <div className="w-full h-full border-4 border-pink-300 rounded-full animate-spin-slow"></div>
          </div>
          
          {/* Icon Container */}
          <div className="relative bg-gradient-to-br from-rose-400 to-pink-600 p-8 rounded-3xl shadow-2xl animate-bounce-slow">
            <Construction size={64} className="text-white animate-pulse" />
            
            {/* Sparkles */}
            <Sparkles className="absolute -top-2 -right-2 text-yellow-400 animate-spin-slow" size={24} />
            <Sparkles className="absolute -bottom-2 -left-2 text-yellow-400 animate-spin-slow animation-delay-2000" size={20} />
          </div>
        </div>

        {/* Title with Gradient Animation */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center animate-fade-in">
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            Under Construction
          </span>
        </h1>

        {/* Subtitle with Staggered Animation */}
        <p className="text-gray-700 text-center text-lg md:text-xl max-w-2xl mb-8 animate-fade-in animation-delay-300">
          We're crafting something amazing for you! Our team is working hard to bring you the best
          <span className="font-semibold text-rose-600"> Orders Management</span> experience.
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8 animate-fade-in animation-delay-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Building Progress</span>
            <span className="text-sm font-bold text-rose-600">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-8 animate-fade-in animation-delay-900">
          <FeatureCard
            icon={<Clock size={32} />}
            title="Coming Soon"
            description="Real-time order tracking"
            delay="0s"
          />
          <FeatureCard
            icon={<Sparkles size={32} />}
            title="New Features"
            description="Advanced analytics dashboard"
            delay="0.2s"
            highlight
          />
          <FeatureCard
            icon={<HardHat size={32} />}
            title="In Progress"
            description="Team management tools"
            delay="0.4s"
          />
        </div>

        {/* Animated Dots Loader */}
        <div className="flex items-center gap-3 animate-fade-in animation-delay-1200">
          <span className="w-4 h-4 rounded-full bg-rose-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-pink-500 animate-bounce animation-delay-200"></span>
          <span className="w-4 h-4 rounded-full bg-purple-600 animate-bounce animation-delay-400"></span>
        </div>

        {/* Estimated Time */}
        <p className="mt-8 text-sm text-gray-500 animate-fade-in animation-delay-1500 flex items-center gap-2">
          <Clock size={16} className="animate-spin-slow" />
          Estimated completion: <span className="font-semibold text-rose-600">Coming in Q1 2025</span>
        </p>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-100/50 to-transparent pointer-events-none"></div>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, title, description, delay, highlight }) {
  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 ${
        highlight ? 'border-rose-300 ring-2 ring-rose-200' : 'border-gray-200'
      }`}
      style={{ animationDelay: delay }}
    >
      {/* Glow Effect */}
      {highlight && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-2xl animate-pulse"></div>
      )}
      
      <div className="relative">
        <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br ${
          highlight 
            ? 'from-rose-400 to-pink-600' 
            : 'from-gray-100 to-gray-200'
        } group-hover:scale-110 transition-transform duration-300`}>
          <div className={highlight ? 'text-white' : 'text-gray-600'}>
            {icon}
          </div>
        </div>
        
        <h3 className={`text-lg font-bold mb-2 ${
          highlight ? 'text-rose-600' : 'text-gray-800'
        }`}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}

// Add custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(10deg);
    }
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }

  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
  }

  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animation-delay-200 {
    animation-delay: 0.2s;
  }

  .animation-delay-300 {
    animation-delay: 0.3s;
  }

  .animation-delay-400 {
    animation-delay: 0.4s;
  }

  .animation-delay-600 {
    animation-delay: 0.6s;
  }

  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  .animation-delay-1200 {
    animation-delay: 1.2s;
  }

  .animation-delay-1500 {
    animation-delay: 1.5s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);