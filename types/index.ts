// ─── 도시 / 지역 ─────────────────────────────────────────
export type Region = "europe" | "me_africa";

export interface City {
  id: string;
  name: string;
  country: string;
  region: Region;
  available: boolean;
}

// ─── KPI 지표 ─────────────────────────────────────────────
export interface CityMetrics {
  cityId: string;
  period: string;       // "2025-W14" | "2025-03" | "2025-03-28"
  scopeType: TimeScope;

  gmv: number;
  confirmGmv: number;
  cfr: number;          // confirm rate (%)
  cm: number;           // CM %
  cmAmount: number;     // CM 원화
  uv: number;
  cvr: number;          // %
  orderCount: number;
  asp: number;

  // WoW 비교
  prevGmv?: number;
  prevConfirmGmv?: number;
  prevCm?: number;
  prevUv?: number;
  prevCvr?: number;
  prevOrderCount?: number;
  prevAsp?: number;
}

export type TimeScope = "monthly" | "weekly" | "daily";

export interface CategoryMetrics extends CityMetrics {
  category: string;
}

export interface ProductMetrics {
  productId: string;
  productName: string;
  cityId: string;
  category: string;
  gmv: number;
  confirmGmv: number;
  cm: number;
  uv: number;
  cvr: number;
  orderCount: number;
  asp: number;
  leadTime: number;
}

// ─── To-Do ────────────────────────────────────────────────
export type TodoStatus = "todo" | "in_progress" | "done";

export interface Todo {
  id: string;
  memberId: string;
  title: string;
  status: TodoStatus;
  priority: Priority;
  relatedCity?: string;
  dueDate?: string;
  createdAt: string;
}

// ─── Project Tracker ──────────────────────────────────────
export type Priority = "HIGH" | "MID" | "LOW" | "ALWAYS";
export type ProjectStage = "planning" | "discussion" | "development" | "closing";

export interface Project {
  id: string;
  title: string;
  priority: Priority;
  stage: ProjectStage;
  startDate: string;
  endDate: string;
  ownerId: string;
  description?: string;
}

// ─── 팀원 ─────────────────────────────────────────────────
export interface Member {
  id: string;
  name: string;
  role: string;
  cities: string[];
  avatarColor: string;
}
