import type { CityMetrics, TimeScope } from "@/types";
import type { KpiDef } from "@/lib/utils/kpi";
import { formatKRW, formatNum, formatPct, calcDelta, calcPctDelta, comparisonLabel } from "@/lib/utils/format";
import Sparkline from "./Sparkline";

interface Props {
  def: KpiDef;
  metrics: CityMetrics & Record<string, number>;
  scope: TimeScope;
  sparklineData?: number[];
}

const DELTA_COLOR = {
  pos:     "#4ade80",
  neg:     "#f87171",
  neutral: "#8899bb",
};

function Arrow({ positive, neutral }: { positive: boolean; neutral: boolean }) {
  if (neutral) return <span style={{ color: DELTA_COLOR.neutral }}>—</span>;
  return <span style={{ color: positive ? DELTA_COLOR.pos : DELTA_COLOR.neg }}>
    {positive ? "▲" : "▼"}
  </span>;
}

function DeltaBadge({ label, text, positive, neutral }: { label: string; text: string; positive: boolean; neutral: boolean }) {
  const color = neutral ? DELTA_COLOR.neutral : positive ? DELTA_COLOR.pos : DELTA_COLOR.neg;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px" }}>
      <Arrow positive={positive} neutral={neutral} />
      <span style={{ color, fontWeight: 600 }}>{text}</span>
      <span style={{ color: "#4a5a7a" }}>{label}</span>
    </div>
  );
}

export default function KpiCard({ def, metrics, scope, sparklineData }: Props) {
  const value = def.getValue(metrics);
  const prev  = def.getPrev(metrics);
  const delta = def.isPctPoint ? calcPctDelta(value, prev) : calcDelta(value, prev);
  const label = comparisonLabel(scope);

  // 일간: 전주 동요일 추가 비교
  let deltaW: ReturnType<typeof calcDelta> | null = null;
  if (scope === "daily") {
    const prevWKey = `prevWeekSameDay${def.key.charAt(0).toUpperCase()}${def.key.slice(1)}` as keyof typeof metrics;
    const prevW = metrics[prevWKey] as number | undefined;
    if (prevW !== undefined) {
      deltaW = def.isPctPoint ? calcPctDelta(value, prevW) : calcDelta(value, prevW);
    }
  }

  const formatted =
    def.format === "krw" ? formatKRW(value) :
    def.format === "pct" ? formatPct(value) :
    formatNum(value);

  return (
    <div style={{
      backgroundColor: "#1a2540",
      border: "1px solid #263354",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      minWidth: 0,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#8899bb", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {def.label}
        </span>
        {sparklineData && <Sparkline data={sparklineData} width={72} height={28} />}
      </div>

      {/* Main value */}
      <div style={{ fontSize: "22px", fontWeight: 700, color: "#e8edf8", lineHeight: 1.2 }}>
        {formatted}
      </div>

      {/* Delta(s) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <DeltaBadge label={label} text={delta.text} positive={delta.positive} neutral={delta.neutral} />
        {deltaW && (
          <DeltaBadge label="vs 전주 동요일" text={deltaW.text} positive={deltaW.positive} neutral={deltaW.neutral} />
        )}
      </div>
    </div>
  );
}
