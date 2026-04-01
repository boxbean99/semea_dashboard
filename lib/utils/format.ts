export function formatKRW(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 100_000_000) return `${sign}₩${(abs / 100_000_000).toFixed(1)}억`;
  if (abs >= 10_000)      return `${sign}₩${Math.round(abs / 10_000).toLocaleString()}만`;
  return `${sign}₩${abs.toLocaleString()}`;
}

export function formatNum(value: number): string {
  if (value >= 10_000) return `${(value / 10_000).toFixed(1)}만`;
  return value.toLocaleString();
}

export function formatPct(value: number): string {
  return `${value.toFixed(1)}%`;
}

export type DeltaResult = { text: string; positive: boolean; neutral: boolean };

export function calcDelta(current: number, prev?: number): DeltaResult {
  if (prev === undefined || prev === 0) return { text: "-", positive: true, neutral: true };
  const pct = ((current - prev) / prev) * 100;
  const neutral = Math.abs(pct) < 0.05;
  return {
    text: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`,
    positive: pct >= 0,
    neutral,
  };
}

export function calcPctDelta(current: number, prev?: number): DeltaResult {
  if (prev === undefined) return { text: "-", positive: true, neutral: true };
  const diff = current - prev;
  const neutral = Math.abs(diff) < 0.05;
  return {
    text: `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%p`,
    positive: diff >= 0,
    neutral,
  };
}

export function comparisonLabel(scope: "monthly" | "weekly" | "daily"): string {
  if (scope === "monthly") return "MoM";
  if (scope === "weekly")  return "WoW";
  return "DoD";
}
