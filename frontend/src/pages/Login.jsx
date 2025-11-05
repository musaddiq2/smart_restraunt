import { useState } from "react";
import { useAppContext  } from "../context/AppContext";

export default function Login() {
  const { setUser } = useAppContext();
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email.trim()) {
      setUser({ name: "Guest", email });
      alert("Login successful!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
