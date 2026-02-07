import React from "react";
import { X } from "lucide-react";

function Sidebar({ isOpen, onClose }) {
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
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#00ACD8]">
              ParaTrain
            </h2>

            <X
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          <nav className="space-y-4 text-gray-700">
            <p className="cursor-pointer hover:text-[#00ACD8]">
              Dashboard
            </p>
            <p className="cursor-pointer hover:text-[#00ACD8]">
              Simulations
            </p>
            <p className="cursor-pointer hover:text-[#00ACD8]">
              AI Reports
            </p>
            <p className="cursor-pointer hover:text-[#00ACD8]">
              Doctor Connect
            </p>
            <p className="cursor-pointer hover:text-[#00ACD8]">
              Settings
            </p>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
