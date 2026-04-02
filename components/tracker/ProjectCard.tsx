import type { Project } from "@/types";
import { MEMBERS } from "@/config/members";

const PRIORITY_COLOR: Record<string, string> = {
  HIGH:   "#f87171",
  MID:    "#fbbf24",
  LOW:    "#60a5fa",
  ALWAYS: "#a78bfa",
};

function formatDate(d: string) {
  const [, mm, dd] = d.split("-");
  return `${parseInt(mm)}/${parseInt(dd)}`;
}

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const owner = MEMBERS.find(m => m.id === project.ownerId);

  return (
    <div style={{
      backgroundColor: "#111827",
      border: "1px solid #1e2d48",
      borderRadius: "8px",
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}>
      {/* Priority + Title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
        <span style={{
          fontSize: "10px",
          fontWeight: 700,
          color: PRIORITY_COLOR[project.priority] ?? "#7a8faa",
          flexShrink: 0,
          marginTop: "2px",
        }}>
          {project.priority}
        </span>
        <span style={{ fontSize: "13px", color: "#c8d6f0", fontWeight: 600, lineHeight: 1.4 }}>
          {project.title}
        </span>
      </div>

      {/* Owner + Date */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: owner?.avatarColor ?? "#4a5670",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: "11px", color: "#7a8faa" }}>{owner?.name ?? "?"}</span>
        </div>
        <span style={{ fontSize: "11px", color: "#4a5670" }}>
          {formatDate(project.startDate)} ~ {formatDate(project.endDate)}
        </span>
      </div>

      {project.description && (
        <div style={{ fontSize: "11px", color: "#4a5670", lineHeight: 1.5 }}>
          {project.description}
        </div>
      )}
    </div>
  );
}
