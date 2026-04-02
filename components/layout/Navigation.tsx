"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Kanban, RefreshCw } from "lucide-react";

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
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Row 1: 팀명 + 새로고침 */}
      <div
        style={{
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "44px",
          borderBottom: "1px solid #1e2d48",
        }}
      >
        <span style={{ color: "#c8d6f0", fontWeight: 700, fontSize: "15px", letterSpacing: "0.04em" }}>
          남부유럽팀
        </span>
        <button
          onClick={() => window.location.reload()}
          title="새로고침"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            backgroundColor: "transparent",
            border: "1px solid #263354",
            color: "#8899bb",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#2dd4bf";
            (e.currentTarget as HTMLButtonElement).style.color = "#2dd4bf";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#263354";
            (e.currentTarget as HTMLButtonElement).style.color = "#8899bb";
          }}
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Row 2: 페이지 탭 */}
      <div style={{ padding: "0 24px", display: "flex", gap: "4px", height: "42px", alignItems: "center" }}>
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
                fontSize: "13px",
                fontWeight: active ? 600 : 500,
                letterSpacing: "0.07em",
                color: active ? "#2dd4bf" : "#8899bb",
                backgroundColor: active ? "rgba(45,212,191,0.1)" : "transparent",
                borderBottom: active ? "2px solid #2dd4bf" : "2px solid transparent",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <Icon size={13} />
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
