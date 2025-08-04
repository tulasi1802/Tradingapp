import React, { useState, useEffect } from "react";
import MarketSearch from "./MarketSearch"; // Assuming you have this

const filterOptions = ["All equity", "MTF", "Kite only", "Smallcase"];

// URL for AMFI India NAV All Mutual Fund Data TXT (public)
const AMFI_NAV_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

function HoldingsPage() {
  const [selectedTab, setSelectedTab] = useState("Equity");
  const [filter, setFilter] = useState("All equity");
  const [showMarketSearch, setShowMarketSearch] = useState(false);

  const [mutualFunds, setMutualFunds] = useState([]);
  const [loadingNAV, setLoadingNAV] = useState(false);
  const [errorNAV, setErrorNAV] = useState("");

  useEffect(() => {
    if (selectedTab === "Mutual funds") {
      setLoadingNAV(true);
      setErrorNAV("");
      fetch(AMFI_NAV_URL)
        .then((res) => res.text())
        .then((txt) => {
          const lines = txt.split("\n").slice(2); // Skip header lines
          const funds = [];
          lines.forEach((line) => {
            const parts = line.split(";");
            if (parts.length < 6) return;
            const [schemeCode, schemeName, , , nav, date] = parts;
            funds.push({ schemeCode, schemeName, nav, date });
          });
          setMutualFunds(funds.slice(0, 40)); // limit for demo
          setLoadingNAV(false);
        })
        .catch(() => {
          setErrorNAV("Failed to load mutual funds data.");
          setLoadingNAV(false);
        });
    }
  }, [selectedTab]);

  if (showMarketSearch)
    return <MarketSearch onBack={() => setShowMarketSearch(false)} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafbfc",
        fontFamily: "'Inter', 'Roboto', sans-serif",
        padding: "36px 40px 0 40px",
        color: "#474b54",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          borderBottom: "1px solid #ececec",
          display: "flex",
          alignItems: "center",
          gap: 30,
          fontWeight: 500,
          fontSize: 17,
          color: "#757e8c",
          marginBottom: 24,
        }}
      >
        {["All", "Equity", "Mutual funds"].map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              cursor: "pointer",
              color: selectedTab === tab ? "#fa8231" : "#757e8c",
              borderBottom:
                selectedTab === tab ? "2.5px solid #fa8231" : "2px solid transparent",
              paddingBottom: 10,
              fontWeight: selectedTab === tab ? 600 : 500,
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Holdings Title and Filter Dropdown */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
          gap: 24,
        }}
      >
        <h2 style={{ fontSize: 21, fontWeight: 600, margin: 0 }}>Holdings</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            fontSize: 15,
            padding: "5px 13px",
            borderRadius: 4,
            border: "1px solid #d9dbe0",
            background: "#fff",
            color: "#474b54",
            fontWeight: 500,
            outline: "none",
            minWidth: 140,
          }}
        >
          {filterOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Tab Content */}
      {selectedTab !== "Mutual funds" && (
        <div
          style={{
            minHeight: 350,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#8d99ab",
            fontSize: 17,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              border: "2.5px dashed #dadbe1",
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
            }}
          >
            <svg
              width="38"
              height="36"
              fill="none"
              stroke="#c7c9ce"
              strokeWidth="1.5"
              viewBox="0 0 38 36"
            >
              <rect x="7" y="14" width="24" height="14" rx="3" />
              <rect x="14" y="7" width="10" height="7" rx="2" />
              <path d="M7 21h24" />
            </svg>
          </div>
          <div>
            You don't have any stocks in your DEMAT yet. <br />
            Get started with absolutely free equity investments.
          </div>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              padding: "13px 34px",
              fontWeight: 600,
              fontSize: 16,
              marginTop: 20,
              cursor: "pointer",
              boxShadow: "0 1px 4px #2563eb22",
            }}
            onClick={() => setShowMarketSearch(true)}
          >
            Get started
          </button>
          <div
            style={{
              color: "#2563eb",
              fontSize: 15,
              fontWeight: 500,
              marginTop: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                border: "2px solid #2563eb",
                marginRight: 6,
                verticalAlign: "middle",
                display: "inline-block",
              }}
            />
            Analytics
          </div>
        </div>
      )}

      {selectedTab === "Mutual funds" && (
        <div>
          <div
            style={{
              marginBottom: 25,
              textAlign: "center",
            }}
          >
            <img
              src="https://zerodha.com/static/images/coin-logo.svg"
              alt="Coin Logo"
              style={{ height: 48, marginBottom: 12 }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 16,
                color: "#474b54",
                fontWeight: 500,
              }}
            >
              Start investing in commission-free direct mutual funds.
            </p>
            <button
              style={{
                marginTop: 16,
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 24px",
                fontSize: 16,
                cursor: "pointer",
                borderRadius: 5,
              }}
              onClick={() => window.open("https://coin.zerodha.com/", "_blank")}
            >
              Open Coin
            </button>
          </div>

          {loadingNAV && <p>Loading NAV data...</p>}
          {errorNAV && <p style={{ color: "red" }}>{errorNAV}</p>}

          {!loadingNAV && !errorNAV && (
            <div
              style={{
                maxHeight: 240,
                overflowY: "auto",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                padding: 12,
                background: "#fff",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  color: "#474b54",
                }}
              >
                <thead>
                  <tr style={{ background: "#f9f9f9" }}>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8, textAlign: "left" }}>
                      Scheme Name
                    </th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>NAV</th>
                    <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mutualFunds.map((fund, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: 6 }}>{fund.schemeName}</td>
                      <td style={{ padding: 6 }}>{fund.nav}</td>
                      <td style={{ padding: 6 }}>{fund.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showMarketSearch && <MarketSearch onBack={() => setShowMarketSearch(false)} />}
    </div>
  );
}

export default HoldingsPage;
