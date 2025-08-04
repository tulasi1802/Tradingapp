// import React, { useState } from "react";
// import MarketDetail from "./MarketDetail";

// function MarketSearch({ onBack }) {
//   const [search, setSearch] = useState("");
//   const [selectedMarket, setSelectedMarket] = useState(null);

//   const markets = [
//     { name: "HDFCBANK", price: 2000.5, high: 2015, low: 1985, volume: 12000 },
//     { name: "INFY", price: 1458.6, high: 1470, low: 1440, volume: 18000 },
//     { name: "TCS", price: 2999.95, high: 3050, low: 2980, volume: 9000 },
//     { name: "RELIANCE", price: 2498.7, high: 2505, low: 2450, volume: 30000 }
//   ];

//   const filtered = markets.filter((m) =>
//     m.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const styles = {
//     container: { padding: "20px" },
//     input: {
//       width: "100%",
//       padding: "10px",
//       border: "1px solid #ccc",
//       borderRadius: "4px",
//       marginBottom: "15px"
//     },
//     listItem: {
//       display: "flex",
//       justifyContent: "space-between",
//       padding: "10px",
//       borderBottom: "1px solid #eee",
//       cursor: "pointer"
//     },
//     button: {
//       backgroundColor: "#2563eb",
//       color: "#fff",
//       padding: "8px 12px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       marginBottom: "10px"
//     }
//   };

//   if (selectedMarket) {
//     return <MarketDetail market={selectedMarket} onBack={() => setSelectedMarket(null)} />;
//   }

//   return (
//     <div style={styles.container}>
//       <button style={styles.button} onClick={onBack}>← Back</button>
//       <h2>Search Markets</h2>
//       <input
//         type="text"
//         placeholder="Search market..."
//         style={styles.input}
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       {filtered.map((market, index) => (
//         <div
//           key={index}
//           style={styles.listItem}
//           onClick={() => setSelectedMarket(market)}
//         >
//           <span>{market.name}</span>
//           <span>{market.price}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default MarketSearch;










import React, { useState } from "react";
import MarketDetail from "./MarketDetail";

function MarketSearch({ onBack }) {
  const [search, setSearch] = useState("");
  const [selectedMarket, setSelectedMarket] = useState(null);

  const markets = [
    { name: "NIFTY1", price: 270.99, high: 271.28, low: 270.05, volume: 21027 },
    { name: "HDFCBANK", price: 2000.5, high: 2015, low: 1985, volume: 12000 },
    { name: "INFY", price: 1458.6, high: 1470, low: 1440, volume: 18000 },
    { name: "TCS", price: 2999.95, high: 3050, low: 2980, volume: 9000 }
  ];

  const filtered = markets.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return selectedMarket ? (
    <MarketDetail market={selectedMarket} onBack={() => setSelectedMarket(null)} />
  ) : (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", minHeight: "100vh",
      background: "rgba(247,249,250,0.98)", zIndex: 1100,
      fontFamily: "'Inter', 'Roboto', sans-serif"
    }}>
      <div style={{
        maxWidth: 400, margin: "60px auto", background: "#fff",
        borderRadius: 10, boxShadow: "0 1px 8px rgba(0,0,0,.10)",
        padding: 30, position: "relative"
      }}>
        <button style={{
          position: "absolute", left: 16, top: 16,
          background: "none", border: 0, fontSize: 22, color: "#2563eb", cursor: "pointer"
        }} onClick={onBack}>←</button>
        <h2 style={{margin: "0 0 16px 0", textAlign: "center"}}>Search Markets</h2>
        <input
          style={{
            width: "100%", padding: "13px 12px", border: "1px solid #e9ecef",
            borderRadius: 5, fontSize: 15, marginBottom: 15
          }}
          value={search}
          type="text"
          placeholder="Search market..."
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {filtered.map((market, i) => (
            <div
              key={i}
              onClick={() => setSelectedMarket(market)}
              style={{
                display: "flex", justifyContent: "space-between",
                padding: "12px 3px", borderBottom: "1px solid #f2f3f5",
                fontSize: 15, color: "#2b354f", cursor: "pointer", fontWeight: 500
              }}>
              <span>{market.name}</span>
              <span style={{ color: "#2563eb", fontWeight: 600 }}>{market.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketSearch;
