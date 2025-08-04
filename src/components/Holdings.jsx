import React, { useState } from "react";
import MarketSearch from "./MarketSearch"; // Reuse your previous component

const watchlist = [
  { name: "HDFCBANK", change: -9.15, pct: -0.45, price: 2003.10 },
  { name: "INFY", change: 4.20, pct: 0.29, price: 1455.40 },
  { name: "TCS", change: 21.90, pct: 0.73, price: 3025.00 },
  { name: "ONGC", change: -2.14, pct: -0.90, price: 234.65 },
  { name: "HINDUNILVR", change: -11.15, pct: -0.44, price: 2540.20 },
  { name: "GOLDBEES", change: 1.14, pct: 1.39, price: 83.09 },
  { name: "HDFCBANK", change: -3.80, pct: -0.41, price: 2003.90 },
  { name: "TATASTEEL", change: 3.85, pct: 2.52, price: 156.85 },
  { name: "NIFTY 50", change: 110.85, pct: 0.45, price: 24676.20 },
  { name: "COALINDIA", change: 4.65, pct: 1.25, price: 377.15 },
];

const filterOptions = ["All equity", "MTF", "Kite only", "Smallcase"];

function HoldingsPage() {
  const [selectedTab, setSelectedTab] = useState("Equity");
  const [filter, setFilter] = useState("All equity");
  const [showMarketSearch, setShowMarketSearch] = useState(false);

  // If Get Started is clicked, show MarketSearch (reusing earlier code logic)
  if (showMarketSearch)
    return <MarketSearch onBack={() => setShowMarketSearch(false)} />;

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#fafbfc",
      fontFamily: "'Inter', 'Roboto', sans-serif"
    }}>
      {/* Left Watchlist */}
      <div style={{
        width: 350,
        background: "#fff",
        borderRight: "1px solid #eeeff0",
        padding: "17px 0",
        minHeight: "100vh"
      }}>
        {/* Watchlist Header */}
        <div style={{padding: "0 20px 8px", color: "#868c96", fontSize: 14}}>
          <span>Watchlist 1</span>
        </div>
        {/* Watchlist Items */}
        <div>
          {watchlist.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 20px",
              borderBottom: "1px solid #f3f4f6",
              fontSize: 15,
              fontWeight: 500,
              color: "#343b4e",
              cursor: "pointer"
            }}>
              <div>
                <span style={{
                  fontWeight: 600,
                  color: item.change < 0 ? "#e65728" : (item.change > 0 ? "#18915c" : "#343b4e")
                }}>{item.name}</span>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#656f7c", fontSize:13}}>
                  {item.change > 0 ? "+" : ""}{item.change}
                  <span style={{marginLeft:4, color:"#bfc6ce", fontSize:12}}>
                    {item.pct > 0 ? "+" : ""}{item.pct}%
                  </span>
                </div>
                <div style={{fontWeight:500, fontSize:15, color:"#343b4e"}}>
                  {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Main Area */}
      <div style={{flex:1, padding: "36px 0 0 0"}}>
        {/* Tabs */}
        <div style={{
          borderBottom: "1px solid #ececec",
          marginLeft: 36, marginRight: 36,
          display: "flex", alignItems: "center"
        }}>
          {["All", "Equity", "Mutual funds"].map(tab => (
            <div
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                fontWeight: 500,
                fontSize: 17,
                color: selectedTab === tab ? "#fa8231" : "#757e8c",
                borderBottom: selectedTab === tab ? "2.5px solid #fa8231" : "2px solid transparent",
                padding: "14px 22px 10px 14px",
                cursor: "pointer",
                marginBottom: -1
              }}
            >
              {tab}
            </div>
          ))}
        </div>
        {/* Holdings Header + Filter */}
        <div style={{
          marginLeft: 40,
          marginTop: 24,
          marginBottom: 0,
          display: "flex",
          alignItems: "center"
        }}>
          <h2 style={{fontSize: 21, margin: "0 24px 0 0", fontWeight: 600}}>Holdings</h2>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              fontSize: 15, padding: "5px 13px", borderRadius: 4, 
              border: "1px solid #d9dbe0", background: "#fff",
              color: "#474b54", fontWeight: 500, outline: 0
            }}
          >
            {filterOptions.map(opt => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Empty State */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center",
          minHeight: 350
        }}>
          <div style={{
            width: 64, height: 64, border: "2.5px dashed #dadbe1", borderRadius: 15,
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18
          }}>
            {/* Briefcase SVG Icon */}
            <svg width="38" height="36" fill="none" stroke="#c7c9ce" strokeWidth="1.5" viewBox="0 0 38 36">
              <rect x="7" y="14" width="24" height="14" rx="3"/>
              <rect x="14" y="7" width="10" height="7" rx="2"/>
              <path d="M7 21h24"/>
            </svg>
          </div>
          <div style={{fontSize: 17, color: "#8d99ab", marginBottom: 17, textAlign:"center", fontWeight:500}}>
            You don't have any stocks in your DEMAT yet. <br />
            Get started with absolutely free equity investments.
          </div>
          <button
            style={{
              background: "#2563eb", color: "#fff",
              border: "none", borderRadius: 5,
              padding: "13px 34px", fontWeight: 600, fontSize: 16,
              marginBottom: 11, cursor: "pointer", boxShadow: "0 1px 4px #2563eb22"
            }}
            onClick={() => setShowMarketSearch(true)}
          >
            Get started
          </button>
          <div style={{
            color:"#2563eb", fontSize:15, fontWeight:500, marginTop:2,
            display: "flex", alignItems: "center"
          }}>
            <span style={{
              display:"inline-block",
              width:12, height:12, borderRadius:"50%",
              border:"2px solid #2563eb", marginRight:6, verticalAlign:"middle"
            }} />
            Analytics
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoldingsPage;
