import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Activity,
  Brain,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import fullBodyImg from "../../assets/fullbody.png";

export default function FullBody() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7FAFC] px-6 py-8">
      {/* ================= BACK BUTTON ================= */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-[#00ACD8] text-white shadow hover:opacity-90 transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </div>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* ================= IMAGE HEADER ================= */}
        <div className="relative">
          <img
            src={fullBodyImg}
            alt="Full Body Simulation"
            className="w-full h-[460px] object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white">
                Full Body Rehabilitation Simulation
              </h1>
              <p className="text-white/90 mt-2 max-w-2xl">
                A comprehensive AI-powered rehabilitation environment that
                evaluates posture, balance, coordination, and full-body motion
                accuracy in real time.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-10">
          {/* ================= HIGHLIGHTS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <FeatureCard
              icon={<Activity />}
              title="Pose Tracking"
              text="Real-time skeletal tracking using computer vision."
            />
            <FeatureCard
              icon={<Brain />}
              title="AI Scoring"
              text="Accuracy, stability, and timing evaluated instantly."
            />
            <FeatureCard
              icon={<UserCheck />}
              title="Posture Analysis"
              text="Detects imbalance, tilt, and incorrect body alignment."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Clinically Safe"
              text="Doctor-verified motion limits and rehab protocols."
            />
          </div>

          {/* ================= MODULES ================= */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Training Modules Included
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {[
                "✔ Full Body Pose Matching Exercises",
                "✔ Balance & Stability Assessment",
                "✔ Posture Correction Drills",
                "✔ Coordination & Reflex Training",
                "✔ Guided Rehab Workflows",
                "✔ AI Performance Report Generation",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-xl p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ================= SESSION FLOW ================= */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              How a Session Works
            </h2>

            <ol className="space-y-3 text-gray-600 list-decimal list-inside">
              <li>User mirrors on-screen full-body poses</li>
              <li>Camera tracks skeleton joints in real time</li>
              <li>AI evaluates pose accuracy and stability</li>
              <li>Instant feedback + performance score shown</li>
              <li>Detailed report saved for doctor review</li>
            </ol>
          </div>

          {/* ================= CTA ================= */}
          <div className="flex justify-end">
            <button
              className="inline-flex items-center gap-2 px-8 py-4
                         bg-[#00ACD8] text-white text-lg font-semibold
                         rounded-xl shadow-lg hover:opacity-90 transition"
            >
              <Play size={20} />
              Start Full Body Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= FEATURE CARD COMPONENT ================= */

function FeatureCard({ icon, title, text }) {
  return (
    <div className="border rounded-xl p-6 flex gap-4 items-start bg-white shadow-sm">
      <div className="text-[#00ACD8]">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}
