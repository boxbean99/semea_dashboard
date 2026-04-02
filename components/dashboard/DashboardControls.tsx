"use client";
import type { TimeScope } from "@/types";

type View = "overview" | "city";

interface Props {
  view: View;
  scope: TimeScope;
  onView:  (v: View) => void;
  onScope: (s: TimeScope) => void;
}

function SegmentBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: "5px 14px",
      fontSize: "13px",
      fontWeight: active ? 700 : 500,
      letterSpacing: "0.05em",
      color: active ? "#0d1117" : "#a0b0cc",
      backgroundColor: active ? "#2dd4bf" : "transparent",
      border: "1px solid",
      borderColor: active ? "#2dd4bf" : "#2e3d63",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.15s",
      fontFamily: "inherit",
    }}>
      {children}
    </button>
  );
}

export default function DashboardControls({ view, scope, onView, onScope }: Props) {
  return (
    <div style={{
      backgroundColor: "#151d2e",
      borderBottom: "1px solid #263354",
      padding: "8px 24px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
    }}>
      {/* View toggle: Overview / City Detail */}
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

      {/* Period label */}
      <div style={{ marginLeft: "auto", fontSize: "13px", fontWeight: 500, color: "#7a8faa" }}>
        {{ monthly: "2025년 3월", weekly: "2025 W14 (3/31~4/6)", daily: "2025-04-01 기준" }[scope]}
      </div>
    </div>
  );
}
