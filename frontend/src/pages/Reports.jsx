import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Reports() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const bg = dark ? "bg-gray-900" : "bg-gradient-to-br from-para-bg to-white";
  const card = dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const text = dark ? "text-gray-100" : "text-gray-900";
  const muted = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bg} p-6 transition-colors`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition ${dark ? "border-gray-600 bg-gray-800 text-gray-200 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className={`text-2xl font-bold ${text}`}>AI Reports</h1>
        </div>

        <div className={`rounded-2xl border ${card} p-8 shadow-sm`}>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${dark ? "bg-para-teal/20" : "bg-para-teal/10"}`}>
              <FileText className="w-10 h-10 text-para-teal" />
            </div>
            <h2 className={`text-xl font-semibold ${text} mb-2`}>Performance reports</h2>
            <p className={`${muted} max-w-md`}>
              View and download your session reports here. Full report history and export will be available in a future update.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-6 px-6 py-2.5 rounded-xl bg-para-teal text-white font-medium hover:bg-para-teal-dark transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
