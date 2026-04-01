import type { CityMetrics, CategoryMetrics, ProductMetrics, TimeScope } from "@/types";
import { CITIES } from "@/config/cities";

// ── Seeded RNG — Math.random() 대신 사용해 SSR/CSR 값 일치 보장 ──────
function makeRng(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return () => {
    h ^= h >>> 16;
    h = Math.imul(h, 0x45d9f3b);
    h ^= h >>> 16;
    return (h >>> 0) / 0xffffffff;
  };
}

function makeHelpers(rng: () => number) {
  const rnd  = (min: number, max: number) => Math.round(min + rng() * (max - min));
  const rndF = (min: number, max: number, d = 1) =>
    parseFloat((min + rng() * (max - min)).toFixed(d));
  return { rnd, rndF };
}

const SCALE: Record<string, number> = {
  istanbul: 5, cappadocia: 3, barcelona: 4, madrid: 3,
  lisbon: 3, porto: 2, dubai: 4, abudhabi: 2,
  athens: 2, santorini: 2, seville: 1, granada: 1,
  majorca: 1, cairo: 1,
};

function genSparkline(base: number, rndF: (min: number, max: number) => number, weeks = 8): number[] {
  let v = base;
  return Array.from({ length: weeks }, () => {
    v = v * rndF(0.88, 1.12);
    return Math.round(v);
  });
}

function makeMetrics(cityId: string, period: string, scope: TimeScope): CityMetrics {
  // seed = cityId + period + scope → 항상 동일한 값 생성 (SSR/CSR 일치)
  const { rnd, rndF } = makeHelpers(makeRng(`${cityId}-${period}-${scope}`));
  const s = SCALE[cityId] ?? 1;
  const base = s * 10_000_000;

  const gmv        = rnd(base * 0.8, base * 1.2);
  const cfr        = rndF(55, 85);
  const confirmGmv = Math.round(gmv * cfr / 100);
  const cm         = rndF(8, 22);
  const uv         = rnd(s * 800, s * 2000);
  const orderCount = rnd(s * 30, s * 120);
  const asp        = Math.round(gmv / orderCount);
  const cvr        = rndF(1.5, 8.0);
  const cmAmount   = Math.round(confirmGmv * cm / 100);

  const prevGmv        = Math.round(gmv * rndF(0.85, 1.15));
  const prevConfirmGmv = Math.round(confirmGmv * rndF(0.85, 1.15));
  const prevCm         = rndF(8, 22);
  const prevUv         = rnd(s * 800, s * 2000);
  const prevCvr        = rndF(1.5, 8.0);
  const prevOrderCount = rnd(s * 30, s * 120);
  const prevAsp        = Math.round(prevGmv / prevOrderCount);
  const prevCmAmount   = Math.round(prevConfirmGmv * prevCm / 100);

  // 일간 전주 동요일 비교
  const prevWeekSameDayGmv        = Math.round(gmv * rndF(0.82, 1.18));
  const prevWeekSameDayConfirmGmv = Math.round(confirmGmv * rndF(0.82, 1.18));
  const prevWeekSameDayUv         = rnd(s * 800, s * 2000);
  const prevWeekSameDayCvr        = rndF(1.5, 8.0);
  const prevWeekSameDayOrderCount = rnd(s * 30, s * 120);
  const prevWeekSameDayAsp        = Math.round(prevWeekSameDayGmv / prevWeekSameDayOrderCount);

  return {
    cityId, period, scopeType: scope,
    gmv, confirmGmv, cfr, cm, cmAmount, uv, cvr, orderCount, asp,
    prevGmv, prevConfirmGmv, prevCm, prevUv, prevCvr, prevOrderCount, prevAsp, prevCmAmount,
    prevCfr: prevGmv > 0 ? (prevConfirmGmv / prevGmv) * 100 : 0,
    prevWeekSameDayGmv, prevWeekSameDayConfirmGmv, prevWeekSameDayUv,
    prevWeekSameDayCvr, prevWeekSameDayOrderCount, prevWeekSameDayAsp,
    sparklineGmv: genSparkline(gmv, rndF),
    sparklineUv:  genSparkline(uv,  rndF),
    sparklineCvr: genSparkline(cvr * 100, rndF),
  } as CityMetrics & Record<string, unknown>;
}

export function getMockCityMetrics(scope: TimeScope = "weekly"): CityMetrics[] {
  const period = scope === "weekly" ? "2025-W14" : scope === "monthly" ? "2025-03" : "2025-03-31";
  return CITIES.filter(c => c.available).map(c => makeMetrics(c.id, period, scope));
}

export function getMockMetricsForCity(cityId: string, scope: TimeScope = "weekly"): CityMetrics {
  const period = scope === "weekly" ? "2025-W14" : scope === "monthly" ? "2025-03" : "2025-03-31";
  return makeMetrics(cityId, period, scope);
}

const CATEGORIES = ["투어/액티비티", "입장권", "교통", "숙박", "식음료"];

export function getMockCategoryMetrics(cityId: string, scope: TimeScope = "weekly"): CategoryMetrics[] {
  return CATEGORIES.map(cat => ({
    ...makeMetrics(cityId, "2025-W14", scope),
    category: cat,
  }));
}

const PRODUCT_NAMES = [
  "프리미엄 시티투어", "야경 보트투어", "미식 투어", "역사지구 워킹투어",
  "사막 사파리", "선셋 크루즈", "박물관 패스", "쿠킹 클래스", "열기구 투어", "반일 투어",
];

export function getMockProductMetrics(cityId: string): ProductMetrics[] {
  return PRODUCT_NAMES.map((name, i) => {
    const { rnd, rndF } = makeHelpers(makeRng(`${cityId}-product-${i}`));
    return {
      productId: `${cityId}-p${i + 1}`,
      productName: name,
      cityId,
      category: CATEGORIES[i % CATEGORIES.length],
      gmv:        rnd(2_000_000, 20_000_000),
      confirmGmv: rnd(1_500_000, 18_000_000),
      cm:         rndF(8, 22),
      uv:         rnd(200, 1500),
      cvr:        rndF(2, 10),
      orderCount: rnd(10, 80),
      asp:        rnd(50_000, 300_000),
      leadTime:   rnd(3, 45),
    };
  });
}
