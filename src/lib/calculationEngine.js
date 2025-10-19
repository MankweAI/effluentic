// Industry-specific design parameters
const DAF_PARAMS = {
  food_beverage: { hlr: 8, slr: 8 },
  meat_processing: { hlr: 6, slr: 15 },
  dairy_processing: { hlr: 7, slr: 6 },
  default: { hlr: 8, slr: 8 },
};

const CLARIFIER_PARAMS = {
  mining_beneficiation: { sor: 20 },
  default: { sor: 24 },
};

// Costing parameters (in ZAR)
const COST_PARAMS = {
  daf_capex_per_m2: 50000,
  daf_opex_per_m3: 3.75, // Simplified: Power + Chemicals + Sludge + Maintenance
  clarifier_capex_per_m2: 40000,
  clarifier_opex_per_m3: 3.25,
};

/**
 * Calculates DAF sizing and cost.
 * @param {number} flow_rate_m3_hr
 * @param {number} tss_mg_l
 * @param {string} industry
 * @returns {object} DAF specs
 */
export function calculateDafSizing(flow_rate_m3_hr, tss_mg_l, industry) {
  const params = DAF_PARAMS[industry] || DAF_PARAMS.default;
  const recycle_ratio = 0.3;
  const q_total = flow_rate_m3_hr * (1 + recycle_ratio);

  // Area by Hydraulic Loading Rate
  const area_hlr = q_total / params.hlr;

  // Area by Solids Loading Rate
  const solids_load_kg_hr = (flow_rate_m3_hr * tss_mg_l) / 1000;
  const area_slr = solids_load_kg_hr / params.slr;

  const surface_area_m2 = Math.max(area_hlr, area_slr);
  const capex = surface_area_m2 * COST_PARAMS.daf_capex_per_m2;
  const opex_annual = flow_rate_m3_hr * COST_PARAMS.daf_opex_per_m3 * 24 * 365;

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat((capex * 0.85).toFixed(2)),
    capex_max_zar: parseFloat((capex * 1.3).toFixed(2)),
    opex_annual_zar: parseFloat(opex_annual.toFixed(2)),
  };
}

/**
 * Calculates Clarifier sizing and cost.
 * @param {number} flow_rate_m3_hr
 * @param {string} industry
 * @returns {object} Clarifier specs
 */
export function calculateClarifierSizing(flow_rate_m3_hr, industry) {
  const params = CLARIFIER_PARAMS[industry] || CLARIFIER_PARAMS.default;
  const flow_m3_day = flow_rate_m3_hr * 24;

  // Area by Surface Overflow Rate
  const surface_area_m2 = flow_m3_day / params.sor;

  const capex = surface_area_m2 * COST_PARAMS.clarifier_capex_per_m2;
  const opex_annual =
    flow_rate_m3_hr * COST_PARAMS.clarifier_opex_per_m3 * 24 * 365;

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat((capex * 0.85).toFixed(2)),
    capex_max_zar: parseFloat((capex * 1.3).toFixed(2)),
    opex_annual_zar: parseFloat(opex_annual.toFixed(2)),
  };
}
