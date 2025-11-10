// src/lib/useNeighbourhood.js
"use client";

import { useMemo } from "react";

/**
 * Demo neighbourhood detector.
 * Priority:
 *  1) URL querystring `?area=Randpark%20Ridge`
 *  2) Intl timezone guess (very naive)
 *  3) default to first suburb in the list
 *
 * Returns { suburb, seedIndex }
 */

export default function useNeighbourhood({ suburbs = [] } = {}) {
  return useMemo(() => {
    // 1) querystring
    let suburb = null;
    try {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : null;
      const q = params?.get("area");
      if (q) {
        // try to find matching suburb (case-insensitive)
        const match = suburbs.find(
          (s) =>
            s.toLowerCase().replace(/\s+/g, "-") ===
              q.toLowerCase().replace(/\s+/g, "-") ||
            s.toLowerCase() === q.toLowerCase()
        );
        if (match) suburb = match;
      }
    } catch (e) {
      // ignore
    }

    // 2) timezone heuristic (demo)
    if (!suburb) {
      try {
        const tz = Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone || "";
        if (tz.includes("Johannesburg") || tz.includes("Africa")) {
          // choose a default Joburg suburb if present in list
          const candidates = [
            "Randburg",
            "Ferndale",
            "Northcliff",
            "Randpark Ridge",
            "Sandton",
            "Fourways",
            "Bryanston",
          ];
          suburb = suburbs.find((s) =>
            candidates.map((c) => c.toLowerCase()).includes(s.toLowerCase())
          );
        }
      } catch (e) {
        // ignore
      }
    }

    // 3) fallback
    if (!suburb && suburbs.length > 0) suburb = suburbs[0];

    // seed index for deterministic fake stats
    const seedIndex = suburbs.indexOf(suburb);
    return { suburb, seedIndex: seedIndex >= 0 ? seedIndex : 0 };
  }, [suburbs]);
}

