import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Activity,
  Brain,
  ShieldCheck,
  Footprints,
} from "lucide-react";
import legsImg from "../../assets/legs.png";

export default function Legs() {
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
            src={legsImg}
            alt="Legs Simulation"
            className="w-full h-[460px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white">
                Legs Rehabilitation Simulation
              </h1>
              <p className="text-white/90 mt-2 max-w-2xl">
                AI-powered lower-limb rehabilitation focusing on balance,
                gait correction, joint mobility, and strength recovery.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-10">
          {/* ================= HIGHLIGHTS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <FeatureCard
              icon={<Footprints />}
              title="Gait Analysis"
              text="Step pattern, stride length, and walking stability."
            />
            <FeatureCard
              icon={<Activity />}
              title="Joint Movement"
              text="Knee, ankle, and hip range-of-motion tracking."
            />
            <FeatureCard
              icon={<Brain />}
              title="AI Evaluation"
              text="Detects imbalance, tremors, and incorrect posture."
            />
            <FeatureCard
              icon={<ShieldCheck />}
              title="Safe Recovery"
              text="Clinically approved movements with safety limits."
            />
          </div>

          {/* ================= MODULES ================= */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Training Modules Included
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {[
                "✔ Knee & Ankle Mobility Exercises",
                "✔ Balance & Stability Training",
                "✔ Controlled Squats & Leg Lifts",
                "✔ Walking & Gait Correction Drills",
                "✔ Strength Recovery Workflows",
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
              <li>User follows guided leg movement poses</li>
              <li>Camera tracks lower-body joints in real time</li>
              <li>AI evaluates balance, stability, and accuracy</li>
              <li>Instant corrective feedback is shown</li>
              <li>Detailed leg performance report is generated</li>
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
              Start Legs Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

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
