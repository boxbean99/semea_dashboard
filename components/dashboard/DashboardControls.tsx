"use client";
import type { TimeScope, Region } from "@/types";

type View = "overview" | "city";

interface Props {
  view: View;
  scope: TimeScope;
  region: "all" | Region;
  onView:   (v: View) => void;
  onScope:  (s: TimeScope) => void;
  onRegion: (r: "all" | Region) => void;
}

function SegmentBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 14px",
      fontSize: "12px",
      fontWeight: active ? 700 : 500,
      letterSpacing: "0.05em",
      color: active ? "#0d1117" : "#8899bb",
      backgroundColor: active ? "#2dd4bf" : "transparent",
      border: "1px solid",
      borderColor: active ? "#2dd4bf" : "#263354",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.15s",
      fontFamily: "inherit",
    }}>
      {children}
    </button>
  );
}

export default function DashboardControls({ view, scope, region, onView, onScope, onRegion }: Props) {
  return (
    <div style={{
      backgroundColor: "#151d2e",
      borderBottom: "1px solid #263354",
      padding: "10px 24px",
      display: "flex",
      alignItems: "center",
      gap: "24px",
      flexWrap: "wrap",
    }}>
      {/* View toggle */}
      <div style={{ display: "flex", gap: "4px" }}>
        <SegmentBtn active={view === "overview"} onClick={() => onView("overview")}>OVERVIEW</SegmentBtn>
        <SegmentBtn active={view === "city"}     onClick={() => onView("city")}>CITY DETAIL</SegmentBtn>
      </div>

      <div style={{ width: "1px", height: "20px", backgroundColor: "#263354" }} />

      {/* Time scope */}
      <div style={{ display: "flex", gap: "4px" }}>
        {(["monthly", "weekly", "daily"] as TimeScope[]).map(s => (
          <SegmentBtn key={s} active={scope === s} onClick={() => onScope(s)}>
            {{ monthly: "월간", weekly: "주간", daily: "일간" }[s]}
          </SegmentBtn>
        ))}
      </div>

      <div style={{ width: "1px", height: "20px", backgroundColor: "#263354" }} />

      {/* Region filter */}
      <div style={{ display: "flex", gap: "4px" }}>
        {([["all", "전체"], ["europe", "Europe"], ["me_africa", "ME·Africa"]] as [string, string][]).map(([r, label]) => (
          <SegmentBtn key={r} active={region === r} onClick={() => onRegion(r as "all" | Region)}>
            {label}
          </SegmentBtn>
        ))}
      </div>

      {/* Period label */}
      <div style={{ marginLeft: "auto", fontSize: "12px", color: "#4a5a7a" }}>
        {{ monthly: "2025년 3월", weekly: "2025 W14 (3/31~4/6)", daily: "2025-04-01 기준" }[scope]}
      </div>
    </div>
  );
}
