// src/app/spokes/blocked-drain-diagnostic/page.js
"use client";

import { useState } from "react";
// Import the new TruckIcon
import TruckIcon from "@/components/icons/TruckIcon";
// Import Heroicons (which are already in package.json)
import {
  PhoneIcon,
  ClockIcon,
  BeakerIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

/* -------------------------
   DiagnosticTool component
   ------------------------- */
const DiagnosticTool = () => {
  const [step, setStep] = useState(1); // 1..3
  const [diagnosis, setDiagnosis] = useState({
    location: "",
    symptoms: "",
    scope: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Simple progress percent
  const progressPct =
    showResult || submitted ? 100 : Math.round(((step - 1) / 3) * 100);

  const handleSelect = (field, value) => {
    setDiagnosis((prev) => ({ ...prev, [field]: value }));
    const nextStep = step + 1;
    setStep(nextStep);

    // If that was the last step, show the result
    if (nextStep > 3) {
      setShowResult(true);
    }
  };

  const getDiagnosisText = () => {
    if (diagnosis.scope === "whole_house") {
      return "Probable Main Line Blockage";
    }
    if (diagnosis.location === "kitchen_sink") {
      return "Probable FOG (Fat/Oil/Grease) Blockage";
    }
    return "Localized Fixture Blockage";
  };

  const getDiagnosisDescription = () => {
    if (diagnosis.scope === "whole_house") {
      return "This is a high-priority job that often requires a high-pressure jetter.";
    }
    return "This is a common blockage that can typically be cleared quickly.";
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    setSubmitted(true);
  };

  // --- HELPER COMPONENT FOR TOOL BUTTONS ---
  const ToolButton = ({ onClick, text }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-4 md:p-5 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 active:scale-[0.98]"
    >
      <span className="text-slate-800 font-medium text-lg">{text}</span>
    </button>
  );

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">
        Start Your 30-Second Diagnosis
      </h2>
      <p className="text-gray-600 mb-6 text-base">
        Answer 3 quick questions — results immediately.
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-teal-400 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Step content container */}
      <div className="relative min-h-[220px]">
        {/* Step 1 */}
        {step === 1 && !showResult && (
          <div className="space-y-4">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step}
                </div>
                Where is **YOUR** blockage?
              </div>
              <div className="text-gray-500 text-sm">
                This tells us if YOUR problem is localised or structural.
              </div>
            </div>

            <ToolButton
              onClick={() => handleSelect("location", "kitchen_sink")}
              text="Kitchen Sink"
            />
            <ToolButton
              onClick={() => handleSelect("location", "toilet")}
              text="Toilet"
            />
            <ToolButton
              onClick={() => handleSelect("location", "shower_bath")}
              text="Shower / Bath"
            />
            <ToolButton
              onClick={() => handleSelect("location", "outside_drain")}
              text="Outside Drain"
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && !showResult && (
          <div className="space-y-4 fade-in">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step}
                </div>
                What are YOU experiencing?
              </div>
              <div className="text-gray-500 text-sm">
                This helps us tell if the pipe is partially or completely
                occluded.
              </div>
            </div>

            <ToolButton
              onClick={() => handleSelect("symptoms", "slow_draining")}
              text="Slow Draining"
            />
            <ToolButton
              onClick={() => handleSelect("symptoms", "gurgling_sounds")}
              text="Gurgling Sounds"
            />
            <ToolButton
              onClick={() => handleSelect("symptoms", "fully_blocked")}
              text="Fully Blocked (Water not going down)"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && !showResult && (
          <div className="space-y-4 fade-in">
            <div className="mb-6">
              <div className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-1">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step}
                </div>
                Is this affecting just one spot? Or YOUR whole home?
              </div>
              <div className="text-gray-500 text-sm">
                This tells us if it’s a main line event.
              </div>
            </div>

            <ToolButton
              onClick={() => handleSelect("scope", "one_spot")}
              text="Just this one spot"
            />
            <ToolButton
              onClick={() => handleSelect("scope", "whole_house")}
              text="The whole house"
            />
          </div>
        )}

        {/* Result & Conversion */}
        {showResult && !submitted && (
          <div className="fade-in mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-slate-900">
              Diagnosis:{" "}
              <span className="text-blue-600 font-bold">
                {getDiagnosisText()}
              </span>
            </h4>
            <p className="text-gray-600 mt-2">{getDiagnosisDescription()}</p>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg my-4">
              <ClockIcon className="h-5 w-5 text-blue-600" />
              <p className="text-blue-800 text-sm font-medium">
                ✓ Another main line cleared in Ferndale (45 mins ago)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* PRIMARY CTA - FIRST */}
              <a
                href="tel:082-555-1234"
                className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-4 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 text-center text-lg"
              >
                Call Mathew right now: 082&nbsp;555&nbsp;1234
              </a>

              {/* SECONDARY CTA - callback path */}
              <div className="text-center text-sm text-gray-500 mt-3">or</div>

              <h4 className="text-center text-base font-semibold text-slate-900 mt-1">
                Let Mathew call you in 15 minutes
              </h4>

              <input
                type="tel"
                placeholder="Your mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-2 block w-full px-4 py-3 font-mono bg-slate-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="mt-3 w-full flex items-center justify-center bg-yellow-400 text-slate-900 font-bold py-4 px-4 rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-105"
              >
                Get my call-back from Mathew
              </button>
            </form>
          </div>
        )}

        {submitted && (
          <div className="fade-in mt-6 border-t border-gray-200 pt-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">Thank You!</h3>
            <p className="text-gray-600 mt-2">
              A master plumber will call you back at{" "}
              <span className="text-slate-900 font-bold">{phone}</span> in the
              next 15 minutes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------
   MAIN PAGE
   ------------------------- */
export default function BlockedDrainDiagnosticPage() {
  return (
    <div className="fade-in">
      {/* --- Layer 1: Header --- */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl font-bold text-slate-900">ABC Plumbing</div>
          <a
            href="tel:082-555-1234"
            className="hidden md:flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold py-2 px-5 rounded-full hover:bg-yellow-500 transition-all transform hover:scale-105"
          >
            <PhoneIcon className="h-5 w-5" />
            Call 24/7: 082 555 1234
          </a>
        </nav>
      </header>

      {/* --- Layer 2: Hero (Video + H1 + CTA) --- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-center text-white p-4">
        {/* Layer 2a: Background Video */}
        <div className="absolute inset-0 bg-gray-800">
          {/* <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/path-to-your-video.mp4" type="video/mp4" />
          </video> */}
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-mono">
            [Looping Background Video: Tradesman Fixing Drain]
          </div>
        </div>

        {/* Layer 2b: Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Layer 2c: Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-balance">
            How much does it cost to unblock a drain?
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl text-balance">
            The cost depends on the problem. Use our 30-second tool to
            <strong> diagnose the blockage</strong> and get a{" "}
            <strong>free 15-minute expert call-back</strong>.
          </p>
          <a
            href="#diagnostic-tool"
            className="mt-8 bg-yellow-400 text-slate-900 font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 transition-all duration-300 transform hover:scale-110"
          >
            Start Your 30-Second Diagnosis ↓
          </a>
        </div>
      </section>

      {/* --- Layer 3: The Tool --- */}
      <section id="diagnostic-tool" className="py-16 md:py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <DiagnosticTool />
        </div>
      </section>

      {/* --- Layer 4: The "Authority" Layer --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2 border-b border-gray-200 pb-3 mb-6">
              Why We Diagnose First
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                We don&apos;t guess your price. We identify your problem, so we
                send the right plumber with the right tools, the first time.
              </p>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-800 font-medium">
                A &quot;kitchen sink&quot; blockage (likely fats and grease) is
                different from a &quot;main line&quot; blockage (often roots or
                a structural issue). Our{" "}
                <strong>Blocked Drain Diagnostic Tool</strong>
                ensures we are prepared for your specific problem. This saves
                you time and money.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* --- Layer 5: The "Trust" Layer (Social Proof) --- */}
      <section className="py-16 md:py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 text-balance">
            Randburg&apos;s 5-Star Rated Drain Experts
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-balance">
            While competitors like{" "}
            <span className="font-bold text-gray-800">[Competitor Name]</span>{" "}
            average 4.1 stars, we guarantee 5-star service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border transform transition-all duration-300 hover:scale-105">
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <p className="text-gray-700 mt-3 text-lg">
                &quot;Fast, professional, and stuck to their online diagnosis.
                Will use ABC Plumbing again.&quot;
              </p>
              <p className="font-bold text-slate-900 mt-4">
                - Sarah K, Ferndale
              </p>
            </div>
            {/* Review 2 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border transform transition-all duration-300 hover:scale-105">
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <p className="text-gray-700 mt-3 text-lg">
                &quot;They were here in 30 minutes on a Sunday and unblocked our
                kitchen sink. Lifesavers.&quot;
              </p>
              <p className="font-bold text-slate-900 mt-4">
                - Mike B, Northcliff
              </p>
            </div>
            {/* Review 3 */}
            <div className="bg-white p-8 rounded-xl shadow-xl border transform transition-all duration-300 hover:scale-105">
              <div className="text-yellow-400 text-2xl">★★★★★</div>
              <p className="text-gray-700 mt-3 text-lg">
                &quot;No call-out fee and no mess. The plumber was polite and
                wore boot covers. Very impressed.&quot;
              </p>
              <p className="font-bold text-slate-900 mt-4">
                - Thabo M, Randpark Ridge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Layer 6: "Why Trust Us" Layer (Guarantees) --- */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 text-balance">
            Our Guarantees
          </h2>
          <p className="text-lg text-gray-600 mt-4 text-balance">
            We&apos;re not just fast, we&apos;re professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            {/* Guarantee 1 */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-center">
                <span className="bg-blue-100 p-4 rounded-full">
                  <ShieldCheckIcon className="h-10 w-10 text-blue-600" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">
                Licensed & Insured
              </h3>
              <p className="text-gray-600 mt-2">
                All our plumbers are fully licensed, insured, and PIRB
                registered for your peace of mind.
              </p>
            </div>
            {/* Guarantee 2 */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-center">
                <span className="bg-blue-100 p-4 rounded-full">
                  <ClockIcon className="h-10 w-10 text-blue-600" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">
                24/7 Emergency Service
              </h3>
              <p className="text-gray-600 mt-2">
                A blocked drain is an emergency. We&apos;re on call 24/7, 365
                days a year, ready to help.
              </p>
            </div>
            {/* Guarantee 3 */}
            <div className="bg-white p-6 rounded-lg">
              <div className="flex justify-center">
                <span className="bg-blue-100 p-4 rounded-full">
                  <WrenchScrewdriverIcon className="h-10 w-10 text-blue-600" />
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-4">
                Fixed-Price Guarantee
              </h3>
              <p className="text-gray-600 mt-2">
                Once our plumber confirms the diagnosis on-site, the price we
                give you is the price you pay. No surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Layer 7: The "Process" Layer --- */}
      <section className="py-16 md:py-20 bg-slate-100">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 text-balance">
            Your 3-Step &apos;No-Fuss&apos; Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center md:text-left">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <span className="bg-blue-100 p-3 rounded-full inline-flex">
                <BeakerIcon className="h-8 w-8 text-blue-600" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">
                1. Diagnose Problem
              </h3>
              <p className="text-gray-600 text-lg mt-2">
                Use our free 30-second tool.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <span className="bg-blue-100 p-3 rounded-full inline-flex">
                <PhoneIcon className="h-8 w-8 text-blue-600" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">
                2. Get Free Call-Back
              </h3>
              <p className="text-gray-600 text-lg mt-2">
                A master plumber calls you in 15 mins.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <span className="bg-blue-100 p-3 rounded-full inline-flex">
                <TruckIcon className="h-8 w-8 text-blue-600" />
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-4">
                3. Job Done
              </h3>
              <p className="text-gray-600 text-lg mt-2">
                We arrive on time and clear your drain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Layer 8: Final Conversion Layer --- */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-white text-balance">
            Ready to Get Your Drain Cleared?
          </h2>
          <p className="text-lg text-gray-300 mt-4 text-balance">
            Stop worrying. Get your instant diagnosis, and let&apos;s get it
            fixed.
          </p>
          <div className="w-full max-w-2xl mt-8">
            <DiagnosticTool />
          </div>
        </div>
      </section>

      {/* --- Layer 9: Footer --- */}
      <footer className="bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-6 py-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} ABC Plumbing. All rights reserved.
          </p>
          <p className="mt-2">
            Serving Randburg, Sandton, and Surrounding Areas
          </p>
        </div>
      </footer>

      {/* --- NEW: Sticky Mobile "Panic Bar" --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white p-3 border-t border-gray-200 shadow-lg grid grid-cols-2 gap-3">
        <a
          href="tel:082-555-1234"
          className="flex items-center justify-center gap-2 bg-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-full transition-all transform hover:scale-105"
        >
          <PhoneIcon className="h-5 w-5" />
          Call 24/7
        </a>
        <a
          href="#diagnostic-tool"
          className="flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-full transition-all transform hover:scale-105"
        >
          Start Diagnosis
        </a>
      </div>

      {/* We need this style for the fade-in animation */}
      <style jsx global>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
