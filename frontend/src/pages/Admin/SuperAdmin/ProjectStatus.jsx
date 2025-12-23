import { Rocket, Code, Layers, GitBranch, CheckCircle2, Clock, Sparkles, TrendingUp, Zap, Target, Calendar, Star, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProjectStatus() {
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { icon: <Code size={24} />, label: "Planning", status: "complete", color: "emerald" },
    { icon: <Layers size={24} />, label: "Design", status: "complete", color: "blue" },
    { icon: <GitBranch size={24} />, label: "Development", status: "in-progress", color: "amber" },
    { icon: <CheckCircle2 size={24} />, label: "Testing", status: "pending", color: "purple" },
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

    // Rotate active phase
    const phaseInterval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(phaseInterval);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Project Icons */}
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
          {icon.id % 5 === 0 && <Rocket size={48} className="text-indigo-400" />}
          {icon.id % 5 === 1 && <Code size={48} className="text-purple-400" />}
          {icon.id % 5 === 2 && <GitBranch size={48} className="text-pink-400" />}
          {icon.id % 5 === 3 && <Layers size={48} className="text-indigo-400" />}
          {icon.id % 5 === 4 && <Target size={48} className="text-purple-400" />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        
        {/* Animated Rocket Launch Icon */}
        <div className="relative mb-10">
          {/* Outer Orbit Ring */}
          <div className="absolute inset-0 w-48 h-48 -m-12">
            <div className="w-full h-full border-4 border-dashed border-indigo-200 rounded-full animate-spin-slow"></div>
          </div>
          
          {/* Middle Ring */}
          <div className="absolute inset-0 w-40 h-40 -m-8">
            <div className="w-full h-full border-4 border-purple-200 rounded-full animate-ping opacity-50"></div>
          </div>
          
          {/* Rocket Container */}
          <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 p-10 rounded-3xl shadow-2xl animate-float">
            <Rocket size={80} className="text-white animate-bounce-slow" />
            
            {/* Launch Effects */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-yellow-400 via-orange-400 to-transparent opacity-60 blur-sm animate-pulse"></div>
            
            {/* Decorative Icons */}
            <Sparkles className="absolute -top-3 -right-3 text-yellow-400 animate-spin-slow" size={28} />
            <Sparkles className="absolute -bottom-3 -left-3 text-yellow-400 animate-spin-slow animation-delay-2000" size={24} />
            <Zap className="absolute top-3 left-3 text-yellow-300 animate-pulse" size={26} />
          </div>

          {/* Top Calendar Icon */}
          <Calendar className="absolute -top-8 left-1/2 -translate-x-1/2 text-indigo-500 animate-bounce" size={28} />
        </div>

        {/* Main Heading with Badge */}
        <div className="text-center mb-8 animate-fade-in">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow-lg mb-6 animate-bounce-slow">
            <TrendingUp size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">In Development</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x block mb-2">
              Project Status
            </span>
          </h1>

          {/* Subtitle with Icon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="text-yellow-500 animate-spin-slow" size={28} />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Crafting Soon
            </h2>
            <Star className="text-yellow-500 animate-spin-slow animation-delay-2000" size={28} />
          </div>

          {/* Description */}
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We're building an advanced project tracking system with
            <span className="font-bold text-indigo-600"> real-time insights</span>,
            <span className="font-bold text-purple-600"> milestone management</span>, and
            <span className="font-bold text-pink-600"> team collaboration</span> tools.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-2xl mb-10 animate-fade-in animation-delay-500">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Clock size={18} className="text-indigo-500" />
              Development Progress
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {progress}%
            </span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Project Phases */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-10 animate-fade-in animation-delay-700">
          {phases.map((phase, index) => (
            <PhaseCard
              key={index}
              icon={phase.icon}
              label={phase.label}
              status={phase.status}
              color={phase.color}
              active={activePhase === index}
            />
          ))}
        </div>

        {/* Timeline Preview */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-w-2xl w-full mb-8 border-2 border-indigo-100 animate-fade-in animation-delay-900">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="text-indigo-500" size={24} />
            Upcoming Milestones
          </h3>
          <div className="space-y-3">
            <MilestoneItem date="Week 1" title="Core Infrastructure" status="completed" />
            <MilestoneItem date="Week 2" title="Status Dashboard" status="in-progress" />
            <MilestoneItem date="Week 3" title="Reporting System" status="upcoming" />
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mb-8 animate-fade-in animation-delay-1100">
          <FeaturePill icon={<TrendingUp size={16} />} text="Real-time Updates" />
          <FeaturePill icon={<Target size={16} />} text="Milestone Tracking" />
          <FeaturePill icon={<GitBranch size={16} />} text="Team Collaboration" />
          <FeaturePill icon={<Zap size={16} />} text="Instant Alerts" />
        </div>

        {/* Animated Dots */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in animation-delay-1300">
          <span className="w-4 h-4 rounded-full bg-indigo-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-purple-500 animate-bounce animation-delay-200"></span>
          <span className="w-4 h-4 rounded-full bg-pink-600 animate-bounce animation-delay-400"></span>
        </div>

        {/* Launch Date */}
        <p className="text-gray-600 text-base animate-fade-in animation-delay-1500 flex items-center gap-2">
          <Clock size={20} className="animate-spin-slow text-indigo-500" />
          Expected Launch: 
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Q1 2025
          </span>
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-1700 relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-3">
            <Rocket size={24} />
            Join the Waitlist
            <Sparkles size={20} />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".2" className="fill-indigo-300"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".4" className="fill-purple-300"></path>
        </svg>
      </div>
    </div>
  );
}

/* Phase Card Component */
function PhaseCard({ icon, label, status, color, active }) {
  const colors = {
    emerald: 'from-emerald-500 to-green-600',
    blue: 'from-blue-500 to-cyan-600',
    amber: 'from-amber-500 to-orange-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  const statusColors = {
    complete: 'bg-green-100 text-green-700 border-green-300',
    'in-progress': 'bg-amber-100 text-amber-700 border-amber-300',
    pending: 'bg-gray-100 text-gray-600 border-gray-300',
  };

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-lg rounded-xl p-4 shadow-lg transition-all duration-500 border-2 ${
        active ? 'border-indigo-300 ring-4 ring-indigo-200 scale-110 -translate-y-2' : 'border-gray-200 hover:scale-105'
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

/* Milestone Item Component */
function MilestoneItem({ date, title, status }) {
  const statusConfig = {
    completed: { color: 'bg-green-500', icon: <CheckCircle2 size={16} /> },
    'in-progress': { color: 'bg-amber-500', icon: <Clock size={16} /> },
    upcoming: { color: 'bg-gray-300', icon: <Target size={16} /> },
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 ${statusConfig[status].color} rounded-full flex items-center justify-center text-white`}>
        {statusConfig[status].icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
  );
}

/* Feature Pill Component */
function FeaturePill({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300 hover:-translate-y-1 group">
      <div className="text-indigo-600 group-hover:scale-110 transition-transform">{icon}</div>
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