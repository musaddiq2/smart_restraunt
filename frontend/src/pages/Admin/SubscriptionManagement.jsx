import { CreditCard, Crown, Zap, Shield, TrendingUp, Sparkles, Clock, Star, Gift } from "lucide-react";
import { useState, useEffect } from "react";

export default function SubscriptionManagement() {
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [activeCard, setActiveCard] = useState(1);

  useEffect(() => {
    // Generate random floating icons
    const icons = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      scale: 0.5 + Math.random() * 0.5,
    }));
    setFloatingIcons(icons);

    // Rotate active card
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev % 3) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen overflow-hidden relative bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Subscription Icons */}
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
          {icon.id % 5 === 0 && <CreditCard size={48} className="text-violet-400" />}
          {icon.id % 5 === 1 && <Crown size={48} className="text-fuchsia-400" />}
          {icon.id % 5 === 2 && <Zap size={48} className="text-purple-400" />}
          {icon.id % 5 === 3 && <Shield size={48} className="text-pink-400" />}
          {icon.id % 5 === 4 && <Star size={48} className="text-violet-400" />}
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        
        {/* Animated Premium Icon Container */}
        <div className="relative mb-10">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 w-44 h-44 -m-10">
            <div className="w-full h-full rounded-full border-4 border-dashed border-violet-300 animate-spin-slow"></div>
          </div>
          
          {/* Middle Pulsing Ring */}
          <div className="absolute inset-0 w-36 h-36 -m-6">
            <div className="w-full h-full border-4 border-fuchsia-200 rounded-full animate-ping opacity-60"></div>
          </div>
          
          {/* Premium Badge Container */}
          <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 p-10 rounded-3xl shadow-2xl animate-float">
            <CreditCard size={72} className="text-white animate-pulse-slow" />
            
            {/* Decorative Crown */}
            <Crown className="absolute -top-4 -right-4 text-yellow-400 animate-bounce-slow" size={32} />
            
            {/* Sparkle Effects */}
            <Sparkles className="absolute top-2 left-2 text-yellow-300 animate-spin-slow" size={20} />
            <Sparkles className="absolute bottom-2 right-2 text-yellow-300 animate-spin-slow animation-delay-2000" size={24} />
            <Zap className="absolute -bottom-3 -left-3 text-yellow-400 animate-pulse" size={28} />
          </div>

          {/* Orbiting Stars */}
          <Star className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-yellow-400 animate-bounce" size={20} />
          <Star className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 text-fuchsia-400 animate-bounce animation-delay-400" size={18} />
        </div>

        {/* Title with Premium Gradient */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center animate-fade-in">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent animate-gradient-x">
            Premium Experience
          </span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6 text-center animate-fade-in animation-delay-300">
          Coming Soon
        </h2>

        {/* Subtitle with Staggered Animation */}
        <p className="text-gray-700 text-center text-lg md:text-xl max-w-2xl mb-10 animate-fade-in animation-delay-500">
          We're crafting an exclusive
          <span className="font-bold text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text"> Subscription Management </span>
          platform with premium features designed just for you.
        </p>

        {/* Subscription Tier Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mb-10 animate-fade-in animation-delay-700">
          <TierCard
            icon={<Zap size={36} />}
            tier="Starter"
            price="$9.99"
            features={["Basic Analytics", "5 Restaurants", "Email Support"]}
            color="violet"
            active={activeCard === 1}
          />
          <TierCard
            icon={<Crown size={36} />}
            tier="Pro"
            price="$29.99"
            features={["Advanced Analytics", "Unlimited Restaurants", "Priority Support"]}
            color="purple"
            active={activeCard === 2}
            popular
          />
          <TierCard
            icon={<Shield size={36} />}
            tier="Enterprise"
            price="$99.99"
            features={["Custom Solutions", "Dedicated Manager", "24/7 Support"]}
            color="fuchsia"
            active={activeCard === 3}
          />
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mb-8 animate-fade-in animation-delay-1000">
          <FeatureBadge icon={<TrendingUp size={18} />} text="Real-time Analytics" />
          <FeatureBadge icon={<Shield size={18} />} text="Secure Payments" />
          <FeatureBadge icon={<Gift size={18} />} text="Exclusive Perks" />
          <FeatureBadge icon={<Zap size={18} />} text="Instant Activation" />
        </div>

        {/* Animated Progress Dots */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in animation-delay-1200">
          <span className="w-4 h-4 rounded-full bg-violet-400 animate-bounce"></span>
          <span className="w-4 h-4 rounded-full bg-purple-500 animate-bounce animation-delay-200"></span>
          <span className="w-4 h-4 rounded-full bg-fuchsia-600 animate-bounce animation-delay-400"></span>
        </div>

        {/* Launch Date */}
        <div className="flex items-center gap-3 text-gray-600 animate-fade-in animation-delay-1500">
          <Clock size={20} className="animate-spin-slow text-violet-500" />
          <span className="text-sm">Launching in</span>
          <span className="font-bold text-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            Q1 2025
          </span>
        </div>

        {/* Notify Me Button */}
        <button className="mt-8 px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-1800 relative overflow-hidden group">
          <span className="relative z-10 flex items-center gap-2">
            <Crown size={20} />
            Notify Me When Available
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </div>

      {/* Bottom Decoration Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".15" className="fill-violet-300"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-purple-300"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-fuchsia-200"></path>
        </svg>
      </div>
    </div>
  );
}

/* Tier Card Component */
function TierCard({ icon, tier, price, features, color, active, popular }) {
  const colors = {
    violet: 'from-violet-500 to-violet-600',
    purple: 'from-purple-500 to-purple-600',
    fuchsia: 'from-fuchsia-500 to-fuchsia-600',
  };

  const borderColors = {
    violet: 'border-violet-300 ring-violet-200',
    purple: 'border-purple-300 ring-purple-200',
    fuchsia: 'border-fuchsia-300 ring-fuchsia-200',
  };

  return (
    <div
      className={`relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
        active ? `${borderColors[color]} ring-4 -translate-y-2 scale-105` : 'border-gray-200 hover:-translate-y-1'
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-xs font-bold text-white rounded-full shadow-lg flex items-center gap-1">
            <Star size={12} />
            POPULAR
          </span>
        </div>
      )}

      {/* Animated Glow */}
      {active && (
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-5 rounded-2xl animate-pulse`}></div>
      )}

      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex p-4 rounded-xl mb-4 bg-gradient-to-br ${colors[color]} shadow-lg transform hover:scale-110 transition-transform duration-300`}>
          <div className="text-white">{icon}</div>
        </div>

        {/* Tier Name */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{tier}</h3>

        {/* Price */}
        <div className="mb-6">
          <span className={`text-4xl font-extrabold bg-gradient-to-r ${colors[color]} bg-clip-text text-transparent`}>
            {price}
          </span>
          <span className="text-gray-500">/month</span>
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <Zap size={16} className={`text-${color}-500 flex-shrink-0 mt-0.5`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className={`w-full py-3 bg-gradient-to-r ${colors[color]} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
          Coming Soon
        </button>
      </div>
    </div>
  );
}

/* Feature Badge Component */
function FeatureBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-violet-300 hover:-translate-y-1">
      <div className="text-violet-600">{icon}</div>
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
      transform: translateY(-30px) rotate(15deg);
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

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
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

  .animation-delay-1000 {
    animation-delay: 1s;
  }

  .animation-delay-1200 {
    animation-delay: 1.2s;
  }

  .animation-delay-1500 {
    animation-delay: 1.5s;
  }

  .animation-delay-1800 {
    animation-delay: 1.8s;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(style);