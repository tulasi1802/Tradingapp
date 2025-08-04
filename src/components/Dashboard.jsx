import React, { useState } from "react";
import MarketSearch from "./MarketSearch";

export default function Dashboard() {
  const [showMarketSearch, setShowMarketSearch] = useState(false);

  if (showMarketSearch)
    return <MarketSearch onBack={() => setShowMarketSearch(false)} />;

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'Inter', 'Roboto', Arial, sans-serif",
      background: "#f7f9fa"
    }}>
      {/* Top empty state */}
      <div style={{
        textAlign: "center", marginTop: 38, marginBottom: 35,
      }}>
        {/* Briefcase Icon */}
        <div style={{
          margin: "0 auto 22px",
          width: 59, height: 59, borderRadius: 16,
          border: "2.5px dashed #dadbe1", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>
          <svg width="33" height="32" fill="none" stroke="#c7c9ce" strokeWidth="1.5" viewBox="0 0 38 36">
            <rect x="7" y="14" width="24" height="14" rx="3"/>
            <rect x="14" y="7" width="10" height="7" rx="2"/>
            <path d="M7 21h24"/>
          </svg>
        </div>
        <div style={{
          color: "#7a8492", fontSize: 17, marginBottom: 17, fontWeight: 500
        }}>
          You don't have any stocks in your DEMAT yet. <br />
          Get started with absolutely free equity investments.
        </div>
        <button
          style={{
            background: "#2563eb", color: "#fff",
            border: "none", borderRadius: 5,
            padding: "13px 39px", fontWeight: 600, fontSize: 16,
            marginBottom: 11, cursor: "pointer",
            boxShadow: "0 1px 4px #2563eb22"
          }}
          onClick={() => setShowMarketSearch(true)}
        >
          Start investing
        </button>
      </div>
      {/* Lower part - Market overview + Positions panel */}
      <div style={{
        display: "flex", flexGrow: 1, justifyContent: "space-between",
        alignItems: "flex-start", padding: "0 32px 0 0"
      }}>
        {/* Market overview */}
        <div style={{
          background: "#fff", borderRadius: 8, boxShadow: "0 1px 8px 0 #e8ebf025",
          marginLeft: 46, marginRight: 25, marginBottom: 40, padding: "18px 32px",
          minWidth: 480, flex: 1, display: "flex", flexDirection: "column"
        }}>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: "#2a3240", display: "flex", alignItems: "center" }}>
            <svg width={16} height={16} style={{ marginRight: 5 }}>
              <polyline points="2,14 8,3 14,14" stroke="#3b3f51" strokeWidth="2" fill="none"/>
              <polyline points="2,14 14,14" stroke="#3b3f51" strokeWidth="2" fill="none"/>
            </svg>
            Market overview
          </div>
          {/* Chart Placeholder */}
          <div style={{ height: 160, width: "100%" }}>
            <svg height={160} width={"100%"} viewBox="0 0 400 160">
              <polyline
                fill="none"
                stroke="#267aff"
                strokeWidth="3"
                points="10,120 50,30 90,50 130,110 170,150 210,70 250,95 290,80 330,125 370,60"
              />
              {/* x-axis labels */}
              <text x="10" y="155" fontSize="14" fill="#bbc3ce">Oct 24</text>
              <text x="130" y="155" fontSize="14" fill="#bbc3ce">Jan 25</text>
              <text x="250" y="155" fontSize="14" fill="#bbc3ce">Apr 25</text>
              <text x="330" y="155" fontSize="14" fill="#bbc3ce">Jul 25</text>
              <text x="28" y="40" fontSize="14" fill="#118cff">NIFTY</text>
            </svg>
          </div>
        </div>
        {/* Positions panel */}
        <div style={{
          background: "#fff", borderRadius: 8, boxShadow: "0 1px 8px 0 #e8ebf025",
          marginTop: 15, marginBottom: 40, minWidth: 260, padding: "38px 0", textAlign: "center"
        }}>
          {/* Anchor Icon */}
          <div style={{ margin: "0 auto 13px", width: 60, height: 60, opacity: 0.56 }}>
            <svg width="40" height="47" fill="none" viewBox="0 0 48 48" stroke="#b8bfc4" strokeWidth="1.8">
              <path d="M24 9v25"/>
              <circle cx="24" cy="9" r="3.4"/>
              <path d="M24 34c0 6.627-9.373 12-21 12"/>
              <path d="M24 34c0 6.627 9.373 12 21 12"/>
              <path d="M10 44C5 35 8 29 14 34"/>
              <path d="M38 44c5-9-8-15-14-10"/>
            </svg>
          </div>
          <div style={{ fontSize: 15, color: "#8d99ab", margin: "0 0 12px" }}>
            You don't have any positions yet
          </div>
          <button style={{
            background: "#2563eb", color: "#fff", border: "none", borderRadius: 5,
            padding: "10px 30px", fontWeight: 600, fontSize: 15, cursor: "pointer",
            boxShadow: "0 1px 4px #2563eb22"
          }}>Get started</button>
        </div>
      </div>
    </div>
  );
}
