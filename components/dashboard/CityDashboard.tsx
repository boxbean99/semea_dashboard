"use client";
import { useState } from "react";
import type { CityMetrics, TimeScope } from "@/types";
import { COUNTRIES, getCitiesByCountry } from "@/config/countries";
import { getMockMetricsForCity, getMockCategoryMetrics, getMockProductMetrics } from "@/lib/mock/metrics";
import { KPI_DEFS } from "@/lib/utils/kpi";
import KpiCard from "@/components/ui/KpiCard";
import CategoryTab from "./CategoryTab";
import ProductTab from "./ProductTab";
import ChannelTab from "./ChannelTab";

type DetailTab = "category" | "product" | "channel";

interface Props { scope: TimeScope; region: "all" | "europe" | "me_africa"; }

const SPARKLINE_KEYS: Record<string, string> = {
  gmv: "sparklineGmv", confirmGmv: "sparklineGmv",
  uv: "sparklineUv", cvr: "sparklineCvr",
};

export default function CityDashboard({ scope, region }: Props) {
  const filteredCountries = region === "all"
    ? COUNTRIES
    : COUNTRIES.filter(c => c.region === region);

  const [selectedCountryId, setSelectedCountryId] = useState(filteredCountries[0]?.id ?? "spain");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("category");

  const cities = getCitiesByCountry(selectedCountryId);
  const activeCityId = selectedCityId ?? cities[0]?.id;

  const metrics = activeCityId
    ? getMockMetricsForCity(activeCityId, scope) as CityMetrics & Record<string, number>
    : null;

  // tab button style
  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: "6px 16px", fontSize: "12px", fontWeight: active ? 700 : 500,
    color: active ? "#2dd4bf" : "#8899bb",
    backgroundColor: "transparent", border: "none",
    borderBottom: `2px solid ${active ? "#2dd4bf" : "transparent"}`,
    cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em",
    transition: "all 0.15s",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Country tabs — pill */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {filteredCountries.map(c => {
          const active = c.id === selectedCountryId;
          return (
            <button key={c.id} onClick={() => { setSelectedCountryId(c.id); setSelectedCityId(null); }}
              style={{
                padding: "5px 14px", fontSize: "12px", fontWeight: active ? 700 : 500,
                color: active ? "#0d1117" : "#8899bb",
                backgroundColor: active ? "#2dd4bf" : "#1a2540",
                border: `1px solid ${active ? "#2dd4bf" : "#263354"}`,
                borderRadius: "20px", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s",
              }}>
              {c.name}
            </button>
          );
        })}
      </div>

      {/* City tabs — underline */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #263354" }}>
        {cities.map(city => {
          const active = city.id === activeCityId;
          return (
            <button key={city.id}
              onClick={() => city.available ? setSelectedCityId(city.id) : undefined}
              disabled={!city.available}
              style={{
                padding: "8px 18px", fontSize: "13px", fontWeight: active ? 700 : 500,
                color: !city.available ? "#2e3d63" : active ? "#e8edf8" : "#8899bb",
                backgroundColor: "transparent", border: "none",
                borderBottom: `2px solid ${active ? "#2dd4bf" : "transparent"}`,
                cursor: city.available ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "all 0.15s",
              }}>
              {city.name}
              {!city.available && <span style={{ fontSize: "10px", marginLeft: "4px", color: "#2e3d63" }}>(조회불가)</span>}
            </button>
          );
        })}
      </div>

      {metrics ? (
        <>
          {/* City name header */}
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#e8edf8", margin: 0 }}>
              {cities.find(c => c.id === activeCityId)?.name}
            </h2>
            <p style={{ fontSize: "12px", color: "#4a5a7a", margin: "3px 0 0" }}>
              {COUNTRIES.find(c => c.id === selectedCountryId)?.name} · {metrics.scopeType === "weekly" ? "W14" : metrics.period}
            </p>
          </div>

          {/* KPI Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
            {KPI_DEFS.map(def => {
              const sparkKey = SPARKLINE_KEYS[def.key];
              const raw = sparkKey ? metrics[sparkKey] : undefined;
              const sparkData = Array.isArray(raw) ? (raw as number[]) : undefined;
              return <KpiCard key={def.key} def={def} metrics={metrics} scope={scope} sparklineData={sparkData} />;
            })}
          </div>

          {/* Detail Tabs */}
          <div style={{ backgroundColor: "#1a2540", border: "1px solid #263354", borderRadius: "8px", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #263354", backgroundColor: "#151d2e" }}>
              {(["category", "product", "channel"] as DetailTab[]).map(t => (
                <button key={t} onClick={() => setDetailTab(t)} style={tabBtn(detailTab === t)}>
                  {{ category: "카테고리별", product: "상품별", channel: "유입채널별" }[t]}
                </button>
              ))}
            </div>
            <div style={{ padding: "16px" }}>
              {detailTab === "category" && <CategoryTab data={getMockCategoryMetrics(activeCityId, scope)} />}
              {detailTab === "product"  && <ProductTab  data={getMockProductMetrics(activeCityId)} />}
              {detailTab === "channel"  && <ChannelTab />}
            </div>
          </div>
        </>
      ) : (
        <div style={{ color: "#4a5a7a", fontSize: "13px" }}>도시를 선택하세요.</div>
      )}
    </div>
  );
}
