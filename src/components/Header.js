"use client";

import { useState } from "react";
import Link from "next/link";

const hubs = [
  {
    name: "FOG Treatment",
    spokes: [
      {
        href: "/spokes/how-to-treat-high-fat-wastewater",
        title: "How to Treat High-Fat Wastewater",
      },
      {
        href: "/spokes/removing-emulsified-oils-from-industrial-wastewater",
        title: "Removing Emulsified Oils",
      },
      {
        href: "/spokes/guide-to-dissolved-air-flotation-for-fog-removal",
        title: "Guide to DAF for FOG Removal",
      },
      {
        href: "/spokes/chemical-treatment-options-for-breaking-oil-emulsions",
        title: "Chemical Treatment for Emulsions",
      },
      {
        href: "/spokes/daf-vs-oil-water-separators-for-fog",
        title: "DAF vs. Oil-Water Separators",
      },
    ],
  },
  {
    name: "Solids Removal",
    spokes: [
      {
        href: "/spokes/treating-high-density-vs-low-density-suspended-solids",
        title: "High-Density vs. Low-Density Solids",
      },
      {
        href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
        title: "Sizing a Clarifier for Mining",
      },
      {
        href: "/spokes/using-a-daf-system-for-low-density-solids-removal",
        title: "DAF for Low-Density Solids",
      },
      {
        href: "/spokes/lamella-clarifiers-vs-conventional-clarifiers",
        title: "Lamella vs. Conventional Clarifiers",
      },
      {
        href: "/spokes/troubleshooting-high-total-suspended-solids-in-effluent",
        title: "Troubleshooting High TSS",
      },
    ],
  },
  {
    name: "DAF Design",
    spokes: [
      {
        href: "/spokes/daf-sizing-calculator-and-key-design-parameters",
        title: "DAF Sizing Calculator",
      },
      {
        href: "/spokes/how-does-a-dissolved-air-flotation-system-work",
        title: "How Does a DAF System Work?",
      },
      {
        href: "/spokes/daf-system-costs-capex-and-opex-breakdown",
        title: "DAF System Costs",
      },
      {
        href: "/spokes/daf-vs-clarifier-which-is-right-for-your-application",
        title: "DAF vs. Clarifier",
      },
      {
        href: "/spokes/how-to-optimize-chemical-dosage-for-daf-systems",
        title: "Optimize DAF Chemical Dosage",
      },
    ],
  },
  {
    name: "Clarifiers",
    spokes: [
      {
        href: "/spokes/clarifier-surface-overflow-rate-sor-calculator",
        title: "Clarifier SOR Calculator",
      },
      {
        href: "/spokes/thickener-design-for-mining-and-heavy-metals-industry",
        title: "Thickener Design for Mining",
      },
      {
        href: "/spokes/guide-to-flocculants-and-coagulants-for-sedimentation",
        title: "Guide to Flocculants & Coagulants",
      },
      {
        href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
        title: "Common Clarifier Problems",
      },
      {
        href: "/spokes/the-pros-and-cons-of-lamella-clarifier-designs",
        title: "Pros & Cons of Lamella Clarifiers",
      },
    ],
  },
  {
    name: "Case Studies",
    spokes: [
      {
        href: "/spokes/guide-to-wastewater-treatment-in-the-meat-processing-industry",
        title: "Meat Processing Guide",
      },
      {
        href: "/spokes/dairy-processing-wastewater-challenges-and-solutions",
        title: "Dairy Processing Guide",
      },
      {
        href: "/spokes/key-considerations-for-food-and-beverage-wastewater-treatment",
        title: "Food & Beverage Guide",
      },
      {
        href: "/spokes/water-management-and-treatment-in-mining-and-beneficiation",
        title: "Water Management in Mining",
      },
      {
        href: "/spokes/south-african-effluent-discharge-regulations-for-industrial-sites",
        title: "SA Effluent Regulations",
      },
    ],
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToHubs = () => {
    const hubsSection = document.getElementById("hubs");
    if (hubsSection) {
      hubsSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-brand-off-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="48" fill="#0A2540" />
              <path
                d="M25 62.5C37.5 50 37.5 50 50 37.5C62.5 25 75 37.5 75 37.5"
                stroke="#19D479"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M25 75C37.5 62.5 37.5 62.5 50 50C62.5 37.5 75 50 75 50"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold text-brand-navy">
              Effluentic
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {hubs.map((hub) => (
              <div key={hub.name} className="relative group">
                <button className="font-semibold text-brand-steel hover:text-brand-navy transition-colors">
                  {hub.name}
                </button>
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    {hub.spokes.map((spoke) => (
                      <Link
                        href={spoke.href}
                        key={spoke.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {spoke.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={scrollToHubs}
              className="bg-brand-action-green text-brand-navy-dark font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all"
            >
              Explore Calculators
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-navy"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            {hubs.map((hub) => (
              <div key={hub.name} className="border-b border-gray-200 py-2">
                <p className="font-bold text-brand-navy px-4">{hub.name}</p>
                {hub.spokes.map((spoke) => (
                  <Link
                    href={spoke.href}
                    key={spoke.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {spoke.title}
                  </Link>
                ))}
              </div>
            ))}
            <button
              onClick={scrollToHubs}
              className="w-full text-left bg-brand-action-green text-brand-navy-dark font-bold py-3 px-4 rounded-lg mt-4"
            >
              Explore Calculators
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
