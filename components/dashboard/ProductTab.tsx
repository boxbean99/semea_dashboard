"use client";
import { useState, useMemo } from "react";
import type { ProductMetrics } from "@/types";
import { formatKRW, formatPct } from "@/lib/utils/format";
import { Search } from "lucide-react";

interface Props { data: ProductMetrics[]; }

type SortKey = keyof Pick<ProductMetrics, "gmv" | "cm" | "uv" | "cvr" | "asp" | "orderCount" | "leadTime">;

const PAGE_SIZE = 8;

const th: React.CSSProperties = {
  padding: "8px 12px", fontSize: "11px", fontWeight: 600,
  color: "#8899bb", whiteSpace: "nowrap",
  letterSpacing: "0.04em", textTransform: "uppercase",
  cursor: "pointer", userSelect: "none",
  borderBottom: "1px solid #263354",
};
const td: React.CSSProperties = {
  padding: "10px 12px", fontSize: "13px", color: "#e8edf8",
  whiteSpace: "nowrap", borderBottom: "1px solid #1f2d4a",
};

export default function ProductTab({ data }: Props) {
  const [query,   setQuery]   = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("gmv");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [page,    setPage]    = useState(0);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(p =>
      p.productName.toLowerCase().includes(q) ||
      p.productId.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [data, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) =>
      sortDir === "desc" ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
    );
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paged = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
    setPage(0);
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (k !== sortKey) return <span style={{ color: "#2e3d63" }}> ↕</span>;
    return <span style={{ color: "#2dd4bf" }}>{sortDir === "desc" ? " ↓" : " ↑"}</span>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Search */}
      <div style={{ position: "relative", maxWidth: "320px" }}>
        <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#4a5a7a" }} />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setPage(0); }}
          placeholder="상품명 / 상품ID / 카테고리 검색"
          style={{
            width: "100%", padding: "7px 12px 7px 32px",
            backgroundColor: "#0d1117", border: "1px solid #263354",
            borderRadius: "6px", color: "#e8edf8", fontSize: "13px",
            fontFamily: "inherit", outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...th, textAlign: "left" }}>상품명</th>
              <th style={{ ...th, textAlign: "left" }}>카테고리</th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("gmv")}>거래액<SortIcon k="gmv" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("cm")}>CM율<SortIcon k="cm" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("uv")}>UV<SortIcon k="uv" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("cvr")}>CVR<SortIcon k="cvr" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("asp")}>ASP<SortIcon k="asp" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("orderCount")}>예약수<SortIcon k="orderCount" /></th>
              <th style={{ ...th, textAlign: "right" }} onClick={() => handleSort("leadTime")}>리드타임<SortIcon k="leadTime" /></th>
            </tr>
          </thead>
          <tbody>
            {paged.map(p => (
              <tr key={p.productId}>
                <td style={{ ...td, maxWidth: "200px" }}>
                  <div style={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{p.productName}</div>
                  <div style={{ fontSize: "11px", color: "#4a5a7a" }}>{p.productId}</div>
                </td>
                <td style={{ ...td }}>
                  <span style={{ fontSize: "11px", padding: "2px 8px", backgroundColor: "#151d2e", border: "1px solid #263354", borderRadius: "20px" }}>
                    {p.category}
                  </span>
                </td>
                <td style={{ ...td, textAlign: "right", fontWeight: 600 }}>{formatKRW(p.gmv)}</td>
                <td style={{ ...td, textAlign: "right" }}>{formatPct(p.cm)}</td>
                <td style={{ ...td, textAlign: "right" }}>{p.uv.toLocaleString()}</td>
                <td style={{ ...td, textAlign: "right" }}>{formatPct(p.cvr)}</td>
                <td style={{ ...td, textAlign: "right" }}>{formatKRW(p.asp)}</td>
                <td style={{ ...td, textAlign: "right" }}>{p.orderCount}</td>
                <td style={{ ...td, textAlign: "right" }}>{p.leadTime}일</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", fontSize: "12px", color: "#8899bb" }}>
          <span>{filtered.length}개 중 {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)}</span>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{ padding: "3px 10px", backgroundColor: "#1a2540", border: "1px solid #263354", borderRadius: "4px", color: page === 0 ? "#2e3d63" : "#8899bb", cursor: page === 0 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            ←
          </button>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            style={{ padding: "3px 10px", backgroundColor: "#1a2540", border: "1px solid #263354", borderRadius: "4px", color: page >= totalPages - 1 ? "#2e3d63" : "#8899bb", cursor: page >= totalPages - 1 ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            →
          </button>
        </div>
      )}
    </div>
  );
}
