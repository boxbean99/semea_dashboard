"use client";
import { useState, useMemo } from "react";
import type { TimeScope, Region } from "@/types";
import { getMockCityMetrics } from "@/lib/mock/metrics";
import { CITIES } from "@/config/cities";
import DashboardControls from "./DashboardControls";
import TeamOverview from "./TeamOverview";
import CityDashboard from "./CityDashboard";

type View = "overview" | "city";

export default function DashboardClient() {
  const [view,   setView]   = useState<View>("overview");
  const [scope,  setScope]  = useState<TimeScope>("weekly");
  const [region, setRegion] = useState<"all" | Region>("all");

  const allMetrics = useMemo(() => {
    const all = getMockCityMetrics(scope);
    if (region === "all") return all;
    const ids = CITIES.filter(c => c.region === region).map(c => c.id);
    return all.filter(m => ids.includes(m.cityId));
  }, [scope, region]);

  return (
    <div>
      <DashboardControls
        view={view} scope={scope} region={region}
        onView={setView} onScope={setScope} onRegion={setRegion}
      />
      <div style={{ padding: "24px" }}>
        {view === "overview"
          ? <TeamOverview allMetrics={allMetrics} scope={scope} />
          : <CityDashboard scope={scope} region={region} />
        }
      </div>
    </div>
  );
}
