import type { Todo, Project } from "@/types";

export const MOCK_TODOS: Todo[] = [
  { id: "t1", memberId: "member1", title: "이스탄불 주간 보고 작성", status: "in_progress", priority: "HIGH", relatedCity: "istanbul", dueDate: "2025-04-04", createdAt: "2025-04-01" },
  { id: "t2", memberId: "member1", title: "카파도키아 AIR_BALLOON CVR 분석", status: "todo", priority: "MID", relatedCity: "cappadocia", createdAt: "2025-04-01" },
  { id: "t3", memberId: "member2", title: "바르셀로나 신규 파트너 온보딩", status: "todo", priority: "HIGH", relatedCity: "barcelona", dueDate: "2025-04-07", createdAt: "2025-04-01" },
  { id: "t4", memberId: "member2", title: "마드리드 가격 정책 검토", status: "done", priority: "MID", relatedCity: "madrid", createdAt: "2025-03-28" },
  { id: "t5", memberId: "member3", title: "리스본 WoW 리포트 공유", status: "in_progress", priority: "HIGH", relatedCity: "lisbon", createdAt: "2025-04-01" },
  { id: "t6", memberId: "member3", title: "포르투 상품 QA", status: "todo", priority: "LOW", relatedCity: "porto", createdAt: "2025-04-01" },
  { id: "t7", memberId: "member4", title: "두바이 Q2 KPI 목표 설정", status: "todo", priority: "HIGH", relatedCity: "dubai", dueDate: "2025-04-05", createdAt: "2025-04-01" },
  { id: "t8", memberId: "member4", title: "카이로 채널별 유입 분석", status: "todo", priority: "MID", relatedCity: "cairo", createdAt: "2025-04-01" },
];

export const MOCK_PROJECTS: Project[] = [
  { id: "p1", title: "SE&MEA Q2 KPI 대시보드 구축", priority: "HIGH", stage: "development", startDate: "2025-04-01", endDate: "2025-05-15", ownerId: "member1" },
  { id: "p2", title: "두바이 신규 카테고리 론칭", priority: "HIGH", stage: "planning", startDate: "2025-04-07", endDate: "2025-05-31", ownerId: "member4" },
  { id: "p3", title: "포르투갈 파트너 계약 갱신", priority: "MID", stage: "discussion", startDate: "2025-03-24", endDate: "2025-04-18", ownerId: "member3" },
  { id: "p4", title: "유럽 상품 ASP 최적화", priority: "MID", stage: "discussion", startDate: "2025-04-14", endDate: "2025-05-09", ownerId: "member2" },
  { id: "p5", title: "주간 보고 자동화", priority: "LOW", stage: "planning", startDate: "2025-04-21", endDate: "2025-05-23", ownerId: "member1" },
];
