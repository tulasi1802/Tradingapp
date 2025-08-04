import React, { useState, useMemo } from "react";

const POSITION_PRODUCT_TYPES = ["All", "MIS", "CNC", "NRML"];
const POSITION_SEGMENTS = {
  NFO: "NFO",
  CASH: "CASH",
  CDS: "CDS"
};

const dummyPositions = [
  {
    id: 1,
    symbol: "INFY",
    segment: POSITION_SEGMENTS.CASH,
    quantity: 100,
    averagePrice: 1450.5,
    lastPrice: 1463.0,
    unrealizedPnL: 1250.0,
    dayPnL: 200.0,
    product: "CNC",
  },
  {
    id: 2,
    symbol: "TCS",
    segment: POSITION_SEGMENTS.CASH,
    quantity: 75,
    averagePrice: 2995.4,
    lastPrice: 3030.0,
    unrealizedPnL: 2580.0,
    dayPnL: -300.0,
    product: "MIS",
  },
  {
    id: 3,
    symbol: "SBIN",
    segment: POSITION_SEGMENTS.CASH,
    quantity: 200,
    averagePrice: 580.0,
    lastPrice: 589.0,
    unrealizedPnL: 1800.0,
    dayPnL: 100.0,
    product: "NRML",
  },
];

// Utils for color coding PnL
const getPnLColor = (value) => (value >= 0 ? "#2dbb64" : "#dc2b3c");

export default function PositionsPage() {
  const [filterProduct, setFilterProduct] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "symbol", direction: "asc" });

  // Filter positions by product and search term
  const filteredPositions = useMemo(() => {
    return dummyPositions.filter((pos) => {
      const productMatch = filterProduct === "All" || pos.product === filterProduct;
      const searchMatch =
        pos.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pos.segment.toLowerCase().includes(searchTerm.toLowerCase());
      return productMatch && searchMatch;
    });
  }, [filterProduct, searchTerm]);

  // Sort positions by sortConfig.key and direction
  const sortedPositions = useMemo(() => {
    let sortablePositions = [...filteredPositions];
    sortablePositions.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      // Make string comparison case-insensitive
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortablePositions;
  }, [filteredPositions, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div style={{
      backgroundColor: "#fafbfc",
      minHeight: "100vh",
      padding: "24px 40px",
      fontFamily: "'Inter', 'Roboto', sans-serif",
      color: "#262626"
    }}>
      <h2 style={{ marginBottom: 16, fontWeight: 600, fontSize: 22 }}>Positions</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "center" }}>
        <div>
          <label htmlFor="productFilter" style={{ fontWeight: 600, marginRight: 8 }}>Product</label>
          <select
            id="productFilter"
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: 4,
              border: "1px solid #d9dbe0",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
              minWidth: 120
            }}
          >
            {POSITION_PRODUCT_TYPES.map((prod) => (
              <option key={prod} value={prod}>{prod}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search symbol or segment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #d9dbe0",
              fontSize: 14,
              fontWeight: 500,
              outline: "none",
              width: 260
            }}
          />
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #eceef2", color: "#6e6e73", fontWeight: 600 }}>
            <th style={{ cursor: "pointer", padding: "12px 10px" }} onClick={() => requestSort("symbol")}>Symbol</th>
            <th style={{ cursor: "pointer", padding: "12px 10px" }} onClick={() => requestSort("segment")}>Segment</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }} onClick={() => requestSort("quantity")}>Qty</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }} onClick={() => requestSort("averagePrice")}>Avg. Price (₹)</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }} onClick={() => requestSort("lastPrice")}>LTP (₹)</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }} onClick={() => requestSort("unrealizedPnL")}>Unrealized P&L (₹)</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }} onClick={() => requestSort("dayPnL")}>Day’s P&L (₹)</th>
            <th style={{ cursor: "pointer", padding: "12px 10px", textAlign: "center" }} onClick={() => requestSort("product")}>Product</th>
          </tr>
        </thead>
        <tbody>
          {sortedPositions.map((pos) => (
            <tr key={pos.id} style={{ borderBottom: "1px solid #f0f0f2" }}>
              <td style={{ padding: "12px 10px", fontWeight: 600 }}>{pos.symbol}</td>
              <td style={{ padding: "12px 10px", color: "#6f6f7c" }}>{pos.segment}</td>
              <td style={{ padding: "12px 10px", textAlign: "right" }}>{pos.quantity}</td>
              <td style={{ padding: "12px 10px", textAlign: "right" }}>{pos.averagePrice.toFixed(2)}</td>
              <td style={{ padding: "12px 10px", textAlign: "right" }}>{pos.lastPrice.toFixed(2)}</td>
              <td style={{ padding: "12px 10px", textAlign: "right", color: getPnLColor(pos.unrealizedPnL) }}>
                {pos.unrealizedPnL.toFixed(2)}
              </td>
              <td style={{ padding: "12px 10px", textAlign: "right", color: getPnLColor(pos.dayPnL) }}>
                {pos.dayPnL.toFixed(2)}
              </td>
              <td style={{ padding: "12px 10px", textAlign: "center" }}>{pos.product}</td>
            </tr>
          ))}
          {sortedPositions.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 30, color: "#999" }}>
                No matching positions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
