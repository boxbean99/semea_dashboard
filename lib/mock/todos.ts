import type { Todo, Project } from "@/types";

// 이번 주: 2026-03-30 ~ 2026-04-05
export const MOCK_TODOS: Todo[] = [
  // ── 도영 (member1) ──────────────────────────────────────────
  { id: "t01", memberId: "member1", title: "이스탄불 W14 WoW 리포트 작성",         status: "in_progress", priority: "HIGH",   relatedCity: "istanbul",   dueDate: "2026-04-03", createdAt: "2026-03-30" },
  { id: "t02", memberId: "member1", title: "카파도키아 AIR_BALLOON CVR 분석",       status: "todo",        priority: "HIGH",   relatedCity: "cappadocia", dueDate: "2026-04-04", createdAt: "2026-03-30" },
  { id: "t03", memberId: "member1", title: "이스탄불 파트너 미팅 준비",             status: "done",        priority: "MID",    relatedCity: "istanbul",   dueDate: "2026-04-02", createdAt: "2026-03-30" },
  { id: "t04", memberId: "member1", title: "ME팀 주간 싱크 아젠다 작성",           status: "todo",        priority: "MID",                               dueDate: "2026-04-04", createdAt: "2026-03-30" },
  { id: "t05", memberId: "member1", title: "이스탄불 Q2 KPI 목표 재검토",           status: "todo",        priority: "LOW",    relatedCity: "istanbul",   dueDate: "2026-04-11", createdAt: "2026-03-30" },

  // ── 다현 (member2) ──────────────────────────────────────────
  { id: "t06", memberId: "member2", title: "바르셀로나 신규 상품 QA",               status: "todo",        priority: "HIGH",   relatedCity: "barcelona",  dueDate: "2026-04-03", createdAt: "2026-03-30" },
  { id: "t07", memberId: "member2", title: "마드리드 파트너 계약 갱신",             status: "in_progress", priority: "HIGH",   relatedCity: "madrid",     dueDate: "2026-04-05", createdAt: "2026-03-30" },
  { id: "t08", memberId: "member2", title: "스페인 4월 프로모션 기획",              status: "done",        priority: "MID",                               dueDate: "2026-04-02", createdAt: "2026-03-30" },
  { id: "t09", memberId: "member2", title: "세비야 CVR 개선 방안 정리",             status: "todo",        priority: "MID",    relatedCity: "seville",    dueDate: "2026-04-07", createdAt: "2026-03-30" },
  { id: "t10", memberId: "member2", title: "바르셀로나 WoW 리포트 공유",            status: "todo",        priority: "LOW",    relatedCity: "barcelona",  dueDate: "2026-04-04", createdAt: "2026-03-30" },

  // ── 도연 (member3) ──────────────────────────────────────────
  { id: "t11", memberId: "member3", title: "리스본 WoW 분석 공유",                  status: "done",        priority: "HIGH",   relatedCity: "lisbon",     dueDate: "2026-04-01", createdAt: "2026-03-30" },
  { id: "t12", memberId: "member3", title: "포르투 상품 가격 검토",                 status: "done",        priority: "HIGH",   relatedCity: "porto",      dueDate: "2026-04-03", createdAt: "2026-03-30" },
  { id: "t13", memberId: "member3", title: "포르투갈 Q2 KPI 세팅",                  status: "in_progress", priority: "MID",    relatedCity: "lisbon",     dueDate: "2026-04-05", createdAt: "2026-03-30" },
  { id: "t14", memberId: "member3", title: "리스본 신규 카테고리 조사",              status: "todo",        priority: "LOW",    relatedCity: "lisbon",     dueDate: "2026-04-08", createdAt: "2026-03-30" },

  // ── 수연 (member4) ──────────────────────────────────────────
  { id: "t15", memberId: "member4", title: "두바이 Q2 KPI 목표 설정",               status: "todo",        priority: "HIGH",   relatedCity: "dubai",      dueDate: "2026-04-03", createdAt: "2026-03-30" },
  { id: "t16", memberId: "member4", title: "카이로 채널별 유입 분석",               status: "in_progress", priority: "HIGH",   relatedCity: "cairo",      dueDate: "2026-04-04", createdAt: "2026-03-30" },
  { id: "t17", memberId: "member4", title: "아테네 파트너 온보딩",                  status: "done",        priority: "MID",    relatedCity: "athens",     dueDate: "2026-04-01", createdAt: "2026-03-30" },
  { id: "t18", memberId: "member4", title: "아부다비 상품 ASP 분석",                status: "todo",        priority: "MID",    relatedCity: "abudhabi",   dueDate: "2026-04-05", createdAt: "2026-03-30" },
  { id: "t19", memberId: "member4", title: "ME팀 월간 리포트 작성",                 status: "todo",        priority: "LOW",                               dueDate: "2026-04-10", createdAt: "2026-03-30" },

  // ── New! (member5) ──────────────────────────────────────────
  { id: "t20", memberId: "member5", title: "채용 포지션 공고 준비",                  status: "todo",        priority: "ALWAYS",                            createdAt: "2026-03-30" },
  { id: "t21", memberId: "member5", title: "신규 팀원 온보딩 자료 정리",             status: "todo",        priority: "LOW",                               dueDate: "2026-04-07", createdAt: "2026-03-30" },

  // ── CLAUDE (member6) ──────────────────────────────────────
  { id: "t22", memberId: "member6", title: "대시보드 Phase 2 구현",                 status: "in_progress", priority: "HIGH",                              dueDate: "2026-04-05", createdAt: "2026-03-30" },
  { id: "t23", memberId: "member6", title: "데이터 파이프라인 연동 검토",            status: "todo",        priority: "HIGH",                              dueDate: "2026-04-04", createdAt: "2026-03-30" },
  { id: "t24", memberId: "member6", title: "BigQuery 쿼리 최적화",                  status: "done",        priority: "MID",                               dueDate: "2026-04-02", createdAt: "2026-03-30" },
  { id: "t25", memberId: "member6", title: "Supabase 테이블 스키마 설계",           status: "done",        priority: "MID",                               dueDate: "2026-04-01", createdAt: "2026-03-30" },
  { id: "t26", memberId: "member6", title: "코드 리뷰 및 테스트 작성",              status: "todo",        priority: "LOW",                               dueDate: "2026-04-08", createdAt: "2026-03-30" },
];

export const MOCK_PROJECTS: Project[] = [
  { id: "p1", title: "SE&MEA Q2 KPI 대시보드 구축", priority: "HIGH", stage: "development", startDate: "2026-04-01", endDate: "2026-05-15", ownerId: "member1" },
  { id: "p2", title: "두바이 신규 카테고리 론칭",   priority: "HIGH", stage: "planning",     startDate: "2026-04-07", endDate: "2026-05-31", ownerId: "member4" },
  { id: "p3", title: "포르투갈 파트너 계약 갱신",   priority: "MID",  stage: "discussion",   startDate: "2026-03-24", endDate: "2026-04-18", ownerId: "member3" },
  { id: "p4", title: "유럽 상품 ASP 최적화",        priority: "MID",  stage: "discussion",   startDate: "2026-04-14", endDate: "2026-05-09", ownerId: "member2" },
  { id: "p5", title: "주간 보고 자동화",            priority: "LOW",  stage: "planning",     startDate: "2026-04-21", endDate: "2026-05-23", ownerId: "member6" },
];
