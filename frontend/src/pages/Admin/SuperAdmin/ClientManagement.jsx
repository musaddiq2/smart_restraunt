import { Users, UserPlus, Heart, MessageCircle, Award, Sparkles, TrendingUp, Zap, Target, Clock, Star, Shield, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function ClientManagement() {
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { icon: <Users size={24} />, label: "Client Profiles", status: "complete", color: "blue" },
    { icon: <MessageCircle size={24} />, label: "Communication", status: "in-progress", color: "green" },
    { icon: <Award size={24} />, label: "Loyalty Programs", status: "in-progress", color: "purple" },
    { icon: <Target size={24} />, label: "Analytics", status: "pending", color: "rose" },
  ];

  useEffect(() => {
    // Generate random floating icons
    const icons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setFloatingIcons(icons);

    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 80);

    // Rotate active feature
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Client Icons */}
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className="absolute opacity-10"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            animation: `float ${icon.duration}s ease-in-out infinite`,
            animationDelay: `${icon.delay}s`,
            transform: `scale(${icon.scale})`,
          }}
        >
          {icon.id % 5 === 0 && <Users size={48} className="text-blue-400" />}
          {icon.id % 5 === 1 && <Heart size={48} className="text-cyan-400" />}
          {icon.id % 5 === 2 && <MessageCircle size={48} className="text-teal-400" />}
          {icon.id % 5 === 3 && <Award size={48} className="text-blue-400" />}
          {icon.id % 5 === 4 && <Shield size={48} className="text-cyan-400" />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        
        {/* Animated Users Icon Container */}
        <div className="relative mb-10">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-48 h-48 -m-12">
            <div className="w-full h-full border-4 border-dashed border-blue-200 rounded-full animate-spin-slow"></div>
          </div>
          
          {/* Middle Pulsing Ring */}
          <div className="absolute inset-0 w-40 h-40 -m-8">
            <div className="w-full h-full border-4 border-cyan-200 rounded-full animate-ping opacity-50"></div>
          </div>
          
          {/* Main Icon Container */}
          <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 p-10 rounded-3xl shadow-2xl animate-float">
            <Users size={80} className="text-white animate-pulse-slow" />
            
            {/* Connecting Lines Effect */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-16 opacity-40">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                <circle cx="50" cy="30" r="4" fill="#60a5fa" />
                <circle cx="30" cy="60" r="4" fill="#22d3ee" />
                <circle cx="70" cy="60" r="4" fill="#14b8a6" />
                <line x1="50" y1="30" x2="30" y2="60" stroke="#60a5fa" strokeWidth="2" />
                <line x1="50" y1="30" x2="70" y2="60" stroke="#60a5fa" strokeWidth="2" />
              </svg>
            </div>
            
            {/* Decorative Icons */}
            <Heart className="absolute -top-3 -right-3 text-rose-400 animate-bounce-slow fill-rose-400" size={28} />
            <Sparkles className="absolute -bottom-3 -left-3 text-yellow-400 animate-spin-slow" size={24} />
            <MessageCircle className="absolute top-3 left-3 text-green-400 animate-pulse" size={26} />
          </div>

          {/* Top Globe Icon */}
          <Globe className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-500 animate-bounce" size={28} />
        </div>

        {/* Main Heading with Badge */}
        <div className="text-center mb-8 animate-fade-in">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-full shadow-lg mb-6 animate-bounce-slow">
            <TrendingUp size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">Building Relationships</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x block mb-2">
              Client Management
            </span>
          </h1>

          {/* Subtitle with Icon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="text-yellow-500 animate-spin-slow" size={28} />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Crafting Soon
            </h2>
            <Star className="text-yellow-500 animate-spin-slow animation-delay-2000" size={28} />
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Building a comprehensive client relationship platform with
            <span className="font-bold text-blue-600"> 360° customer views</span>,
            <span className="font-bold text-cyan-600"> intelligent communication tools</span>, and
            <span className="font-bold text-teal-600"> loyalty management</span> features.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-10 animate-fade-in animation-delay-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-blue-500" />
              Development Progress
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-10 animate-fade-in animation-delay-700">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              label={feature.label}
              status={feature.status}
              color={feature.color}
              active={activeFeature === index}
            />
          ))}
        </div>

        {/* Features Preview */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-2xl w-full mb-8 border-2 border-blue-100 animate-fade-in animation-delay-900">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus className="text-blue-500" size={24} />
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureItem icon={<Users size={18} />} text="Client Database" />
            <FeatureItem icon={<MessageCircle size={18} />} text="Messaging Hub" />
            <FeatureItem icon={<Heart size={18} />} text="Engagement Tracking" />
            <FeatureItem icon={<Award size={18} />} text="Rewards System" />
            <FeatureItem icon={<Mail size={18} />} text="Email Campaigns" />
            <FeatureItem icon={<Shield size={18} />} text="Data Security" />
          </div>
        </div>

        {/* Benefit Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-8 animate-fade-in animation-delay-1100">
          <BenefitPill icon={<Heart size={16} />} text="Build Loyalty" />
          <BenefitPill icon={<MessageCircle size={16} />} text="Easy Communication" />
          <BenefitPill icon={<Target size={16} />} text="Better Insights" />
          <BenefitPill icon={<Zap size={16} />} text="Quick Actions" />
        </div>

        {/* Animated Dots */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in animation-delay-1300">
          <span className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce animation-delay-200"></span>
          <span className="w-4 h-4 rounded-full bg-teal-600 animate-bounce animation-delay-400"></span>
        </div>

        {/* Launch Date */}
        <p className="text-gray-600 text-base animate-fade-in animation-delay-1500 flex items-center gap-2">
          <Clock size={20} className="animate-spin-slow text-blue-500" />
          Expected Launch: 
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Q1 2025
          </span>
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-1700 relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-3">
            <UserPlus size={24} />
            Get Notified
            <Sparkles size={20} />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".2" className="fill-blue-300"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".4" className="fill-cyan-300"></path>
        </svg>
      </div>
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, label, status, color, active }) {
  const colors = {
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-violet-600',
    rose: 'from-rose-500 to-pink-600',
  };

  const statusColors = {
    complete: 'bg-green-100 text-green-700 border-green-300',
    'in-progress': 'bg-amber-100 text-amber-700 border-amber-300',
    pending: 'bg-gray-100 text-gray-600 border-gray-300',
  };

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg transition-all duration-500 border-2 ${
        active ? 'border-blue-300 ring-4 ring-blue-200 scale-110 -translate-y-2' : 'border-gray-200 hover:scale-105'
      }`}
    >
      {active && (
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-5 rounded-xl animate-pulse`}></div>
      )}

      <div className="relative text-center">
        <div className={`inline-flex p-3 rounded-xl mb-3 bg-gradient-to-br ${colors[color]} shadow-md`}>
          <div className="text-white">{icon}</div>
        </div>
        
        <h4 className="text-sm font-bold text-gray-800 mb-2">{label}</h4>
        
        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColors[status]}`}>
          {status === 'in-progress' ? 'In Progress' : status === 'complete' ? 'Complete' : 'Pending'}
        </span>
      </div>
    </div>
  );
}

/* Feature Item Component */
function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
      <div className="text-blue-600">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  );
}

/* Benefit Pill Component */
function BenefitPill({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:-translate-y-1 group">
      <div className="text-blue-600 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
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
      transform: translateY(-30px) rotate(10deg);
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
      transform: translateY(-12px);
    }
  }

  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
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

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2.5s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
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

  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animation-delay-700 {
    animation-delay: 0.7s;
  }

  .animation-delay-900 {
    animation-delay: 0.9s;
  }

  .animation-delay-1100 {
    animation-delay: 1.1s;
  }

  .animation-delay-1300 {
    animation-delay: 1.3s;
  }

  .animation-delay-1500 {
    animation-delay: 1.5s;
  }

  .animation-delay-1700 {
    animation-delay: 1.7s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);