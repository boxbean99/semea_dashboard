import type { Region } from "@/types";
import { CITIES } from "./cities";

export interface Country {
  id: string;
  name: string;
  region: Region;
}

// 알파벳 순 정렬 — 추후 거래액순 등으로 교체 가능
export const COUNTRIES: Country[] = [
  { id: "egypt",    name: "Egypt",    region: "me_africa" },
  { id: "greece",   name: "Greece",   region: "europe" },
  { id: "portugal", name: "Portugal", region: "europe" },
  { id: "spain",    name: "Spain",    region: "europe" },
  { id: "turkey",   name: "Türkiye",  region: "me_africa" },
  { id: "uae",      name: "UAE",      region: "me_africa" },
];

export function getCitiesByCountry(countryId: string) {
  return CITIES.filter(c => {
    const map: Record<string, string> = {
      egypt: "Egypt", greece: "Greece", portugal: "Portugal",
      spain: "Spain", turkey: "Türkiye", uae: "UAE",
    };
    return c.country === map[countryId];
  });
}
