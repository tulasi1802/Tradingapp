// import React from "react";
// import Navbar from "../components/Navbar";
// import Dashboard from "../components/Dashboard";

// const watchlist = [
//   { name: "HDFCBANK", change: -8.05, pct: -0.40, price: 2004.20 },
//   { name: "INFY", change: -7.90, pct: -0.54, price: 1461.70 },
//   { name: "TCS", change: 13.40, pct: 0.45, price: 3016.50 },
//   { name: "ONGC", change: -1.91, pct: -0.81, price: 234.85 },
//   { name: "HINDUNILVR", change: 1.40, pct: 0.05, price: 2552.75 },
//   { name: "GOLDBEES", change: 1.18, pct: 1.44, price: 83.13 },
//   { name: "HDFCBANK", change: -7.20, pct: -0.36, price: 2005.00 },
//   { name: "TATASTEEL", change: 3.75, pct: 2.45, price: 156.75 },
//   { name: "NIFTY 50", change: 81.80, pct: 0.33, price: 24647.15 },
// ];

// export default function Homepage({ user, onLogout }) {
//   const styles = {
//     body: {
//       fontFamily: "Arial, sans-serif",
//       backgroundColor: "#f7f9fa",
//       minHeight: "100vh",
//       margin: 0,
//       padding: 0,
//     },
//     container: { display: "flex", padding: 0 },
//     sidebar: {
//       width: 340,
//       backgroundColor: "#fff",
//       borderRight: "1px solid #edeef0",
//       paddingTop: 18,
//       minHeight: "100vh",
//     },
//     heading: { fontSize: 15, margin: "0 0 8px 20px", color: "#8d99ab", fontWeight: 700 },
//     marketItem: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "9px 18px",
//       borderBottom: "1px solid #f5f7fa",
//       fontSize: 15,
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.body}>
//       <Navbar userId={user?.userId} onLogout={onLogout} />
//       <div style={styles.container}>
//         {/* Sidebar */}
//         <div style={styles.sidebar}>
//           <div style={styles.heading}>Watchlist 1</div>
//           {watchlist.map((item, idx) => (
//             <div key={idx} style={styles.marketItem}>
//               <span
//                 style={{
//                   fontWeight: 600,
//                   color: item.change < 0 ? "#e65728" : item.change > 0 ? "#18915c" : "#343b4e",
//                 }}
//               >
//                 {item.name}
//               </span>
//               <span style={{ textAlign: "right", minWidth: 92 }}>
//                 <span
//                   style={{
//                     fontSize: 13,
//                     fontWeight: 500,
//                     color: item.change < 0 ? "#e65728" : item.change > 0 ? "#18915c" : "#343b4e",
//                     marginRight: 5,
//                   }}
//                 >
//                   {item.change > 0 ? "+" : ""}
//                   {item.change}
//                 </span>
//                 <span style={{ fontSize: 12, color: "#bfc6ce", marginRight: 5 }}>
//                   {item.pct > 0 ? "+" : ""}
//                   {item.pct}%
//                 </span>
//                 <div style={{ fontWeight: 500, fontSize: 15, color: "#343b4e" }}>{item.price}</div>
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Main dashboard */}
//         <div style={{ flex: 1, minHeight: "100vh", padding: "20px" }}>
//           {user && (
//             <div style={{ marginBottom: "15px", fontSize: 18, fontWeight: 600 }}>
//               Welcome, {user.userId}!
//             </div>
//           )}
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const watchlist = [
  { name: "HDFCBANK", change: -8.05, pct: -0.40, price: 2004.20 },
  { name: "INFY", change: -7.90, pct: -0.54, price: 1461.70 },
  { name: "TCS", change: 13.40, pct: 0.45, price: 3016.50 },
  { name: "ONGC", change: -1.91, pct: -0.81, price: 234.85 },
  { name: "HINDUNILVR", change: 1.40, pct: 0.05, price: 2552.75 },
  { name: "GOLDBEES", change: 1.18, pct: 1.44, price: 83.13 },
  { name: "HDFCBANK", change: -7.20, pct: -0.36, price: 2005.00 },
  { name: "TATASTEEL", change: 3.75, pct: 2.45, price: 156.75 },
  { name: "NIFTY 50", change: 81.80, pct: 0.33, price: 24647.15 },
];

export default function Homepage({ user, onLogout }) {
  const navigate = useNavigate();

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f7f9fa",
      minHeight: "100vh",
      margin: 0,
      padding: 0,
    },
    container: { display: "flex", padding: 0 },
    sidebar: {
      width: 340,
      backgroundColor: "#fff",
      borderRight: "1px solid #edeef0",
      paddingTop: 18,
      minHeight: "100vh",
    },
    heading: {
      fontSize: 15,
      margin: "0 0 8px 20px",
      color: "#8d99ab",
      fontWeight: 700,
    },
    marketItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "9px 18px",
      borderBottom: "1px solid #f5f7fa",
      fontSize: 15,
      cursor: "pointer",
    },
    topBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 18,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    },
    logoutBtn: {
      marginLeft: 20,
      padding: "6px 12px",
      fontSize: 14,
      fontWeight: "600",
      cursor: "pointer",
      borderRadius: 4,
      border: "1px solid #ddd",
      background: "#fff",
    },
  };

  return (
    <div style={styles.body}>
      <Navbar userId={user?.userId} onLogout={onLogout} />
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.heading}>Watchlist 1</div>
          {watchlist.map((item, idx) => (
            <div key={idx} style={styles.marketItem}>
              <span
                style={{
                  fontWeight: 600,
                  color:
                    item.change < 0
                      ? "#e65728"
                      : item.change > 0
                      ? "#18915c"
                      : "#343b4e",
                }}
              >
                {item.name}
              </span>
              <span style={{ textAlign: "right", minWidth: 92 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color:
                      item.change < 0
                        ? "#e65728"
                        : item.change > 0
                        ? "#18915c"
                        : "#343b4e",
                    marginRight: 5,
                  }}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}
                </span>
                <span style={{ fontSize: 12, color: "#bfc6ce", marginRight: 5 }}>
                  {item.pct > 0 ? "+" : ""}
                  {item.pct}%
                </span>
                <div style={{ fontWeight: 500, fontSize: 15, color: "#343b4e" }}>
                  {item.price}
                </div>
              </span>
            </div>
          ))}
        </div>

        {/* Main dashboard area */}
        <div style={{ flex: 1, minHeight: "100vh", padding: "20px" }}>
          {user && (
            <div style={styles.topBar}>
              <div style={styles.welcomeText}>
                Welcome, {user.userId}!
                {onLogout && (
                  <button style={styles.logoutBtn} onClick={onLogout}>
                    Logout
                  </button>
                )}
              </div>
              {/* Optionally add a sign up button or other info here */}
            </div>
          )}
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
