import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Flame,
  Trophy,
  Target,
  Sun,
  Moon,
  Settings,
  Phone,
  Users,
  FileText,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import armsImg from "../assets/arms.png";
import wristsImg from "../assets/wrists.png";
import legsImg from "../assets/legs.png";
import fullBodyImg from "../assets/fullbody.png";
import logo from "../assets/ParaTrainLogo.png";
import { loadProgress, saveProgress, ORDER, getDefaultProgress } from "../utils/progressStorage";

const MODES = [
  { id: "arms", label: "ARMS", image: armsImg, route: "/dashboard/simple/arms" },
  { id: "wrists", label: "WRISTS", image: wristsImg, route: "/dashboard/simple/wrists" },
  { id: "legs", label: "LEGS", image: legsImg, route: "/dashboard/simple/legs" },
  { id: "fullbody", label: "FULL BODY", image: fullBodyImg, route: "/dashboard/simple/fullbody" },
];

function BodyFigure({ bodyCompleted, dark }) {
  const strokeIncomplete = "rgba(239,68,68,0.55)";
  const fillIncomplete = "rgba(239,68,68,0.18)";
  const strokeComplete = "rgba(34,197,94,0.85)";
  const fillComplete = "rgba(34,197,94,0.25)";
  const s = (part) => (bodyCompleted[part] ? strokeComplete : strokeIncomplete);
  const f = (part) => (bodyCompleted[part] ? fillComplete : fillIncomplete);

  return (
    <svg
      viewBox="0 0 200 380"
      className="w-full max-w-[280px] md:max-w-[320px] h-auto aspect-[200/380] flex-shrink-0 drop-shadow-lg"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Head - oval, more realistic */}
      <ellipse cx="100" cy="32" rx="22" ry="26" stroke={s("head")} fill={f("head")} />
      {/* Neck */}
      <path d="M 88 56 L 88 68 L 112 68 L 112 56" stroke={s("head")} fill={f("head")} />
      {/* Shoulders / upper chest */}
      <path d="M 78 68 L 55 72 L 48 95 L 78 92 Z" stroke={s("leftArm")} fill={f("leftArm")} />
      <path d="M 122 68 L 145 72 L 152 95 L 122 92 Z" stroke={s("rightArm")} fill={f("rightArm")} />
      {/* Left upper arm */}
      <path d="M 52 98 L 28 98 L 22 135" stroke={s("leftArm")} fill="none" />
      {/* Left forearm */}
      <path d="M 22 135 L 18 175 L 25 178" stroke={s("leftArm")} fill="none" />
      {/* Left hand */}
      <ellipse cx="22" cy="188" rx="10" ry="14" stroke={s("leftHand")} fill={f("leftHand")} />
      {/* Right upper arm */}
      <path d="M 148 98 L 172 98 L 178 135" stroke={s("rightArm")} fill="none" />
      {/* Right forearm */}
      <path d="M 178 135 L 182 175 L 175 178" stroke={s("rightArm")} fill="none" />
      {/* Right hand */}
      <ellipse cx="178" cy="188" rx="10" ry="14" stroke={s("rightHand")} fill={f("rightHand")} />
      {/* Torso - chest and abdomen */}
      <path d="M 78 92 L 122 92 L 118 165 L 82 165 Z" stroke={s("stomach")} fill={f("stomach")} />
      {/* Left thigh */}
      <path d="M 82 165 L 72 165 L 62 255 L 75 258 Z" stroke={s("leftLeg")} fill={f("leftLeg")} />
      {/* Left calf */}
      <path d="M 62 255 L 58 320 L 72 325 L 68 258" stroke={s("leftLeg")} fill="none" />
      {/* Left foot */}
      <path d="M 58 320 L 52 345 L 78 348 L 72 325 Z" stroke={s("leftFoot")} fill={f("leftFoot")} />
      {/* Right thigh */}
      <path d="M 118 165 L 128 165 L 138 255 L 125 258 Z" stroke={s("rightLeg")} fill={f("rightLeg")} />
      {/* Right calf */}
      <path d="M 138 255 L 142 320 L 128 325 L 132 258" stroke={s("rightLeg")} fill="none" />
      {/* Right foot */}
      <path d="M 142 320 L 148 345 L 122 348 L 128 325 Z" stroke={s("rightFoot")} fill={f("rightFoot")} />
    </svg>
  );
}

export default function SimpleDashboard() {
  const navigate = useNavigate();
  const { user, logout, role } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(getDefaultProgress());

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const sessionsCompleted = progress.sessionsCompleted ?? 0;
  const nextIndex = Math.min(sessionsCompleted, ORDER.length - 1);
  const nextMode = ORDER[nextIndex];
  const nextRoute = MODES.find((m) => m.id === nextMode)?.route ?? "/dashboard/simple/arms";

  const progressSegments = [0, 1, 2, 3].map((i) => {
    if (i < sessionsCompleted) return "green";
    if (i === sessionsCompleted) return "yellow75";
    return "yellow35";
  });

  const bodyCompleted = {
    leftArm: sessionsCompleted >= 1,
    rightArm: sessionsCompleted >= 1,
    leftHand: sessionsCompleted >= 2,
    rightHand: sessionsCompleted >= 2,
    leftLeg: sessionsCompleted >= 3,
    rightLeg: sessionsCompleted >= 3,
    leftFoot: sessionsCompleted >= 3,
    rightFoot: sessionsCompleted >= 3,
    stomach: sessionsCompleted >= 4,
    head: sessionsCompleted >= 4,
  };

  const handleStartSession = () => navigate(nextRoute);
  const handleModeClick = (route) => navigate(route);

  const bgClass = dark ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-para-bg via-white to-para-teal/5";
  const cardClass = dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-md";
  const mutedClass = dark ? "text-gray-400" : "text-gray-600";

  const statCards = [
    { Icon: Clock, value: `${progress.trainingTimeMinutes}m`, label: "Training Time", color: "text-purple-500", bg: "bg-purple-500/10", pos: "top-left" },
    { Icon: Flame, value: String(progress.streak), label: "Day Streak", color: "text-orange-500", bg: "bg-orange-500/10", pos: "top-right" },
    { Icon: Trophy, value: String(progress.totalSessions), label: "Sessions", color: "text-blue-500", bg: "bg-blue-500/10", pos: "bottom-left" },
    { Icon: Target, value: `${progress.accuracy}%`, label: "Accuracy", color: "text-red-500", bg: "bg-red-500/10", pos: "bottom-right" },
  ];

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col transition-colors`}>
      <header className={`flex items-center justify-between px-6 py-3 border-b ${dark ? "border-gray-700" : "border-gray-200"} flex-shrink-0`}>
        <Link to="/dashboard/simple" className="flex items-center">
          <img src={logo} alt="ParaTrain" className="h-8 object-contain dark:brightness-0 dark:invert opacity-90" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium opacity-80">Dashboard</span>
            <div className={`flex rounded-lg overflow-hidden border ${dark ? "border-gray-600 bg-gray-800" : "border-gray-200 bg-gray-50"}`}>
              <button type="button" onClick={() => navigate("/dashboard")} className={`px-3 py-1.5 text-sm font-medium transition ${dark ? "text-gray-400 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}>
                NORMAL
              </button>
              <button type="button" className="px-3 py-1.5 text-sm font-medium bg-para-teal text-white">SIMPLE</button>
            </div>
          </div>
          <button type="button" onClick={toggleTheme} className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:opacity-80" title={dark ? "Light mode" : "Dark mode"}>
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <span className="text-sm font-medium opacity-80 capitalize">{role}</span>
          <button type="button" onClick={handleLogout} className="text-sm font-medium opacity-80 hover:underline">Logout</button>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-8 grid grid-cols-12 gap-6 md:gap-8 min-h-0">
        {/* LEFT: Simulation Modes - larger */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider opacity-90 px-1">Simulation Modes</h2>
          {MODES.map((mode) => {
            const completed = sessionsCompleted > ORDER.indexOf(mode.id);
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleModeClick(mode.route)}
                className={`flex items-center gap-4 w-full p-5 rounded-2xl border-2 text-left transition ${cardClass} ${
                  completed ? "border-green-500 ring-2 ring-green-500/30" : dark ? "border-gray-600 hover:border-para-teal" : "border-gray-200 hover:border-para-teal"
                }`}
              >
                <img src={mode.image} alt={mode.label} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <span className="font-semibold text-base">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* CENTRE: Welcome, progress, figure, stats, Start Session */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-center justify-start min-h-0">
          <div className="w-full mb-5">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome, {user}</h1>
            <div className="h-4 w-full rounded-full overflow-hidden flex gap-1" style={{ background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
              {progressSegments.map((seg, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all"
                  style={{
                    background: seg === "green" ? "rgba(34, 197, 94, 1)" : seg === "yellow75" ? "rgba(234, 179, 8, 0.75)" : "rgba(234, 179, 8, 0.35)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Figure + stat cards around it */}
          <div className="relative flex-1 w-full flex items-center justify-center min-h-[380px] md:min-h-[440px]">
            {/* Stat cards - positioned at corners, larger */}
            {statCards.map((stat, i) => (
              <div
                key={i}
                className={`absolute z-10 flex flex-col items-center justify-center rounded-2xl border ${cardClass} px-5 py-4 min-w-[120px] md:min-w-[140px] ${
                  stat.pos === "top-left" ? "left-0 top-0 md:left-2 md:top-2" :
                  stat.pos === "top-right" ? "right-0 top-0 md:right-2 md:top-2" :
                  stat.pos === "bottom-left" ? "left-0 bottom-0 md:left-2 md:bottom-2" :
                  "right-0 bottom-0 md:right-2 md:bottom-2"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                  <stat.Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <span className="text-lg font-bold">{stat.value}</span>
                <span className={`text-xs font-medium ${mutedClass}`}>{stat.label}</span>
              </div>
            ))}

            <div className="relative z-0 flex items-center justify-center">
              <BodyFigure bodyCompleted={bodyCompleted} dark={dark} />
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartSession}
            className="mt-6 px-12 py-4 rounded-2xl bg-para-teal text-white font-semibold hover:bg-para-teal-dark transition shadow-xl shadow-para-teal/20 text-lg"
          >
            Start Session
          </button>
        </div>

        {/* RIGHT: Doctor Connect, AI Report, utilities - larger */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
          <div className={`rounded-2xl border p-6 ${cardClass}`}>
            <h2 className="text-sm font-bold uppercase tracking-wider opacity-90 mb-4">Doctor Connect</h2>
            <div className="flex justify-center py-6">
              <div className="w-20 h-20 rounded-2xl bg-para-teal/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-para-teal" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/dashboard/doctor")}
              className="w-full py-3 rounded-xl bg-para-teal text-white font-semibold hover:bg-para-teal-dark transition"
            >
              Connect
            </button>
          </div>

          <div className={`rounded-2xl border p-6 ${cardClass}`}>
            <h2 className="text-sm font-bold uppercase tracking-wider opacity-90 mb-4">AI Performance Report</h2>
            <div className={`rounded-xl p-4 mb-4 ${dark ? "bg-gray-700" : "bg-gray-50"}`}>
              <p className="font-medium">{progress.lastReportTitle}</p>
              <p className="text-green-500 font-bold text-xl mt-1">{progress.lastReportPercent}%</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/dashboard/reports")}
              className="w-full py-3 rounded-xl border-2 border-para-teal text-para-teal font-semibold hover:bg-para-teal/10 transition"
            >
              View
            </button>
          </div>

          <div className="mt-auto flex items-center justify-end gap-3">
            <button type="button" onClick={toggleTheme} className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:opacity-80 transition" title={dark ? "Light mode" : "Dark mode"}>
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button type="button" onClick={() => navigate("/dashboard/settings")} className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:opacity-80 transition" title="Settings">
              <Settings className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => navigate("/dashboard/support")} className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-600 hover:opacity-80 transition" title="Support">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
