import type { City } from "@/types";

export const CITIES: City[] = [
  // Europe
  { id: "barcelona",  name: "Barcelona",   country: "Spain",    region: "europe",    available: true },
  { id: "madrid",     name: "Madrid",      country: "Spain",    region: "europe",    available: true },
  { id: "seville",    name: "Seville",     country: "Spain",    region: "europe",    available: true },
  { id: "granada",    name: "Granada",     country: "Spain",    region: "europe",    available: true },
  { id: "majorca",    name: "Majorca",     country: "Spain",    region: "europe",    available: true },
  { id: "lisbon",     name: "Lisbon",      country: "Portugal", region: "europe",    available: true },
  { id: "porto",      name: "Porto",       country: "Portugal", region: "europe",    available: true },
  { id: "athens",     name: "Athens",      country: "Greece",   region: "europe",    available: true },
  { id: "santorini",  name: "Santorini",   country: "Greece",   region: "europe",    available: true },
  // ME / Africa
  { id: "istanbul",   name: "Istanbul",    country: "Türkiye",  region: "me_africa", available: true },
  { id: "cappadocia", name: "Cappadocia",  country: "Türkiye",  region: "me_africa", available: true },
  { id: "dubai",      name: "Dubai",       country: "UAE",      region: "me_africa", available: true },
  { id: "abudhabi",   name: "Abu Dhabi",   country: "UAE",      region: "me_africa", available: true },
  { id: "cairo",      name: "Cairo",       country: "Egypt",    region: "me_africa", available: true },
];

export const getCityById = (id: string): City | undefined =>
  CITIES.find((c) => c.id === id);
