import { Construction } from "lucide-react";

export default function Orders() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#FFF8F3] px-6">
      
      {/* Icon */}
      <div className="bg-rose-100 p-6 rounded-full shadow-md mb-6 animate-bounce">
        <Construction size={50} className="text-rose-600" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-rose-700 mb-3 text-center">
        Page Under Construction
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-center text-lg max-w-lg mb-6">
        We’re working hard to bring you the best Orders Management experience.
        Please check back soon.
      </p>

      {/* Decorative Loader */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
        <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse delay-200"></span>
        <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse delay-300"></span>
      </div>

    </div>
  );
}
