import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { user } = useAppContext(); // Use useAppContext, not useApp

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <p className="text-gray-600">
        Welcome back, {user?.name || "Admin"} 👋
      </p>
    </div>
  );
}
