"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Kanban } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "DASHBOARD",       icon: LayoutDashboard },
  { href: "/todo",      label: "TO-DO",            icon: CheckSquare },
  { href: "/tracker",   label: "PROJECT TRACKER",  icon: Kanban },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header
      style={{
        backgroundColor: "#151d2e",
        borderBottom: "1px solid #263354",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        height: "56px",
        gap: "8px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "32px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2dd4bf, #1a8f80)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "13px",
            color: "#0d1117",
          }}
        >
          SE
        </div>
        <span style={{ color: "#e8edf8", fontWeight: 600, fontSize: "15px", letterSpacing: "0.05em" }}>
          SE&amp;MEA
        </span>
      </div>

      {/* Nav tabs */}
      <nav style={{ display: "flex", gap: "4px" }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: active ? 600 : 500,
                letterSpacing: "0.07em",
                color: active ? "#2dd4bf" : "#8899bb",
                backgroundColor: active ? "rgba(45,212,191,0.1)" : "transparent",
                borderBottom: active ? "2px solid #2dd4bf" : "2px solid transparent",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
