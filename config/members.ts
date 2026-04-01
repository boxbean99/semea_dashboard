import type { Member } from "@/types";

export const MEMBERS: Member[] = [
  {
    id: "member1",
    name: "팀원 A",
    role: "PM",
    cities: ["istanbul", "cappadocia"],
    avatarColor: "#2dd4bf",
  },
  {
    id: "member2",
    name: "팀원 B",
    role: "Analyst",
    cities: ["barcelona", "madrid", "seville", "granada", "majorca"],
    avatarColor: "#60a5fa",
  },
  {
    id: "member3",
    name: "팀원 C",
    role: "BD",
    cities: ["lisbon", "porto"],
    avatarColor: "#a78bfa",
  },
  {
    id: "member4",
    name: "팀원 D",
    role: "Ops",
    cities: ["dubai", "abudhabi", "cairo", "athens", "santorini"],
    avatarColor: "#fbbf24",
  },
];
