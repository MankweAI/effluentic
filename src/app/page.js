"use client";
import Link from "next/link";
import {
  CalculatorIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const hubs = [
  {
    name: "FOG (Fats, Oils, and Grease) Wastewater Treatment",
    description:
      "Solutions for treating wastewater with high concentrations of fats, oils, and grease.",
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
    name: "Suspended Solids (TSS) Removal",
    description:
      "Strategies and technologies for removing both high-density and low-density suspended solids.",
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
    name: "DAF (Dissolved Air Flotation) System Design",
    description:
      "A deep dive into DAF technology, from initial sizing and cost analysis to operational optimization.",
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
    name: "Clarifier & Thickener Technology",
    description:
      "Explore gravity-based separation technologies for heavy industry and mining applications.",
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
    name: "Industrial Wastewater Treatment Case Studies",
    description:
      "Industry-specific applications and regulatory considerations for wastewater treatment in South Africa.",
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

export default function Home() {
  const scrollToHubs = () => {
    document.getElementById("hubs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-brand-light-gray">
      {/* Hero Section */}
      <div className="relative bg-brand-navy-dark text-white text-center py-24 md:py-40 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/image/daf_unit.png')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Optional Gradient Overlay (adds subtle depth) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/10 to-black/10"></div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-6 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Engineer Your Wastewater Solution.
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto text-brand-steel-light mb-10 leading-relaxed drop-shadow-md">
            Access instant sizing calculators, budgetary costings, and technical
            data for industrial effluent treatment in South Africa.
          </p>
          <button
            onClick={scrollToHubs}
            className="mt-4 bg-brand-action-green text-brand-navy-dark font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform hover:-translate-y-1 focus:ring-4 focus:ring-brand-action-green/50"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Intro Section */}
        <section className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-brand-navy-dark mb-4">
            From Problem to Pre-Feasibility in Minutes
          </h2>
          <p className="text-brand-steel mb-12">
            Effluentic streamlines the initial design phase by replacing
            guesswork with data-driven calculations. Our hub-and-spoke model
            guides you to the exact tool you need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <MagnifyingGlassIcon className="h-12 w-12 text-brand-info mb-4" />
              <h3 className="font-bold text-lg text-brand-navy">
                1. Select Your Challenge
              </h3>
              <p className="text-sm text-brand-steel">
                Choose a topic from our content hubs.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CalculatorIcon className="h-12 w-12 text-brand-info mb-4" />
              <h3 className="font-bold text-lg text-brand-navy">
                2. Input Your Parameters
              </h3>
              <p className="text-sm text-brand-steel">
                Use our specialized calculators.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <DocumentTextIcon className="h-12 w-12 text-brand-info mb-4" />
              <h3 className="font-bold text-lg text-brand-navy">
                3. Generate Your Report
              </h3>
              <p className="text-sm text-brand-steel">
                Get instant, actionable data.
              </p>
            </div>
          </div>
        </section>

        {/* Hubs Section */}
        <div id="hubs" className="space-y-12">
          {hubs.map((hub) => (
            <section
              key={hub.name}
              className="bg-white p-6 md:p-8 rounded-xl shadow-md card-hover border-t-4 border-brand-info"
            >
              <h2 className="text-2xl font-bold text-brand-navy-dark mb-3">
                {hub.name}
              </h2>
              <p className="text-brand-steel mb-6">{hub.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hub.spokes.map((spoke) => (
                  <Link
                    href={spoke.href}
                    key={spoke.href}
                    className="group block p-4 rounded-lg bg-brand-light-gray hover:bg-gray-200 transition-colors duration-200"
                  >
                    <p className="font-semibold text-brand-navy flex justify-between items-center">
                      {spoke.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-info">
                        →
                      </span>
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Outro Section */}
        <section className="mt-20 text-center bg-white p-12 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-brand-navy-dark mb-4">
            Your Independent, First-Pass Sizing Tool
          </h2>
          <p className="text-brand-steel max-w-3xl mx-auto">
            Effluentic is an unbiased platform designed to empower engineers.
            Every report includes a directory of local South African equipment
            suppliers, giving you clear, actionable next steps without favoring
            any single provider.
          </p>
        </section>
      </div>
    </div>
  );
}
