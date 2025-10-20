// This data is a structured representation of the "Water Treatment Research.txt" file.
const engineeringData = {
  food_beverage: {
    daf: { hlr: 8, slr: 8 },
    clarifier: { sor: 24 },
    costs: {
      daf_capex_per_m2: { min: 35000, typical: 50000, max: 70000 },
      clarifier_capex_per_m2: { min: 25000, typical: 40000, max: 60000 },
      opex: { power: 1.1, chemical: 1.8, maintenance: 0.035, sludge: 0.75 },
    },
  },
  meat_processing: {
    daf: { hlr: 6, slr: 15 },
    clarifier: { sor: 0 }, // Not applicable
    costs: {
      daf_capex_per_m2: { min: 40000, typical: 60000, max: 85000 },
      clarifier_capex_per_m2: { min: 0, typical: 0, max: 0 },
      opex: { power: 1.5, chemical: 3.5, maintenance: 0.04, sludge: 1.2 },
    },
  },
  dairy_processing: {
    daf: { hlr: 7, slr: 6 },
    clarifier: { sor: 0 }, // Not applicable
    costs: {
      daf_capex_per_m2: { min: 45000, typical: 65000, max: 90000 },
      clarifier_capex_per_m2: { min: 0, typical: 0, max: 0 },
      opex: { power: 1.3, chemical: 2.5, maintenance: 0.03, sludge: 0.9 },
    },
  },
  mining_beneficiation: {
    daf: { hlr: 0, slr: 0 }, // Not applicable
    clarifier: { sor: 20 },
    costs: {
      daf_capex_per_m2: { min: 0, typical: 0, max: 0 },
      clarifier_capex_per_m2: { min: 30000, typical: 55000, max: 80000 },
      opex: { power: 0.8, chemical: 2.2, maintenance: 0.05, sludge: 0.25 },
    },
  },
  default: {
    // Fallback to food & beverage data
    daf: { hlr: 8, slr: 8 },
    clarifier: { sor: 24 },
    costs: {
      daf_capex_per_m2: { min: 35000, typical: 50000, max: 70000 },
      clarifier_capex_per_m2: { min: 25000, typical: 40000, max: 60000 },
      opex: { power: 1.1, chemical: 1.8, maintenance: 0.035, sludge: 0.75 },
    },
  },
};

const calculateOpex = (flow_rate_m3_hr, capex, industryParams) => {
  const annual_volume_m3 = flow_rate_m3_hr * 24 * 365;
  const { power, chemical, sludge, maintenance } = industryParams.costs.opex;

  const power_cost = annual_volume_m3 * power;
  const chemical_cost = annual_volume_m3 * chemical;
  const sludge_cost = annual_volume_m3 * sludge;
  const maintenance_cost = capex * maintenance;

  return power_cost + chemical_cost + sludge_cost + maintenance_cost;
};

/**
 * Calculates DAF sizing and cost.
 * @param {number} flow_rate_m3_hr
 * @param {number} tss_mg_l
 * @param {string} industry
 * @returns {object} DAF specs
 */
export function calculateDafSizing(flow_rate_m3_hr, tss_mg_l, industry) {
  const params = engineeringData[industry] || engineeringData.default;
  if (!params.daf || params.daf.hlr === 0)
    return {
      surface_area_m2: 0,
      capex_min_zar: 0,
      capex_max_zar: 0,
      opex_annual_zar: 0,
    };

  const recycle_ratio = 0.3;
  const q_total = flow_rate_m3_hr * (1 + recycle_ratio);

  const area_hlr = q_total / params.daf.hlr;
  const solids_load_kg_hr = (flow_rate_m3_hr * tss_mg_l) / 1000;
  const area_slr =
    solids_load_kg_hr > 0 ? solids_load_kg_hr / params.daf.slr : 0;

  const surface_area_m2 = Math.max(area_hlr, area_slr);

  const typical_capex = surface_area_m2 * params.costs.daf_capex_per_m2.typical;
  const min_capex = surface_area_m2 * params.costs.daf_capex_per_m2.min;
  const max_capex = surface_area_m2 * params.costs.daf_capex_per_m2.max;

  const opex_annual = calculateOpex(flow_rate_m3_hr, typical_capex, params);

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat(min_capex.toFixed(2)),
    capex_max_zar: parseFloat(max_capex.toFixed(2)),
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
  const params = engineeringData[industry] || engineeringData.default;
  if (!params.clarifier || params.clarifier.sor === 0)
    return {
      surface_area_m2: 0,
      capex_min_zar: 0,
      capex_max_zar: 0,
      opex_annual_zar: 0,
    };

  const flow_m3_day = flow_rate_m3_hr * 24;
  const surface_area_m2 = flow_m3_day / params.clarifier.sor;

  const typical_capex =
    surface_area_m2 * params.costs.clarifier_capex_per_m2.typical;
  const min_capex = surface_area_m2 * params.costs.clarifier_capex_per_m2.min;
  const max_capex = surface_area_m2 * params.costs.clarifier_capex_per_m2.max;

  const opex_annual = calculateOpex(flow_rate_m3_hr, typical_capex, params);

  return {
    surface_area_m2: parseFloat(surface_area_m2.toFixed(2)),
    capex_min_zar: parseFloat(min_capex.toFixed(2)),
    capex_max_zar: parseFloat(max_capex.toFixed(2)),
    opex_annual_zar: parseFloat(opex_annual.toFixed(2)),
  };
}
