"use client";

import { useState } from "react";
import TruckIcon from "@/components/icons/TruckIcon";
import {
  PhoneIcon,
  ClockIcon,
  FireIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
} from "@heroicons/react/24/solid";

/* -------------------------
   Geyser Diagnostic Component
   ------------------------- */
const GeyserDiagnosticTool = () => {
  const [step, setStep] = useState(1);
  const [diagnosis, setDiagnosis] = useState({
    symptom: "",
    age: "",
    location: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Progress bar logic
  const progressPct =
    showResult || submitted ? 100 : Math.round(((step - 1) / 3) * 100);

  const handleSelect = (field, value) => {
    setDiagnosis((prev) => ({ ...prev, [field]: value }));
    const nextStep = step + 1;
    setStep(nextStep);

    if (nextStep > 3) {
      setShowResult(true);
    }
  };

  // LOGIC: Determine the likely problem based on inputs
  const getDiagnosisHeader = () => {
    if (diagnosis.symptom === "leaking") {
      return "Urgent: Likely Burst Geyser or Valve Failure";
    }
    if (diagnosis.symptom === "tripping") {
      return "DANGER: Live Electrical Fault (Do Not Reset)";
    }
    if (diagnosis.symptom === "cold_water") {
      return "Internal Component Failure (Requires Testing)";
    }
    return "System Malfunction (Professional Assessment Needed)";
  };

  const getDiagnosisDescription = () => {
    if (diagnosis.symptom === "leaking") {
      return "If the cylinder has burst, your ceiling is at major risk of collapse. We need to determine if it's a simple valve seal or a structural failure immediately.";
    }
    if (diagnosis.symptom === "tripping") {
      return "This indicates water has likely breached the electrical housing. This is a fire and shock hazard. A certified plumber must isolate the unit before power is restored.";
    }
    return "It could be the element, thermostat, or a burnt wire. Without a multimeter test, you risk buying the wrong parts. We carry universal replacements to fix it in one visit.";
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setSubmitted(true);
  };

  // Button Helper
  const ToolButton = ({ onClick, text }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-4 md:p-5 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 active:scale-[0.98]"
    >
      <span className="text-slate-800 font-medium text-lg">{text}</span>
    </button>
  );

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">
        Check Your Geyser Symptoms
      </h2>
      <p className="text-gray-600 mb-6 text-base">
        Answer 3 questions to see if it&apos;s a simple repair or a replacement.
      </p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="relative min-h-[220px]">
        {/* Step 1: Symptom */}
        {step === 1 && !showResult && (
          <div className="space-y-4 fade-in">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                What is the main problem?
              </div>
            </div>
            <ToolButton
              onClick={() => handleSelect("symptom", "cold_water")}
              text="No Hot Water (Water is cold)"
            />
            <ToolButton
              onClick={() => handleSelect("symptom", "leaking")}
              text="Water Leaking / Dripping from Ceiling"
            />
            <ToolButton
              onClick={() => handleSelect("symptom", "tripping")}
              text="It's Tripping the Electricity"
            />
            <ToolButton
              onClick={() => handleSelect("symptom", "low_pressure")}
              text="Low Hot Water Pressure"
            />
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && !showResult && (
          <div className="space-y-4 fade-in">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                Where is the geyser located?
              </div>
              <div className="text-gray-500 text-sm">
                This helps us know if we need a ladder or drop-sheet.
              </div>
            </div>
            <ToolButton
              onClick={() => handleSelect("location", "ceiling")}
              text="Inside the Roof / Ceiling"
            />
            <ToolButton
              onClick={() => handleSelect("location", "outside")}
              text="Mounted Outside"
            />
            <ToolButton
              onClick={() => handleSelect("location", "cupboard")}
              text="Inside a Cupboard"
            />
          </div>
        )}

        {/* Step 3: Brand/Age */}
        {step === 3 && !showResult && (
          <div className="space-y-4 fade-in">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                Approximately how old is the unit?
              </div>
            </div>
            <ToolButton
              onClick={() => handleSelect("age", "new")}
              text="Fairly New (Under 5 Years)"
            />
            <ToolButton
              onClick={() => handleSelect("age", "old")}
              text="Older (5 - 10 Years)"
            />
            <ToolButton
              onClick={() => handleSelect("age", "ancient")}
              text="Ancient / Don't Know"
            />
          </div>
        )}

        {/* Result Screen */}
        {showResult && !submitted && (
          <div className="fade-in mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-slate-900">
              Assessment:{" "}
              <span className="text-red-600 font-bold">
                {getDiagnosisHeader()}
              </span>
            </h4>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed bg-red-50 p-3 rounded border border-red-100">
              {getDiagnosisDescription()}
            </p>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg my-4 border border-blue-100">
              <TruckIcon className="h-5 w-5 text-blue-600" />
              <p className="text-blue-900 text-sm font-medium">
                ✓ A technician is currently in <strong>Pretoria East</strong>{" "}
                (Near Faerie Glen).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <a
                href="tel:012-555-0123"
                className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-4 px-4 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 text-center text-lg shadow-lg"
              >
                Call Emergency Repair: 082 585 0123
              </a>

              <div className="text-center text-sm text-gray-500 mt-3">
                or request a callback
              </div>

              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="082 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full px-4 py-3 font-mono bg-slate-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-slate-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-all"
                >
                  Call Me
                </button>
              </div>
            </form>
          </div>
        )}

        {submitted && (
          <div className="fade-in mt-6 border-t border-gray-200 pt-6 text-center">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
              <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              Request Received
            </h3>
            <p className="text-gray-600 mt-2">
              We are dispatching a request to our Pretoria East team. Expect a
              call on <span className="font-bold">{phone}</span> within 10
              minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------
   MAIN PAGE (Default Export)
   ------------------------- */
export default function GeyserRepairPretoriaEastPage() {
  return (
    <div className="fade-in bg-white">
      {/* --- Header --- */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FireIcon className="h-6 w-6 text-red-600" />
            <div className="text-xl font-bold text-slate-900">
              FixItNow Plumbers
            </div>
          </div>
          <a
            href="tel:012-555-0123"
            className="hidden md:flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-5 rounded-full hover:bg-red-700 transition-all shadow-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            082 585 0123
          </a>
        </nav>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative bg-slate-900 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Abstract background representing technical drawings or water */}
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#1e293b" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-left">
            {/* LIVE STATUS BADGE */}
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              LIVE IN PRETORIA EAST
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance">
              No Hot Water? <br />
              <span className="text-blue-400">We Fix Geysers Fast.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl text-balance">
              Specialist geyser repairs and replacements in{" "}
              <strong>
                Faerie Glen, Moreleta Park, Garsfontein, and Lynnwood
              </strong>
              . We carry parts for Kwikot, Heat Tech, and Franke.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                Insurance Approved
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <ClockIcon className="h-5 w-5 text-green-400" />
                Same-Day Service
              </div>
            </div>
          </div>

          {/* Diagnostic Tool embedded in Hero */}
          <div className="md:w-1/2 w-full">
            <GeyserDiagnosticTool />
          </div>
        </div>
      </section>

      {/* --- Local Authority Section --- */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Pretoria East Trusts Us
            </h2>
            <p className="text-gray-600 mt-4">
              We don&apos;t just do plumbing; we specialize in geyser
              diagnostics and element replacements. We know the water quality in
              Pretoria East affects elements differently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <BoltIcon className="h-10 w-10 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">
                Electrical Repairs
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Often, a &quot;broken&quot; geyser is just a faulty element or
                thermostat. We test components first to potentially save you the
                cost of a full replacement.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ShieldCheckIcon className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">
                PIRB Compliance
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                If we replace your geyser, we issue a Certificate of Compliance
                (CoC) required by your insurance in Garsfontein or Silver Lakes.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <ClockIcon className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Speed is Key</h3>
              <p className="text-gray-600 mt-2 text-sm">
                A burst geyser causes massive ceiling damage. Our teams are
                staged near Solomon Mahlangu Drive for rapid response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Reviews / Social Proof --- */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Recent Repairs in Your Area
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-gray-700 italic text-sm">
                &quot;Woke up to a cold shower. They diagnosed a burnt
                thermostat and fixed it in 45 mins. Much cheaper than I
                feared.&quot;
              </p>
              <p className="text-slate-900 font-bold text-xs mt-4">
                — Johan, Moreleta Park
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-gray-700 italic text-sm">
                &quot;Had water dripping through the ceiling in Faerie Glen. The
                team isolated the valve quickly and replaced the unit same
                day.&quot;
              </p>
              <p className="text-slate-900 font-bold text-xs mt-4">
                — Sarah, Faerie Glen
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg">
              <div className="text-yellow-400 text-sm mb-2">★★★★★</div>
              <p className="text-gray-700 italic text-sm">
                &quot;Honest guys. Told me I didn&apos;t need a new geyser, just
                a new seal and element. Saved me R8000.&quot;
              </p>
              <p className="text-slate-900 font-bold text-xs mt-4">
                — Mike, Equestria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Sticky Mobile Call Bar --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white p-4 border-t border-gray-200 shadow-lg">
        <a
          href="tel:012-555-0123"
          className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-md active:scale-95 transition-transform"
        >
          <PhoneIcon className="h-5 w-5" />
          Call Now: 082 585 0123
        </a>
      </div>
    </div>
  );
}
