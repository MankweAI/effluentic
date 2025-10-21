// This data is a structured representation of the "Water Treatment Research.txt" file.
// Basic structure remains, but we add more specific data points.
const engineeringData = {
  food_beverage: {
    daf: { hlr: 8, slr: 8, chem_dose_tss_factor: 0.15, chem_dose_base: 50 }, // typical 200mg/L range midpoint
    clarifier: { sor: 24 },
    costs: {
      daf_capex_per_m2: { min: 35000, typical: 50000, max: 70000 },
      clarifier_capex_per_m2: { min: 25000, typical: 40000, max: 60000 },
      opex: { power: 1.1, chemical: 1.8, maintenance: 0.035, sludge: 0.75 },
    },
    limits: { tss_mg_l: 1000, fog_mg_l: 400, cod_mg_l: 5000 }, // Indicative municipal
    bod_cod_ratio: 0.5, // Typical for F&B
  },
  meat_processing: {
    daf: { hlr: 6, slr: 15, chem_dose_tss_factor: 0.2, chem_dose_base: 100 }, // typical 400mg/L range midpoint
    clarifier: { sor: 0 }, // Not applicable
    costs: {
      daf_capex_per_m2: { min: 40000, typical: 60000, max: 85000 },
      clarifier_capex_per_m2: { min: 0, typical: 0, max: 0 },
      opex: { power: 1.5, chemical: 3.5, maintenance: 0.04, sludge: 1.2 },
    },
    limits: { tss_mg_l: 1000, fog_mg_l: 400, cod_mg_l: 5000 }, // Indicative municipal
    bod_cod_ratio: 0.5, // Typical for meat
  },
  dairy_processing: {
    daf: { hlr: 7, slr: 6, chem_dose_tss_factor: 0.18, chem_dose_base: 80 }, // typical 250mg/L range midpoint
    clarifier: { sor: 0 }, // Not applicable
    costs: {
      daf_capex_per_m2: { min: 45000, typical: 65000, max: 90000 },
      clarifier_capex_per_m2: { min: 0, typical: 0, max: 0 },
      opex: { power: 1.3, chemical: 2.5, maintenance: 0.03, sludge: 0.9 },
    },
    limits: { tss_mg_l: 1000, fog_mg_l: 400, cod_mg_l: 5000 }, // Indicative municipal
    bod_cod_ratio: 0.6, // Higher for dairy due to lactose
  },
  mining_beneficiation: {
    daf: { hlr: 0, slr: 0 }, // Not applicable
    clarifier: { sor: 20, chem_dose_tss_factor: 0.005, chem_dose_base: 2 }, // Flocculant dose (lower mg/L but high volume)
    costs: {
      daf_capex_per_m2: { min: 0, typical: 0, max: 0 },
      clarifier_capex_per_m2: { min: 30000, typical: 55000, max: 80000 },
      opex: { power: 0.8, chemical: 2.2, maintenance: 0.05, sludge: 0.25 },
    },
    limits: { tss_mg_l: 25, ph_min: 5.5, ph_max: 9.5, sulphate_mg_l: 500 }, // DWS General limits often apply
  },
  // Default fallback (can refine later if needed)
  default: {
    daf: { hlr: 8, slr: 8, chem_dose_tss_factor: 0.15, chem_dose_base: 50 },
    clarifier: { sor: 24, chem_dose_tss_factor: 0.005, chem_dose_base: 2 },
    costs: {
      daf_capex_per_m2: { min: 35000, typical: 50000, max: 70000 },
      clarifier_capex_per_m2: { min: 25000, typical: 40000, max: 60000 },
      opex: { power: 1.1, chemical: 1.8, maintenance: 0.035, sludge: 0.75 },
    },
    limits: { tss_mg_l: 1000, fog_mg_l: 400, cod_mg_l: 5000 },
    bod_cod_ratio: 0.5,
  },
};

// --- Helper Functions ---
const calculateOpex = (flow_rate_m3_hr, capex, opexParams) => {
  if (!flow_rate_m3_hr || !capex || !opexParams) return 0;
  const annual_volume_m3 = flow_rate_m3_hr * 24 * 365;
  const { power, chemical, sludge, maintenance } = opexParams;

  const power_cost = annual_volume_m3 * power;
  const chemical_cost = annual_volume_m3 * chemical; // Note: This uses average chemical cost, not specific dose calc
  const sludge_cost = annual_volume_m3 * sludge;
  const maintenance_cost = capex * maintenance;

  return power_cost + chemical_cost + sludge_cost + maintenance_cost;
};

const safeGetParams = (industry) => {
  return engineeringData[industry] || engineeringData.default;
};

// --- Core Calculation Functions ---

export function calculateDafSizing(flow_rate_m3_hr, tss_mg_l, industry) {
  const params = safeGetParams(industry);
  if (!params.daf || params.daf.hlr === 0 || !flow_rate_m3_hr || !tss_mg_l) {
    return {
      surface_area_m2: 0,
      capex_min_zar: 0,
      capex_max_zar: 0,
      opex_annual_zar: 0,
    };
  }

  const recycle_ratio = 0.3; // Assumption
  const q_total = flow_rate_m3_hr * (1 + recycle_ratio);

  const area_hlr = q_total / params.daf.hlr;
  const solids_load_kg_hr = (flow_rate_m3_hr * tss_mg_l) / 1000;
  // Ensure area_slr calculation handles potential division by zero if slr is 0 or solids_load is 0
  const area_slr =
    params.daf.slr > 0 && solids_load_kg_hr > 0
      ? solids_load_kg_hr / params.daf.slr
      : 0;

  // If SLR is the limiting factor but HLR area is zero (e.g., if q_total is zero), default to HLR area.
  // Take the larger required area, ensuring it's not zero unless inputs dictate it.
  const surface_area_m2 = Math.max(area_hlr, area_slr, 0);
  if (surface_area_m2 === 0 && (area_hlr > 0 || area_slr > 0)) {
    // Handle edge case where one area is calculated > 0 but the max results in 0
    surface_area_m2 = area_hlr > 0 ? area_hlr : area_slr;
  }

  const typical_capex = surface_area_m2 * params.costs.daf_capex_per_m2.typical;
  const min_capex = surface_area_m2 * params.costs.daf_capex_per_m2.min;
  const max_capex = surface_area_m2 * params.costs.daf_capex_per_m2.max;

  const opex_annual = calculateOpex(
    flow_rate_m3_hr,
    typical_capex,
    params.costs.opex
  );

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat(min_capex.toFixed(2)),
    capex_max_zar: parseFloat(max_capex.toFixed(2)),
    opex_annual_zar: parseFloat(opex_annual.toFixed(2)),
  };
}

export function calculateClarifierSizing(flow_rate_m3_hr, industry) {
  const params = safeGetParams(industry);
  if (!params.clarifier || params.clarifier.sor === 0 || !flow_rate_m3_hr) {
    return {
      surface_area_m2: 0,
      capex_min_zar: 0,
      capex_max_zar: 0,
      opex_annual_zar: 0,
    };
  }

  const flow_m3_day = flow_rate_m3_hr * 24;
  const surface_area_m2 = flow_m3_day / params.clarifier.sor;

  const typical_capex =
    surface_area_m2 * params.costs.clarifier_capex_per_m2.typical;
  const min_capex = surface_area_m2 * params.costs.clarifier_capex_per_m2.min;
  const max_capex = surface_area_m2 * params.costs.clarifier_capex_per_m2.max;

  const opex_annual = calculateOpex(
    flow_rate_m3_hr,
    typical_capex,
    params.costs.opex
  );

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat(min_capex.toFixed(2)),
    capex_max_zar: parseFloat(max_capex.toFixed(2)),
    opex_annual_zar: parseFloat(opex_annual.toFixed(2)),
  };
}

// --- New Concept-Specific Functions ---

export function estimateChemicalDosage(
  flow_rate_m3_hr,
  tss_mg_l,
  industry,
  technology = "daf"
) {
  const params = safeGetParams(industry);
  const techParams = params[technology]; // 'daf' or 'clarifier'

  if (!techParams || !flow_rate_m3_hr || !tss_mg_l) {
    return { dose_mg_l: 0, daily_kg: 0, annual_cost_zar: 0 };
  }

  // Simplified dose estimation (can be refined with more factors)
  const dose_mg_l =
    (techParams.chem_dose_base || 0) +
    (techParams.chem_dose_tss_factor || 0) * tss_mg_l;

  const daily_kg = (flow_rate_m3_hr * 24 * dose_mg_l) / 1000 / 1000; // m3/hr * 24hr * mg/L / (1000mg/g) / (1000g/kg)

  // Use average chemical cost per m3 to estimate cost per kg of chemical
  // This is a rough estimate and could be improved with actual chemical costs
  const avg_chem_cost_per_m3 = params.costs.opex.chemical || 1.8; // ZAR/m3
  const typical_dose_for_avg_cost =
    (params.daf.chem_dose_base || 50) +
    (params.daf.chem_dose_tss_factor || 0.15) * 1200; // Example TSS
  const cost_per_mg_l_per_m3 =
    typical_dose_for_avg_cost > 0
      ? avg_chem_cost_per_m3 / typical_dose_for_avg_cost
      : 0;
  const cost_per_kg = cost_per_mg_l_per_m3 * 1000 * 1000; // ZAR/m3/(mg/L) * 1000mg/g * 1000g/kg => ZAR/kg

  const annual_cost_zar = daily_kg * 365 * cost_per_kg;

  return {
    dose_mg_l: parseFloat(dose_mg_l.toFixed(1)),
    daily_kg: parseFloat(daily_kg.toFixed(2)),
    annual_cost_zar: parseFloat(annual_cost_zar.toFixed(2)),
  };
}

export function checkRegulatoryCompliance(industry, inputParams) {
  const params = safeGetParams(industry);
  const limits = params.limits;
  if (!limits) return {};

  const complianceStatus = {};
  for (const key in inputParams) {
    if (limits.hasOwnProperty(key)) {
      const value = parseFloat(inputParams[key]);
      const limit = limits[key];
      if (!isNaN(value)) {
        complianceStatus[key] = {
          value: value,
          limit: limit,
          compliant: value <= limit,
        };
      }
    }
    // Handle pH separately if needed (min/max)
    else if (
      key === "ph" &&
      limits.hasOwnProperty("ph_min") &&
      limits.hasOwnProperty("ph_max")
    ) {
      const value = parseFloat(inputParams[key]);
      if (!isNaN(value)) {
        complianceStatus[key] = {
          value: value,
          limit_min: limits.ph_min,
          limit_max: limits.ph_max,
          compliant: value >= limits.ph_min && value <= limits.ph_max,
        };
      }
    }
  }
  return complianceStatus;
}

export function estimateBiologicalLoad(flow_rate_m3_hr, cod_mg_l, industry) {
  const params = safeGetParams(industry);
  if (!flow_rate_m3_hr || !cod_mg_l) {
    return { daily_cod_kg: 0, estimated_bod_kg: 0 };
  }

  const daily_cod_kg = (flow_rate_m3_hr * 24 * cod_mg_l) / 1000 / 1000;
  const estimated_bod_kg = daily_cod_kg * (params.bod_cod_ratio || 0.5); // Use industry specific or default ratio

  return {
    daily_cod_kg: parseFloat(daily_cod_kg.toFixed(2)),
    estimated_bod_kg: parseFloat(estimated_bod_kg.toFixed(2)),
  };
}

// Placeholder for Troubleshooting - This would need more complex logic/data
export function getTroubleshootingTips(problem, technology, details) {
  let tips = [];
  if (problem === "high_tss") {
    if (technology === "clarifier") {
      tips.push("Check for hydraulic overloading (SOR too high).");
      tips.push("Ensure adequate chemical dosing (flocculant/coagulant).");
      tips.push("Inspect for short-circuiting or uneven flow distribution.");
      tips.push(
        "Monitor sludge blanket level; consider increasing underflow rate."
      );
    } else if (technology === "daf") {
      tips.push(
        "Check air saturation pressure and recycle rate (ensure sufficient A/S ratio)."
      );
      tips.push(
        "Verify chemical dosing (coagulant/flocculant) and mixing effectiveness."
      );
      tips.push("Inspect DAF internals for blockages or uneven flow.");
      tips.push(
        "Check influent characteristics for unexpected changes (e.g., pH, solids type)."
      );
    } else {
      tips.push("Verify upstream screening and grit removal are functioning.");
      tips.push(
        "Ensure chemical program (if any) is optimized via jar testing."
      );
    }
  }
  // Add more problem types and technologies
  return tips.length > 0
    ? tips
    : [
        "General check: Verify flow rates and influent characteristics against design parameters.",
      ];
}
