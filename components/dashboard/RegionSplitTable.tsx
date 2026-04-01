import type { CityMetrics } from "@/types";
import { CITIES } from "@/config/cities";
import { aggregateMetrics } from "@/lib/utils/kpi";
import { formatKRW, formatPct, formatNum, calcDelta } from "@/lib/utils/format";

interface Props { allMetrics: CityMetrics[]; }

function Delta({ current, prev }: { current: number; prev?: number }) {
  const d = calcDelta(current, prev);
  if (d.neutral) return <span style={{ color: "#4a5a7a" }}>—</span>;
  return <span style={{ color: d.positive ? "#4ade80" : "#f87171", fontSize: "11px", fontWeight: 600 }}>
    {d.positive ? "▲" : "▼"} {d.text}
  </span>;
}

export default function RegionSplitTable({ allMetrics }: Props) {
  const europeIds   = CITIES.filter(c => c.region === "europe").map(c => c.id);
  const meAfricaIds = CITIES.filter(c => c.region === "me_africa").map(c => c.id);

  const europeMetrics   = allMetrics.filter(m => europeIds.includes(m.cityId));
  const meAfricaMetrics = allMetrics.filter(m => meAfricaIds.includes(m.cityId));

  const rows = [
    { label: "Europe",     agg: aggregateMetrics(europeMetrics),   color: "#60a5fa" },
    { label: "ME·Africa",  agg: aggregateMetrics(meAfricaMetrics), color: "#f59e0b" },
  ] as const;

  const th: React.CSSProperties = {
    padding: "8px 12px", fontSize: "11px", fontWeight: 600,
    color: "#8899bb", textAlign: "right", whiteSpace: "nowrap",
    letterSpacing: "0.04em", textTransform: "uppercase",
  };
  const td: React.CSSProperties = {
    padding: "10px 12px", fontSize: "13px", fontWeight: 600,
    color: "#e8edf8", textAlign: "right", whiteSpace: "nowrap",
  };
  const subTd: React.CSSProperties = { ...td, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" };

  return (
    <div style={{ backgroundColor: "#1a2540", border: "1px solid #263354", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid #263354" }}>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#8899bb", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          지역별 분할
        </span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #263354" }}>
              <th style={{ ...th, textAlign: "left" }}>지역</th>
              <th style={th}>거래액</th>
              <th style={th}>확정 거래액</th>
              <th style={th}>공헌이익</th>
              <th style={th}>CM율</th>
              <th style={th}>UV</th>
              <th style={th}>CVR</th>
              <th style={th}>예약수</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, agg, color }) => (
              <tr key={label} style={{ borderBottom: "1px solid #1f2d4a" }}>
                <td style={{ ...td, textAlign: "left" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: color, display: "inline-block" }} />
                    {label}
                  </span>
                </td>
                <td style={{ ...td }}>
                  <div style={subTd}>
                    <span>{formatKRW(agg.gmv)}</span>
                    <Delta current={agg.gmv} prev={agg.prevGmv} />
                  </div>
                </td>
                <td><div style={subTd}><span>{formatKRW(agg.confirmGmv)}</span><Delta current={agg.confirmGmv} prev={agg.prevConfirmGmv} /></div></td>
                <td><div style={subTd}><span>{formatKRW(agg.cmAmount)}</span></div></td>
                <td><div style={subTd}><span>{formatPct(agg.cm)}</span><Delta current={agg.cm} prev={agg.prevCm} /></div></td>
                <td><div style={subTd}><span>{formatNum(agg.uv)}</span><Delta current={agg.uv} prev={agg.prevUv} /></div></td>
                <td><div style={subTd}><span>{formatPct(agg.cvr)}</span><Delta current={agg.cvr} prev={agg.prevCvr} /></div></td>
                <td><div style={subTd}><span>{formatNum(agg.orderCount)}</span><Delta current={agg.orderCount} prev={agg.prevOrderCount} /></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
