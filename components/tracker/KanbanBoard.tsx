import type { ProjectStage } from "@/types";
import { MOCK_PROJECTS } from "@/lib/mock/todos";
import ProjectCard from "./ProjectCard";

const STAGES: { id: ProjectStage; label: string; color: string }[] = [
  { id: "planning",    label: "PLANNING",    color: "#60a5fa" },
  { id: "discussion",  label: "DISCUSSION",  color: "#fbbf24" },
  { id: "development", label: "DEVELOPMENT", color: "#4ade80" },
  { id: "closing",     label: "CLOSING",     color: "#a78bfa" },
];

export default function KanbanBoard() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px",
      alignItems: "start",
    }}>
      {STAGES.map(stage => {
        const projects = MOCK_PROJECTS.filter(p => p.stage === stage.id);
        return (
          <div key={stage.id} style={{
            backgroundColor: "#1a2540",
            border: "1px solid #263354",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            {/* Column header */}
            <div style={{
              padding: "10px 14px",
              borderBottom: "1px solid #263354",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#111827",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{
                  width: "3px",
                  height: "14px",
                  backgroundColor: stage.color,
                  borderRadius: "2px",
                }} />
                <span style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: stage.color,
                  letterSpacing: "0.08em",
                }}>
                  {stage.label}
                </span>
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                color: projects.length > 0 ? "#e8edf8" : "#4a5670",
                backgroundColor: "#1a2540",
                padding: "1px 7px",
                borderRadius: "10px",
                border: "1px solid #263354",
              }}>
                {projects.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minHeight: "80px",
            }}>
              {projects.length === 0 ? (
                <div style={{ fontSize: "12px", color: "#4a5670", textAlign: "center", padding: "20px 0" }}>
                  —
                </div>
              ) : (
                projects.map(p => <ProjectCard key={p.id} project={p} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
