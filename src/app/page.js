"use client";
import Link from "next/link";

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
        title: "Removing Emulsified Oils from Industrial Wastewater",
      },
      {
        href: "/spokes/guide-to-dissolved-air-flotation-for-fog-removal",
        title: "Guide to DAF for FOG Removal",
      },
      {
        href: "/spokes/chemical-treatment-options-for-breaking-oil-emulsions",
        title: "Chemical Treatment for Oil Emulsions",
      },
      {
        href: "/spokes/daf-vs-oil-water-separators-for-fog",
        title: "DAF vs. Oil-Water Separators for FOG",
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
        title: "Treating High-Density vs. Low-Density Solids",
      },
      {
        href: "/spokes/how-to-size-a-clarifier-for-mining-wastewater",
        title: "How to Size a Clarifier for Mining Wastewater",
      },
      {
        href: "/spokes/using-a-daf-system-for-low-density-solids-removal",
        title: "Using a DAF System for Low-Density Solids",
      },
      {
        href: "/spokes/lamella-clarifiers-vs-conventional-clarifiers",
        title: "Lamella vs. Conventional Clarifiers",
      },
      {
        href: "/spokes/troubleshooting-high-total-suspended-solids-in-effluent",
        title: "Troubleshooting High TSS in Effluent",
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
        title: "DAF Sizing Calculator & Design Parameters",
      },
      {
        href: "/spokes/how-does-a-dissolved-air-flotation-system-work",
        title: "How Does a DAF System Work?",
      },
      {
        href: "/spokes/daf-system-costs-capex-and-opex-breakdown",
        title: "DAF System Costs: CAPEX & OPEX",
      },
      {
        href: "/spokes/daf-vs-clarifier-which-is-right-for-your-application",
        title: "DAF vs. Clarifier: Which is Right for You?",
      },
      {
        href: "/spokes/how-to-optimize-chemical-dosage-for-daf-systems",
        title: "How to Optimize Chemical Dosage for DAF",
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
        title: "Thickener Design for the Mining Industry",
      },
      {
        href: "/spokes/guide-to-flocculants-and-coagulants-for-sedimentation",
        title: "Guide to Flocculants & Coagulants",
      },
      {
        href: "/spokes/common-operational-problems-with-wastewater-clarifiers",
        title: "Common Problems with Clarifiers",
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
        title: "Wastewater Guide: Meat Processing",
      },
      {
        href: "/spokes/dairy-processing-wastewater-challenges-and-solutions",
        title: "Wastewater Guide: Dairy Processing",
      },
      {
        href: "/spokes/key-considerations-for-food-and-beverage-wastewater-treatment",
        title: "Wastewater Guide: Food & Beverage",
      },
      {
        href: "/spokes/water-management-and-treatment-in-mining-and-beneficiation",
        title: "Water Management in Mining",
      },
      {
        href: "/spokes/south-african-effluent-discharge-regulations-for-industrial-sites",
        title: "South African Effluent Regulations",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="bg-brand-light-gray min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy-dark mb-4">
            Wastewater Treatment Hub
          </h1>
          <p className="text-lg text-brand-steel max-w-3xl mx-auto">
            Your central resource for sizing, costing, and understanding
            industrial wastewater treatment technologies in South Africa. Select
            a topic to explore specific solutions and calculators.
          </p>
        </header>

        <div className="space-y-12">
          {hubs.map((hub) => (
            <section
              key={hub.name}
              className="bg-white p-8 rounded-xl shadow-md card-hover"
            >
              <h2 className="text-2xl font-bold text-brand-navy-dark border-b-2 border-gray-100 pb-4 mb-6">
                {hub.name}
              </h2>
              <p className="text-brand-steel mb-8">{hub.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hub.spokes.map((spoke) => (
                  <Link
                    href={spoke.href}
                    key={spoke.href}
                    className="block p-4 rounded-lg bg-brand-light-gray hover:bg-gray-200 transition-colors duration-200"
                  >
                    <p className="font-semibold text-brand-navy">
                      {spoke.title}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
