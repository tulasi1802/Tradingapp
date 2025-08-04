import React, { useState } from "react";

// Fake sample IPO data for demo
const IPO_LIST = [
  {
    instrument: "CUDML SME",
    company: "Cash Ur Drive Marketing",
    date: "31st Jul – 4th Aug",
    price: "123 - 130",
    minAmount: "260000",
    qty: "2000",
  },
  {
    instrument: "RNPL SME",
    company: "Renol Polychem",
    date: "31st Jul – 4th Aug",
    price: "100 - 105",
    minAmount: "252000",
    qty: "2400",
  },
  {
    instrument: "FLYSBS SME",
    company: "Flysbys Aviation",
    date: "1st – 5th Aug",
    price: "210 - 225",
    minAmount: "270000",
    qty: "1200",
  },
  {
    instrument: "AARADHYA SME",
    company: "Aaradhya Disposal Industries",
    date: "4th – 6th Aug",
    price: "110 - 116",
    minAmount: "278400",
    qty: "2400",
  },
  {
    instrument: "BLT SME",
    company: "BLT Logistics",
    date: "4th – 6th Aug",
    price: "71 - 75",
    minAmount: "240000",
    qty: "3200",
  },
  {
    instrument: "JYOTIGLOBL SME",
    company: "Jyoti Global Plast",
    date: "4th – 6th Aug",
    price: "62 - 66",
    minAmount: "264000",
    qty: "4000",
  },
  {
    instrument: "BHADORA SME",
    company: "Bhadora Industry",
    date: "4th – 6th Aug",
    price: "97 - 103",
    minAmount: "247200",
    qty: "1200",
  },
  {
    instrument: "PARTH SME",
    company: "Parth Electricals & Engineering",
    date: "4th – 6th Aug",
    price: "160 - 170",
    minAmount: "272000",
    qty: "1600",
  },
  {
    instrument: "ESSEX SME",
    company: "Essex",
    date: "4th – 6th Aug",
    price: "140 - 145",
    minAmount: "232000",
    qty: "1600",
  },
  // ...add more if needed for scroll
];

export default function BidsPage() {
  const [selectedTab, setSelectedTab] = useState("IPO");
  const [search, setSearch] = useState("");

  // Filter IPOs by search text
  const filteredIPOs = IPO_LIST.filter((ipo) =>
    ipo.instrument.toLowerCase().includes(search.toLowerCase()) ||
    ipo.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: "#fafbfc", fontFamily: "Inter,Roboto,sans-serif", minHeight: "100vh" }}>
      {/* Tabs */}
      <div style={{
        borderBottom: "1px solid #eaeaea",
        display: "flex",
        gap: 32,
        fontWeight: 500,
        fontSize: 17,
        color: "#556176",
        padding: "32px 40px 0 40px"
      }}>
        {["IPO", "Govt. securities", "Auctions"].map((tab) => (
          <div
            key={tab}
            style={{
              cursor: "pointer",
              color: selectedTab === tab ? "#fa8231" : "#757e8c",
              paddingBottom: 11,
              borderBottom: selectedTab === tab ? "2.5px solid #fa8231" : "2px solid transparent",
              marginBottom: -1,
            }}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Main content for IPO */}
      {selectedTab === "IPO" && (
        <div style={{ marginLeft: 40, marginRight: 40, marginTop: 24 }}>
          <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>IPOs ({filteredIPOs.length})</div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 18,
          }}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                fontSize: 15,
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: 5,
                width: 240,
                background: "#fff",
              }}
            />
          </div>
          {/* IPO Table */}
          <div style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 1px 8px rgba(0,0,0,0.02)",
            overflow: "auto",
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
              <thead>
                <tr style={{ color: "#70747a", fontWeight: 550, fontSize: 14 }}>
                  <th style={{ textAlign: "left", padding: "14px 12px" }}>Instrument</th>
                  <th style={{ textAlign: "left", padding: "14px 12px" }}>Date</th>
                  <th style={{ textAlign: "right", padding: "14px 12px" }}>Price (₹)</th>
                  <th style={{ textAlign: "right", padding: "14px 12px" }}>Min. amount (₹)</th>
                  <th style={{ textAlign: "center", padding: "14px 12px" }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredIPOs.map((ipo, idx) => (
                  <tr key={idx} style={{ borderTop: "1px solid #f3f3f3" }}>
                    <td style={{ padding: "15px 12px 7px 12px" }}>
                      <div style={{ fontWeight: 600, color: "#27314b", marginBottom: 3 }}>{ipo.instrument}</div>
                      <div style={{ fontSize: 13, color: "#999", marginTop: -1 }}>{ipo.company}</div>
                    </td>
                    <td style={{ padding: "15px 12px", color: "#2d77f0", fontWeight: 500 }}>{ipo.date}</td>
                    <td style={{ padding: "15px 12px", textAlign: "right" }}>{ipo.price}</td>
                    <td style={{ padding: "15px 12px", textAlign: "right" }}>
                      {Number(ipo.minAmount).toLocaleString()}<span style={{ color: "#b6bbca", fontSize: 13 }}> <span style={{marginLeft:4, fontSize:12}}>{ipo.qty} qty.</span></span>
                    </td>
                    <td style={{ padding: "15px 12px", textAlign: "center" }}>
                      <button style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 22px",
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}>
                        Apply
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredIPOs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: 50, color: "#999", fontSize: 18 }}>
                      No IPOs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dummy panel for other tabs */}
      {selectedTab !== "IPO" && (
        <div style={{
          marginLeft: 40, marginTop: 60, fontSize: 19, color: "#999", textAlign: "center"
        }}>
          <span>No active items in this tab currently.</span>
        </div>
      )}
    </div>
  );
}
