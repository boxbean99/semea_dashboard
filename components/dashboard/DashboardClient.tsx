"use client";
import { useState, useMemo } from "react";
import type { TimeScope } from "@/types";
import { getMockCityMetrics } from "@/lib/mock/metrics";
import DashboardControls from "./DashboardControls";
import TeamOverview from "./TeamOverview";
import CityDashboard from "./CityDashboard";

type View = "overview" | "city";

export default function DashboardClient() {
  const [view,  setView]  = useState<View>("overview");
  const [scope, setScope] = useState<TimeScope>("weekly");

  const allMetrics = useMemo(() => getMockCityMetrics(scope), [scope]);

  return (
    <div>
      <DashboardControls
        view={view} scope={scope}
        onView={setView} onScope={setScope}
      />
      <div style={{ padding: "24px" }}>
        {view === "overview"
          ? <TeamOverview allMetrics={allMetrics} scope={scope} />
          : <CityDashboard scope={scope} />
        }
      </div>
    </div>
  );
}
