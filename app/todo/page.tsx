"use client";
import { MEMBERS } from "@/config/members";
import { MOCK_TODOS } from "@/lib/mock/todos";
import MemberCard from "@/components/todo/MemberCard";
import AllTodoList from "@/components/todo/AllTodoList";

// 이번 주: 2026-03-30 ~ 2026-04-05
const WEEK_START = "2026-03-30";
const WEEK_END   = "2026-04-05";

function TeamProgressBar() {
  const weekTodos = MOCK_TODOS.filter(t => t.dueDate && t.dueDate >= WEEK_START && t.dueDate <= WEEK_END);
  const total = weekTodos.length;
  const done  = weekTodos.filter(t => t.status === "done").length;
  const inPrg = weekTodos.filter(t => t.status === "in_progress").length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  const inPrgPct = total > 0 ? Math.round((inPrg / total) * 100) : 0;

  return (
    <div style={{
      backgroundColor: "#1a2540",
      border: "1px solid #263354",
      borderRadius: "10px",
      padding: "18px 24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "10px" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#7a8faa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "3px" }}>
            팀 전체 이번 주 TDL 달성률
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span style={{ fontSize: "28px", fontWeight: 700, color: pct >= 80 ? "#4ade80" : pct >= 40 ? "#fbbf24" : "#e8edf8" }}>
              {pct}%
            </span>
            <div style={{ display: "flex", gap: "10px" }}>
              <span style={{ fontSize: "12px", color: "#4ade80" }}>완료 {done}</span>
              <span style={{ fontSize: "12px", color: "#fbbf24" }}>진행 중 {inPrg}</span>
              <span style={{ fontSize: "12px", color: "#7a8faa" }}>전체 {total}</span>
            </div>
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "#4a5670" }}>
          2026 W14 (3/30~4/5)
        </span>
      </div>

      {/* 레벨업 바 */}
      <div style={{
        width: "100%",
        height: "14px",
        backgroundColor: "#0d1117",
        borderRadius: "3px",
        border: "1px solid #263354",
        overflow: "hidden",
        position: "relative",
      }}>
        {/* 완료 fill */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${pct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #4ade80, #22c55e)",
          transition: "width 0.5s ease",
          zIndex: 1,
        }} />
        {/* 진행 중 fill */}
        <div style={{
          position: "absolute",
          left: `${pct}%`,
          top: 0,
          width: `${inPrgPct}%`,
          height: "100%",
          background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
          transition: "width 0.5s ease",
          zIndex: 1,
        }} />
        {/* 세그먼트 구분선 */}
        {total > 1 && Array.from({ length: total - 1 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${((i + 1) / total) * 100}%`,
            top: 0,
            width: "1px",
            height: "100%",
            backgroundColor: "#1a2540",
            zIndex: 2,
          }} />
        ))}
      </div>

      {/* 범례 */}
      <div style={{ display: "flex", gap: "14px", marginTop: "8px" }}>
        {[
          { color: "#4ade80", label: "완료" },
          { color: "#fbbf24", label: "진행 중" },
          { color: "#1a2540", label: "미완료", border: "1px solid #263354" },
        ].map(({ color, label, border }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "10px", height: "10px", backgroundColor: color, borderRadius: "2px", border }} />
            <span style={{ fontSize: "11px", color: "#7a8faa" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TodoPage() {
  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* 3×2 멤버 카드 그리드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
      }}>
        {MEMBERS.map(member => (
          <MemberCard key={member.id} member={member} todos={MOCK_TODOS} />
        ))}
      </div>

      {/* 팀 전체 달성률 바 */}
      <TeamProgressBar />

      {/* 전체 TDL 리스트 */}
      <AllTodoList todos={MOCK_TODOS} members={MEMBERS} />
    </div>
  );
}
