import type { CityMetrics, CategoryMetrics, ProductMetrics, TimeScope } from "@/types";
import { CITIES } from "@/config/cities";

// ── 숫자 헬퍼 ──────────────────────────────────────────────
const rnd = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));
const rndF = (min: number, max: number, decimals = 1) =>
  parseFloat((min + Math.random() * (max - min)).toFixed(decimals));

// ── 도시별 스케일 (실제 규모 반영) ────────────────────────
const SCALE: Record<string, number> = {
  istanbul: 5, cappadocia: 3, barcelona: 4, madrid: 3,
  lisbon: 3, porto: 2, dubai: 4, abudhabi: 2,
  athens: 2, santorini: 2, seville: 1, granada: 1,
  majorca: 1, cairo: 1,
};

function makeMetrics(cityId: string, period: string, scope: TimeScope): CityMetrics {
  const s = SCALE[cityId] ?? 1;
  const base = s * 10_000_000;

  const gmv = rnd(base * 0.8, base * 1.2);
  const cfr = rndF(55, 85);
  const confirmGmv = Math.round(gmv * (cfr / 100));
  const cm = rndF(8, 22);
  const uv = rnd(s * 800, s * 2000);
  const orderCount = rnd(s * 30, s * 120);
  const asp = Math.round(gmv / orderCount);
  const cvr = rndF(1.5, 8.0);

  return {
    cityId, period, scopeType: scope,
    gmv, confirmGmv, cfr, cm,
    cmAmount: Math.round(confirmGmv * cm / 100),
    uv, cvr, orderCount, asp,
    prevGmv: Math.round(gmv * rndF(0.85, 1.15)),
    prevConfirmGmv: Math.round(confirmGmv * rndF(0.85, 1.15)),
    prevCm: rndF(8, 22),
    prevUv: rnd(s * 800, s * 2000),
    prevCvr: rndF(1.5, 8.0),
    prevOrderCount: rnd(s * 30, s * 120),
    prevAsp: rnd(s * 80000, s * 200000),
  };
}

// ── 공개 API ───────────────────────────────────────────────
export function getMockCityMetrics(scope: TimeScope = "weekly"): CityMetrics[] {
  const period = scope === "weekly" ? "2025-W14" : scope === "monthly" ? "2025-03" : "2025-03-31";
  return CITIES.filter((c) => c.available).map((c) => makeMetrics(c.id, period, scope));
}

export function getMockMetricsForCity(cityId: string, scope: TimeScope = "weekly"): CityMetrics {
  const period = scope === "weekly" ? "2025-W14" : scope === "monthly" ? "2025-03" : "2025-03-31";
  return makeMetrics(cityId, period, scope);
}

const CATEGORIES = ["투어/액티비티", "입장권", "교통", "숙박", "식음료"];

export function getMockCategoryMetrics(cityId: string, scope: TimeScope = "weekly"): CategoryMetrics[] {
  return CATEGORIES.map((cat) => ({
    ...makeMetrics(cityId, "2025-W14", scope),
    category: cat,
  }));
}

export function getMockProductMetrics(cityId: string): ProductMetrics[] {
  const names = [
    "프리미엄 시티투어", "야경 보트투어", "미식 투어", "역사지구 워킹투어", "사막 사파리",
  ];
  return names.map((name, i) => ({
    productId: `${cityId}-p${i + 1}`,
    productName: name,
    cityId,
    category: CATEGORIES[i % CATEGORIES.length],
    gmv: rnd(2_000_000, 20_000_000),
    confirmGmv: rnd(1_500_000, 18_000_000),
    cm: rndF(8, 22),
    uv: rnd(200, 1500),
    cvr: rndF(2, 10),
    orderCount: rnd(10, 80),
    asp: rnd(50_000, 300_000),
    leadTime: rnd(3, 45),
  }));
}
