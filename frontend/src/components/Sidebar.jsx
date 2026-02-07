import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import logo from "../assets/ParaTrainLogo.png";

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isDashboard = pathname === "/dashboard" || (pathname.startsWith("/dashboard/") && !pathname.startsWith("/dashboard/simple"));
  const linkClass = (path, isPrefix) =>
    `block cursor-pointer hover:text-[#00ACD8] ${isPrefix ? (path === "/dashboard" ? isDashboard : pathname.startsWith(path)) : pathname === path ? "text-[#00ACD8] font-medium" : ""}`;
  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <img src={logo} alt="ParaTrain" className="h-8 object-contain dark:brightness-0 dark:invert opacity-90" />

            <X
              className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={onClose}
            />
          </div>

          <nav className="space-y-4 text-gray-700 dark:text-gray-300">
            <Link to="/dashboard" className={`block cursor-pointer hover:text-para-teal ${isDashboard ? "text-para-teal font-medium" : ""}`} onClick={onClose}>
              Dashboard
            </Link>
            <Link to="/dashboard/simulation-modes" className={`block cursor-pointer hover:text-para-teal ${pathname.startsWith("/dashboard/simulation-modes") ? "text-para-teal font-medium" : ""}`} onClick={onClose}>
              Simulations
            </Link>
            <Link to="/dashboard/reports" className={linkClass("/dashboard/reports")} onClick={onClose}>
              AI Reports
            </Link>
            <Link to="/dashboard/doctor" className={linkClass("/dashboard/doctor")} onClick={onClose}>
              Doctor Connect
            </Link>
            <Link to="/dashboard/settings" className={linkClass("/dashboard/settings")} onClick={onClose}>
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
