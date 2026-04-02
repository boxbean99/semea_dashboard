"use client";
import type { Todo, Member } from "@/types";
import PixelAvatar from "./PixelAvatar";
import { getCityById } from "@/config/cities";

// 이번 주: 2026-03-30 ~ 2026-04-05
const WEEK_START = "2026-03-30";
const WEEK_END   = "2026-04-05";

const PRIORITY_COLOR: Record<string, string> = {
  HIGH:   "#f87171",
  MID:    "#fbbf24",
  LOW:    "#60a5fa",
  ALWAYS: "#a78bfa",
};

const STATUS_LABEL: Record<string, string> = {
  todo:        "할 일",
  in_progress: "진행 중",
  done:        "완료",
};
const STATUS_COLOR: Record<string, string> = {
  todo:        "#4a5670",
  in_progress: "#fbbf24",
  done:        "#4ade80",
};

function isThisWeek(todo: Todo) {
  if (!todo.dueDate) return false;
  return todo.dueDate >= WEEK_START && todo.dueDate <= WEEK_END;
}

interface Props {
  member: Member;
  todos: Todo[];
}

export default function MemberCard({ member, todos }: Props) {
  const myTodos = todos.filter(t => t.memberId === member.id);
  const weekTodos = myTodos.filter(isThisWeek);
  const doneCnt  = weekTodos.filter(t => t.status === "done").length;
  const total    = weekTodos.length;
  const pct      = total > 0 ? Math.round((doneCnt / total) * 100) : 0;

  // 마감일 임박한 순 top3 (미완료 우선, null 마감 마지막)
  const topTodos = [...myTodos]
    .filter(t => t.status !== "done")
    .sort((a, b) => {
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      return 0;
    })
    .slice(0, 3);

  const isNew = member.id === "member5";

  return (
    <div style={{
      backgroundColor: "#1a2540",
      border: "1px solid #263354",
      borderRadius: "10px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Avatar area */}
      <div style={{
        backgroundColor: "#111827",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 16px 14px",
        gap: "8px",
        borderBottom: "1px solid #263354",
      }}>
        <div style={{
          width: "60px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <PixelAvatar memberId={member.id} scale={1} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#e8edf8" }}>{member.name}</div>
          <div style={{ fontSize: "12px", color: "#7a8faa", marginTop: "2px" }}>{member.role}</div>
        </div>

        {/* 레벨업 스타일 구수바 */}
        <div style={{ width: "100%", marginTop: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "11px", color: "#7a8faa", fontWeight: 600 }}>이번 주 달성률</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: pct >= 100 ? "#4ade80" : pct > 0 ? "#fbbf24" : "#7a8faa" }}>
              {total === 0 ? "—" : `${doneCnt}/${total} (${pct}%)`}
            </span>
          </div>
          {/* Bar track */}
          <div style={{
            width: "100%",
            height: "10px",
            backgroundColor: "#0d1117",
            borderRadius: "2px",
            border: "1px solid #263354",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Segment ticks */}
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
            {/* Fill */}
            <div style={{
              width: `${pct}%`,
              height: "100%",
              background: pct >= 100
                ? "linear-gradient(90deg, #4ade80, #22c55e)"
                : pct > 0
                  ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                  : "transparent",
              borderRadius: "1px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>
      </div>

      {/* Top 3 todos */}
      <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
        {topTodos.length === 0 && (
          <div style={{ fontSize: "12px", color: "#4a5670", textAlign: "center", padding: "12px 0" }}>
            {isNew ? "팀원을 기다리는 중..." : "모든 할 일 완료 🎉"}
          </div>
        )}
        {topTodos.map(todo => (
          <div key={todo.id} style={{
            backgroundColor: "#111827",
            border: "1px solid #1e2d48",
            borderRadius: "6px",
            padding: "7px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}>
            {/* Title + Priority */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
              <span style={{
                fontSize: "10px",
                fontWeight: 700,
                color: PRIORITY_COLOR[todo.priority],
                flexShrink: 0,
                marginTop: "1px",
              }}>
                {todo.priority}
              </span>
              <span style={{ fontSize: "12px", color: "#c8d6f0", fontWeight: 500, lineHeight: 1.4 }}>
                {todo.title}
              </span>
            </div>
            {/* Status + City + Due */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "10px",
                padding: "1px 6px",
                borderRadius: "10px",
                backgroundColor: `${STATUS_COLOR[todo.status]}22`,
                color: STATUS_COLOR[todo.status],
                fontWeight: 600,
              }}>
                {STATUS_LABEL[todo.status]}
              </span>
              {todo.relatedCity && (
                <span style={{ fontSize: "10px", color: "#7a8faa" }}>
                  {getCityById(todo.relatedCity)?.name ?? todo.relatedCity}
                </span>
              )}
              {todo.dueDate && (
                <span style={{ fontSize: "10px", color: "#4a5670", marginLeft: "auto" }}>
                  ~{todo.dueDate.slice(5)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
