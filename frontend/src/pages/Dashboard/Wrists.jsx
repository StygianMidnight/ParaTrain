import React from "react";
import { useNavigate } from "react-router-dom";
import wristsImg from "../../assets/wrists.png";

export default function Wrists() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 bg-[#F7FAFC]">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-6 px-4 py-2 bg-[#00ACD8] text-white rounded-lg shadow hover:opacity-90"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Hands & Wrists Simulation</h1>
        <p className="text-gray-600 mb-4">
          Advanced hand and wrist diagnostics. Learn precision techniques,
          proper positioning, and detailed procedural practice.
        </p>

        <img
          src={wristsImg}
          alt="Wrists Simulation"
          className="w-full h-96 object-cover rounded-lg mb-4"
        />

        <div className="text-gray-700">
          <h2 className="font-semibold mb-2">Modules Included:</h2>
          <ul className="list-disc list-inside">
            <li>Muscle and Joint Assessment</li>
            <li>Range of Motion Exercises</li>
            <li>Diagnostic Techniques</li>
            <li>Procedural Simulations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
