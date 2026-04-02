"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { CategoryMetrics } from "@/types";
import { formatKRW, formatPct, calcDelta } from "@/lib/utils/format";

interface Props { data: CategoryMetrics[]; }

const BAR_COLORS = ["#2dd4bf", "#60a5fa", "#a78bfa", "#fbbf24", "#f87171"];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: "#1a2540", border: "1px solid #263354", borderRadius: "6px", padding: "10px 14px" }}>
      <p style={{ color: "#e8edf8", fontWeight: 600, margin: 0 }}>{formatKRW(payload[0].value)}</p>
    </div>
  );
};

function Delta({ current, prev }: { current: number; prev?: number }) {
  const d = calcDelta(current, prev);
  if (d.neutral) return <span style={{ color: "#4a5a7a" }}>—</span>;
  return <span style={{ color: d.positive ? "#4ade80" : "#f87171", fontWeight: 600 }}>
    {d.positive ? "▲" : "▼"} {d.text}
  </span>;
}

const th: React.CSSProperties = {
  padding: "8px 12px", fontSize: "12px", fontWeight: 600,
  color: "#8899bb", textAlign: "right", whiteSpace: "nowrap",
  letterSpacing: "0.04em", textTransform: "uppercase",
};
const td: React.CSSProperties = {
  padding: "10px 12px", fontSize: "14px", color: "#e8edf8", textAlign: "right", whiteSpace: "nowrap",
};

export default function CategoryTab({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.gmv - a.gmv);
  const chartData = sorted.map(d => ({ name: d.category, gmv: d.gmv }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Bar chart */}
      <div>
        <p style={{ fontSize: "12px", fontWeight: 600, color: "#8899bb", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px" }}>
          카테고리별 거래액
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={100}
              tick={{ fill: "#8899bb", fontSize: 13 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(45,212,191,0.05)" }} />
            <Bar dataKey="gmv" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #263354" }}>
              <th style={{ ...th, textAlign: "left" }}>카테고리</th>
              <th style={th}>거래액</th>
              <th style={th}>확정 거래액</th>
              <th style={th}>CM율</th>
              <th style={th}>UV</th>
              <th style={th}>CVR</th>
              <th style={th}>예약수</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={row.category} style={{ borderBottom: "1px solid #1f2d4a" }}>
                <td style={{ ...td, textAlign: "left" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: BAR_COLORS[i % BAR_COLORS.length], flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{row.category}</span>
                  </span>
                </td>
                <td style={td}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                    <span style={{ fontWeight: 600 }}>{formatKRW(row.gmv)}</span>
                    <span style={{ fontSize: "12px" }}><Delta current={row.gmv} prev={row.prevGmv} /></span>
                  </div>
                </td>
                <td style={td}>{formatKRW(row.confirmGmv)}</td>
                <td style={td}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1px" }}>
                    <span style={{ fontWeight: 600 }}>{formatPct(row.cm)}</span>
                    <span style={{ fontSize: "12px" }}><Delta current={row.cm} prev={row.prevCm} /></span>
                  </div>
                </td>
                <td style={td}>{row.uv.toLocaleString()}</td>
                <td style={td}>{formatPct(row.cvr)}</td>
                <td style={td}>{row.orderCount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
