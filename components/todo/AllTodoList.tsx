"use client";
import { useState } from "react";
import type { Todo, Member } from "@/types";
import { getCityById } from "@/config/cities";

const PAGE_SIZE = 15;

const PRIORITY_ORDER: Record<string, number> = { HIGH: 0, MID: 1, LOW: 2, ALWAYS: 3 };
const PRIORITY_COLOR: Record<string, string>  = { HIGH: "#f87171", MID: "#fbbf24", LOW: "#60a5fa", ALWAYS: "#a78bfa" };
const STATUS_LABEL:   Record<string, string>  = { todo: "할 일", in_progress: "진행 중", done: "완료" };
const STATUS_COLOR:   Record<string, string>  = { todo: "#4a5670", in_progress: "#fbbf24", done: "#4ade80" };

function sortTodos(todos: Todo[], members: Member[]): Todo[] {
  const nameOf = (id: string) => members.find(m => m.id === id)?.name ?? "z";
  return [...todos].sort((a, b) => {
    const pDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    if (pDiff !== 0) return pDiff;
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    if (a.dueDate && b.dueDate) {
      const dDiff = a.dueDate.localeCompare(b.dueDate);
      if (dDiff !== 0) return dDiff;
    }
    return nameOf(a.memberId).localeCompare(nameOf(b.memberId), "ko");
  });
}

interface Props {
  todos: Todo[];
  members: Member[];
}

export default function AllTodoList({ todos, members }: Props) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sorted = sortTodos(todos, members);
  const shown  = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <span style={{ fontSize: "11px", fontWeight: 600, color: "#7a8faa", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          전체 To-Do 목록 ({sorted.length}개)
        </span>
        <span style={{ fontSize: "12px", color: "#4a5670" }}>
          우선순위 높은순 &gt; 마감일 임박 순 &gt; 가나다 순
        </span>
      </div>

      {/* Column header */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr 80px 90px 80px 80px",
        gap: "0 8px",
        padding: "6px 12px",
        backgroundColor: "#151d2e",
        borderRadius: "6px 6px 0 0",
        border: "1px solid #263354",
        borderBottom: "none",
      }}>
        {["담당자", "내용", "상태", "관련 도시", "마감일", "우선순위"].map(h => (
          <span key={h} style={{ fontSize: "11px", fontWeight: 600, color: "#7a8faa", letterSpacing: "0.04em" }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div style={{
        border: "1px solid #263354",
        borderRadius: "0 0 8px 8px",
        overflow: "hidden",
      }}>
        {shown.map((todo, i) => {
          const member = members.find(m => m.id === todo.memberId);
          const isDone = todo.status === "done";
          const isLast = i === shown.length - 1;
          return (
            <div key={todo.id} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px 90px 80px 80px",
              gap: "0 8px",
              padding: "10px 12px",
              backgroundColor: i % 2 === 0 ? "#1a2540" : "#172035",
              borderBottom: isLast ? "none" : "1px solid #1e2d48",
              alignItems: "center",
              opacity: isDone ? 0.55 : 1,
            }}>
              {/* 담당자 */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  backgroundColor: member?.avatarColor ?? "#4a5670",
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "13px", color: "#c8d6f0", fontWeight: 500 }}>
                  {member?.name ?? "—"}
                </span>
              </div>

              {/* 내용 */}
              <span style={{
                fontSize: "13px",
                color: isDone ? "#7a8faa" : "#e8edf8",
                textDecoration: isDone ? "line-through" : "none",
                fontWeight: isDone ? 400 : 500,
              }}>
                {todo.title}
              </span>

              {/* 상태 */}
              <span style={{
                fontSize: "11px",
                padding: "2px 7px",
                borderRadius: "10px",
                backgroundColor: `${STATUS_COLOR[todo.status]}22`,
                color: STATUS_COLOR[todo.status],
                fontWeight: 600,
                display: "inline-block",
              }}>
                {STATUS_LABEL[todo.status]}
              </span>

              {/* 관련 도시 */}
              <span style={{ fontSize: "12px", color: "#7a8faa" }}>
                {todo.relatedCity ? (getCityById(todo.relatedCity)?.name ?? todo.relatedCity) : "—"}
              </span>

              {/* 마감일 */}
              <span style={{ fontSize: "12px", color: "#7a8faa" }}>
                {todo.dueDate ? todo.dueDate.slice(5).replace("-", "/") : "—"}
              </span>

              {/* 우선순위 */}
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                color: PRIORITY_COLOR[todo.priority],
              }}>
                {todo.priority}
              </span>
            </div>
          );
        })}
      </div>

      {/* 더보기 */}
      {hasMore && (
        <button
          onClick={() => setVisible(v => v + PAGE_SIZE)}
          style={{
            marginTop: "4px",
            padding: "9px",
            width: "100%",
            backgroundColor: "#1a2540",
            border: "1px solid #263354",
            borderRadius: "6px",
            color: "#a0b0cc",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#2dd4bf"; (e.currentTarget as HTMLButtonElement).style.color = "#2dd4bf"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#263354"; (e.currentTarget as HTMLButtonElement).style.color = "#a0b0cc"; }}
        >
          더보기 ({sorted.length - visible}개 남음)
        </button>
      )}
    </div>
  );
}
