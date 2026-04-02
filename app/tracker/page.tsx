import { MOCK_PROJECTS } from "@/lib/mock/todos";
import KanbanBoard from "@/components/tracker/KanbanBoard";

const STAGE_META = [
  { id: "planning",    label: "Planning",    color: "#60a5fa" },
  { id: "discussion",  label: "Discussion",  color: "#fbbf24" },
  { id: "development", label: "Development", color: "#4ade80" },
  { id: "closing",     label: "Closing",     color: "#a78bfa" },
] as const;

export default function TrackerPage() {
  const total = MOCK_PROJECTS.length;

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div style={{
        backgroundColor: "#1a2540",
        border: "1px solid #263354",
        borderRadius: "10px",
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div>
          <div style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#7a8faa",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>
            PROJECT TRACKER
          </div>
          <div style={{ fontSize: "22px", fontWeight: 700, color: "#e8edf8" }}>
            {total}개 프로젝트 진행 중
          </div>
        </div>

        {/* Stage summary */}
        <div style={{ display: "flex", gap: "24px" }}>
          {STAGE_META.map(({ id, label, color }) => {
            const count = MOCK_PROJECTS.filter(p => p.stage === id).length;
            return (
              <div key={id} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 700, color: count > 0 ? color : "#4a5670" }}>
                  {count}
                </div>
                <div style={{ fontSize: "10px", color: "#7a8faa", letterSpacing: "0.04em", marginTop: "2px" }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban Board */}
      <KanbanBoard />
    </div>
  );
}
