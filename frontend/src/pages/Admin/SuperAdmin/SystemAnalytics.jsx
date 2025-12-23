import { BarChart3, TrendingUp, PieChart, LineChart, Activity, Zap, Target, Database, Cpu, Sparkles, Clock, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

export default function SystemAnalytics() {
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { value: "98.5%", label: "Uptime", color: "emerald" },
    { value: "2.3M", label: "Data Points", color: "blue" },
    { value: "1.2s", label: "Response Time", color: "purple" },
    { value: "99.9%", label: "Accuracy", color: "rose" },
  ];

  useEffect(() => {
    // Generate random floating icons
    const icons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      scale: 0.4 + Math.random() * 0.6,
    }));
    setFloatingIcons(icons);

    // Animate data points
    const points = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 20,
      delay: i * 0.1,
    }));
    setDataPoints(points);

    // Rotate active metric
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Analytics Icons */}
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
          {icon.id % 6 === 0 && <BarChart3 size={50} className="text-blue-400" />}
          {icon.id % 6 === 1 && <PieChart size={50} className="text-cyan-400" />}
          {icon.id % 6 === 2 && <LineChart size={50} className="text-indigo-400" />}
          {icon.id % 6 === 3 && <Activity size={50} className="text-blue-400" />}
          {icon.id % 6 === 4 && <TrendingUp size={50} className="text-cyan-400" />}
          {icon.id % 6 === 5 && <Database size={50} className="text-indigo-400" />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        
        {/* Animated Chart Icon Container */}
        <div className="relative mb-12">
          {/* Outer Data Ring */}
          <div className="absolute inset-0 w-48 h-48 -m-12">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(59, 130, 246, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>
          
          {/* Middle Pulsing Ring */}
          <div className="absolute inset-0 w-40 h-40 -m-8">
            <div className="w-full h-full border-4 border-cyan-200 rounded-full animate-ping opacity-50"></div>
          </div>
          
          {/* Chart Container with Gradient */}
          <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-600 p-10 rounded-3xl shadow-2xl animate-float">
            <BarChart3 size={80} className="text-white animate-pulse-slow" />
            
            {/* Decorative Elements */}
            <TrendingUp className="absolute -top-3 -right-3 text-green-400 animate-bounce-slow" size={32} />
            <Sparkles className="absolute top-3 left-3 text-yellow-300 animate-spin-slow" size={22} />
            <Sparkles className="absolute bottom-3 right-3 text-yellow-300 animate-spin-slow animation-delay-2000" size={26} />
            <Zap className="absolute -bottom-3 -left-3 text-yellow-400 animate-pulse" size={30} />
            
            {/* Orbiting Data Points */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44">
              <div className="relative w-full h-full animate-spin-very-slow">
                <Target className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-300" size={16} />
                <Target className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyan-300" size={16} />
                <Target className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-300" size={16} />
                <Target className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-blue-300" size={16} />
              </div>
            </div>
          </div>

          {/* CPU Icon */}
          <Cpu className="absolute -top-6 left-1/2 -translate-x-1/2 text-blue-500 animate-bounce" size={24} />
        </div>

        {/* Title with Data Gradient */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center animate-fade-in">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
            Advanced Analytics
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center animate-fade-in animation-delay-300">
          Building Intelligence
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-center text-lg md:text-xl max-w-2xl mb-10 animate-fade-in animation-delay-500">
          We're engineering a powerful
          <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text"> System Analytics </span>
          dashboard with real-time insights and predictive intelligence.
        </p>

        {/* Live Metrics Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-10 animate-fade-in animation-delay-700">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
              color={metric.color}
              active={activeMetric === index}
            />
          ))}
        </div>

        {/* Animated Bar Chart Preview */}
        <div className="flex items-end justify-center gap-2 h-24 mb-10 animate-fade-in animation-delay-900">
          {dataPoints.map((point) => (
            <div
              key={point.id}
              className="w-4 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg shadow-lg"
              style={{
                height: `${point.height}%`,
                animation: `bar-grow 1.5s ease-out ${point.delay}s both`,
              }}
            ></div>
          ))}
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-8 animate-fade-in animation-delay-1100">
          <FeaturePill icon={<Activity size={16} />} text="Real-time Monitoring" />
          <FeaturePill icon={<TrendingUp size={16} />} text="Predictive Analytics" />
          <FeaturePill icon={<Database size={16} />} text="Big Data Processing" />
          <FeaturePill icon={<Zap size={16} />} text="Instant Insights" />
          <FeaturePill icon={<RefreshCw size={16} />} text="Auto-refresh" />
        </div>

        {/* Animated Progress Dots */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in animation-delay-1300">
          <span className="w-4 h-4 rounded-full bg-blue-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-cyan-500 animate-bounce animation-delay-200"></span>
          <span className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce animation-delay-400"></span>
        </div>

        {/* Status Info */}
        <div className="flex flex-col items-center gap-3 text-gray-600 animate-fade-in animation-delay-1500">
          <div className="flex items-center gap-2">
            <Clock size={20} className="animate-spin-slow text-blue-500" />
            <span className="text-sm">System Optimization in Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Expected Launch:</span>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Q1 2025
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-1700 relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-2">
            <Activity size={20} />
            Get Early Access
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Bottom Data Flow Visualization */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <div className="flex gap-2 animate-scroll-left">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-blue-400 to-transparent rounded-t-full opacity-30"
              style={{
                height: `${Math.random() * 80 + 20}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Metric Card Component */
function MetricCard({ value, label, color, active }) {
  const colors = {
    emerald: 'from-emerald-500 to-green-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-indigo-600',
    rose: 'from-rose-500 to-pink-600',
  };

  const borderColors = {
    emerald: 'border-emerald-300 ring-emerald-200',
    blue: 'border-blue-300 ring-blue-200',
    purple: 'border-purple-300 ring-purple-200',
    rose: 'border-rose-300 ring-rose-200',
  };

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg transition-all duration-500 border-2 ${
        active 
          ? `${borderColors[color]} ring-4 scale-110 -translate-y-2` 
          : 'border-gray-200 hover:scale-105'
      }`}
    >
      {active && (
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-5 rounded-xl animate-pulse`}></div>
      )}
      
      <div className="relative text-center">
        <div className={`text-3xl font-extrabold mb-1 bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
          {value}
        </div>
        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );
}

/* Feature Pill Component */
function FeaturePill({ icon, text }) {
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

  @keyframes spin-very-slow {
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
      transform: translateY(-15px);
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

  @keyframes bar-grow {
    from {
      height: 0;
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scroll-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
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

  .animate-spin-very-slow {
    animation: spin-very-slow 20s linear infinite;
  }

  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
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

  .animate-scroll-left {
    animation: scroll-left 20s linear infinite;
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