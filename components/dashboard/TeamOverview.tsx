import type { CityMetrics, TimeScope } from "@/types";
import { aggregateMetrics, KPI_DEFS } from "@/lib/utils/kpi";
import KpiCard from "@/components/ui/KpiCard";
import RegionSplitTable from "./RegionSplitTable";

interface Props { allMetrics: CityMetrics[]; scope: TimeScope; }

const SPARKLINE_KEYS: Record<string, string> = {
  gmv: "sparklineGmv", confirmGmv: "sparklineGmv",
  uv: "sparklineUv", cvr: "sparklineCvr",
};

export default function TeamOverview({ allMetrics, scope }: Props) {
  if (!allMetrics.length) return null;
  const agg = aggregateMetrics(allMetrics) as CityMetrics & Record<string, number>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Title */}
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#e8edf8", margin: 0 }}>
          남부유럽팀 누적 지표
        </h2>
        <p style={{ fontSize: "13px", color: "#7a8faa", margin: "4px 0 0" }}>
          {allMetrics.length}개 도시 합산
        </p>
      </div>

      {/* KPI Grid — 4×2 고정 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
      }}>
        {KPI_DEFS.map(def => {
          const sparkKey = SPARKLINE_KEYS[def.key];
          const raw = sparkKey ? agg[sparkKey] : undefined;
          const sparkData = Array.isArray(raw) ? (raw as number[]) : undefined;
          return (
            <KpiCard
              key={def.key}
              def={def}
              metrics={agg}
              scope={scope}
              sparklineData={sparkData}
            />
          );
        })}
      </div>

      {/* Region split */}
      <RegionSplitTable allMetrics={allMetrics} />
    </div>
  );
}
