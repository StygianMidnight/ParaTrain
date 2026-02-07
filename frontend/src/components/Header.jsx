import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/ParaTrainLogo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, role } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isSimple = location.pathname.startsWith("/dashboard/simple");

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 flex-shrink-0 transition-colors">
      <Link to="/dashboard" className="flex items-center gap-2">
        <img src={logo} alt="ParaTrain" className="h-8 object-contain dark:brightness-0 invert opacity-90" />
      </Link>

      <div className="flex items-center gap-4">
        {/* Dashboard slider: NORMAL | SIMPLE */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Dashboard</span>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-700">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                !isSimple ? "bg-para-teal text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              NORMAL
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/simple")}
              className={`px-3 py-1.5 text-sm font-medium transition ${
                isSimple ? "bg-para-teal text-white" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              SIMPLE
            </button>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">{role}</span>

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-para-teal hover:text-para-teal-dark font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
