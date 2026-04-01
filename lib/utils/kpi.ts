import type { CityMetrics, TimeScope } from "@/types";

export function aggregateMetrics(list: CityMetrics[]): CityMetrics {
  const sum = (key: keyof CityMetrics) =>
    list.reduce((acc, m) => acc + ((m[key] as number) ?? 0), 0);

  const gmv         = sum("gmv");
  const confirmGmv  = sum("confirmGmv");
  const uv          = sum("uv");
  const orderCount  = sum("orderCount");
  const cmAmount    = sum("cmAmount");

  const prevGmv        = sum("prevGmv");
  const prevConfirmGmv = sum("prevConfirmGmv");
  const prevUv         = sum("prevUv");
  const prevOrderCount = sum("prevOrderCount");

  // weighted averages
  const cm  = gmv > 0 ? list.reduce((a, m) => a + m.cm  * m.gmv, 0) / gmv : 0;
  const cvr = uv  > 0 ? list.reduce((a, m) => a + m.cvr * m.uv,  0) / uv  : 0;
  const cfr = gmv > 0 ? (confirmGmv / gmv) * 100 : 0;
  const asp = orderCount > 0 ? gmv / orderCount : 0;

  const prevCm  = prevGmv > 0 ? list.reduce((a, m) => a + (m.prevCm  ?? 0) * (m.prevGmv  ?? 0), 0) / prevGmv : 0;
  const prevCvr = prevUv  > 0 ? list.reduce((a, m) => a + (m.prevCvr ?? 0) * (m.prevUv   ?? 0), 0) / prevUv  : 0;
  const prevAsp = prevOrderCount > 0 ? prevGmv / prevOrderCount : 0;

  const first = list[0];
  return {
    cityId: "TOTAL",
    period: first?.period ?? "",
    scopeType: first?.scopeType ?? "weekly",
    gmv, confirmGmv, cfr, cm, cmAmount,
    uv, cvr, orderCount, asp,
    prevGmv, prevConfirmGmv, prevCm, prevUv, prevCvr, prevOrderCount, prevAsp,
    prevCfr: prevGmv > 0 ? (prevConfirmGmv / prevGmv) * 100 : 0,
    prevCmAmount: list.reduce((a, m) => a + ((m.prevCmAmount as number) ?? 0), 0),
  } as CityMetrics & { prevCfr: number; prevCmAmount: number };
}

export interface KpiDef {
  key: string;
  label: string;
  format: "krw" | "num" | "pct";
  getValue: (m: CityMetrics & Record<string, number>) => number;
  getPrev:  (m: CityMetrics & Record<string, number>) => number | undefined;
  isPctPoint?: boolean;
}

export const KPI_DEFS: KpiDef[] = [
  { key: "gmv",        label: "거래액 (GMV)",     format: "krw", getValue: m => m.gmv,        getPrev: m => m.prevGmv },
  { key: "confirmGmv", label: "확정 거래액",       format: "krw", getValue: m => m.confirmGmv, getPrev: m => m.prevConfirmGmv },
  { key: "cmAmount",   label: "공헌이익 (CM)",     format: "krw", getValue: m => m.cmAmount,   getPrev: m => (m as Record<string,number>).prevCmAmount },
  { key: "cm",         label: "CM율",              format: "pct", getValue: m => m.cm,         getPrev: m => m.prevCm,  isPctPoint: true },
  { key: "uv",         label: "방문자 (UV)",        format: "num", getValue: m => m.uv,         getPrev: m => m.prevUv },
  { key: "cvr",        label: "전환율 (CVR)",       format: "pct", getValue: m => m.cvr,        getPrev: m => m.prevCvr, isPctPoint: true },
  { key: "asp",        label: "객단가 (ASP)",       format: "krw", getValue: m => m.asp,        getPrev: m => m.prevAsp },
  { key: "orderCount", label: "예약수",             format: "num", getValue: m => m.orderCount, getPrev: m => m.prevOrderCount },
];
