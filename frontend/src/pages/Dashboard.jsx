import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  Star,
  Flame,
  Play,
  Crown,
  FileText,
  Menu,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { loadProgress } from "../utils/progressStorage";
import { ORDER } from "../utils/progressStorage";

import armsImg from "../assets/arms.png";
import wristsImg from "../assets/wrists.png";
import legsImg from "../assets/legs.png";
import fullBodyImg from "../assets/fullbody.png";

const SIMPLE_ROUTES = {
  arms: "/dashboard/simple/arms",
  wrists: "/dashboard/simple/wrists",
  legs: "/dashboard/simple/legs",
  fullbody: "/dashboard/simple/fullbody",
};

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(loadProgress());

  const refreshProgress = () => setProgress(loadProgress());

  useEffect(() => {
    refreshProgress();
    const onFocus = () => refreshProgress();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const sessionsCompleted = progress.sessionsCompleted ?? 0;
  const nextIndex = Math.min(sessionsCompleted, ORDER.length - 1);
  const nextMode = ORDER[nextIndex];
  const nextSessionRoute = SIMPLE_ROUTES[nextMode] ?? "/dashboard/simple/arms";

  const handleStartNewSession = () => {
    navigate(nextSessionRoute);
  };

  const trainingTimeDisplay = progress.trainingTimeMinutes >= 60
    ? `${(progress.trainingTimeMinutes / 60).toFixed(1)}h`
    : `${progress.trainingTimeMinutes}m`;

  const stats = [
    { label: "Sessions Completed", value: String(progress.totalSessions ?? 0), icon: Trophy, iconClass: "text-blue-500", bgClass: "bg-blue-500/10" },
    { label: "Training Time", value: trainingTimeDisplay, icon: Clock, iconClass: "text-purple-500", bgClass: "bg-purple-500/10" },
    { label: "Accuracy Score", value: `${progress.accuracy ?? 0}%`, icon: Star, iconClass: "text-amber-500", bgClass: "bg-amber-500/10" },
    { label: "Day Streak", value: String(progress.streak ?? 0), icon: Flame, iconClass: "text-orange-500", bgClass: "bg-orange-500/10" },
  ];

  const simulations = [
    { title: "Arms", desc: "Practice arm examinations and procedures", image: armsImg, rating: 3, modules: "12 modules", route: "/dashboard/arms" },
    { title: "Legs", desc: "Master lower limb examination techniques", image: legsImg, rating: 3, modules: "10 modules", route: "/dashboard/legs" },
    { title: "Wrists", desc: "Advanced hand and wrist diagnostics", image: wristsImg, rating: 4, modules: "15 modules", route: "/dashboard/wrists" },
    { title: "Full Body", desc: "Comprehensive full body examination", image: fullBodyImg, rating: 5, modules: "20 modules", route: "/dashboard/fullbody" },
  ];

  const bgMain = dark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 via-para-bg to-para-teal/5";
  const cardBg = dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100";
  const textPrimary = dark ? "text-gray-100" : "text-gray-900";
  const textMuted = dark ? "text-gray-400" : "text-gray-500";

  return (
    <div className={`min-h-screen ${bgMain} relative overflow-hidden transition-colors`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className={`p-2 rounded-xl ${dark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-white/80 text-gray-600"} transition shadow-sm`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold ${textPrimary} tracking-tight`}>
                Welcome back, {user}!
              </h1>
              <p className={`${textMuted} mt-1 text-sm md:text-base`}>
                Continue your medical training journey with our advanced simulations
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartNewSession}
            className="flex items-center gap-2 bg-para-teal hover:bg-para-teal-dark text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-para-teal/25 hover:shadow-xl transition active:scale-[0.98]"
          >
            <Play size={20} /> Start New Session
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${cardBg} p-5 md:p-6 shadow-sm hover:shadow-md transition ${dark ? "hover:bg-gray-700/50" : ""}`}
            >
              <div className="flex justify-between items-center mb-3">
                <div className={`w-12 h-12 rounded-xl ${s.bgClass} flex items-center justify-center`}>
                  <s.icon className={`w-6 h-6 ${s.iconClass}`} />
                </div>
              </div>
              <p className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>{s.value}</p>
              <p className={`text-sm ${textMuted} mt-0.5`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
          <div className="xl:col-span-8 space-y-8">
            {/* Simulation Modes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${textPrimary}`}>Simulation Modes</h2>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/simulation-modes")}
                  className="text-para-teal text-sm font-medium hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {simulations.map((sim, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition ${cardBg} group`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={sim.image} alt={sim.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className={`font-semibold mb-1 ${textPrimary}`}>{sim.title}</h3>
                      <p className={`text-sm ${textMuted} mb-3 line-clamp-2`}>{sim.desc}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            className={idx < sim.rating ? "text-amber-400 fill-amber-400" : "text-gray-300 dark:text-gray-600"}
                          />
                        ))}
                        <span className={`text-xs ${textMuted} ml-2`}>{sim.modules}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate(sim.route)}
                        className="w-full bg-para-teal hover:bg-para-teal-dark text-white py-2.5 rounded-xl text-sm font-medium transition"
                      >
                        Start Training
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Reports */}
            <div className={`rounded-2xl border p-6 ${cardBg} shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`font-semibold text-lg ${textPrimary}`}>AI Performance Reports</h2>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/reports")}
                  className="text-para-teal text-sm font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              {[
                { title: "Arms Simulation Report", time: "Generated 2 hours ago", score: "95%", color: "text-green-500" },
                { title: "Full Body Assessment", time: "Generated yesterday", score: "88%", color: "text-green-500" },
                { title: "Hands Diagnostic Report", time: "Generated 3 days ago", score: "78%", color: "text-amber-500" },
              ].map((r, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center rounded-xl p-4 mb-3 last:mb-0 ${dark ? "bg-gray-700/50" : "bg-gray-50/80"} hover:bg-para-teal/5 transition`}
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-para-teal/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="text-para-teal w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{r.title}</p>
                      <p className={`text-xs ${textMuted}`}>{r.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${r.color}`}>{r.score}</span>
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard/reports")}
                      className="text-sm border border-para-teal/50 text-para-teal px-4 py-1.5 rounded-lg hover:bg-para-teal/10 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pro card */}
          <div className="xl:col-span-4">
            <div className="rounded-2xl bg-gradient-to-b from-indigo-600 to-indigo-700 p-6 text-white shadow-xl sticky top-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">Pro</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Premium</h3>
              <p className="text-sm text-white/90 mb-5">
                Live doctor consultations and advanced training simulations
              </p>
              <ul className="text-sm space-y-2.5 mb-6">
                {["Real-time doctor consultations", "Advanced simulations", "Certified AI reports", "Unlimited access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-300">✔</span> {item}
                  </li>
                ))}
              </ul>
              <div className="bg-white/15 rounded-xl p-4 mb-4 text-center backdrop-blur">
                <p className="text-3xl font-bold">$49</p>
                <p className="text-xs text-white/80">per month</p>
              </div>
              <button type="button" className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl hover:bg-white/95 transition">
                Upgrade to Pro
              </button>
              <p className="text-xs text-center mt-3 text-white/70">7-day free trial · No card required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
