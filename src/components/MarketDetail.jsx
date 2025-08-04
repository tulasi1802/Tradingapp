// import React, { useState } from "react";

// function MarketDetail({ market, onBack }) {
//   const [showBuySell, setShowBuySell] = useState(null);

//   const styles = {
//     container: { padding: "20px" },
//     card: {
//       backgroundColor: "#fff",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//       marginBottom: "20px"
//     },
//     button: {
//       backgroundColor: "#2563eb",
//       color: "#fff",
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "4px",
//       marginRight: "10px",
//       cursor: "pointer"
//     },
//     modal: {
//       position: "fixed",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       backgroundColor: "#fff",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//       zIndex: 100
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <button style={styles.button} onClick={onBack}>← Back</button>
//       <div style={styles.card}>
//         <h2>{market.name}</h2>
//         <p><strong>Price:</strong> ₹{market.price}</p>
//         <p><strong>High:</strong> ₹{market.high}</p>
//         <p><strong>Low:</strong> ₹{market.low}</p>
//         <p><strong>Volume:</strong> {market.volume}</p>
//         <button style={styles.button} onClick={() => setShowBuySell("BUY")}>Buy</button>
//         <button style={styles.button} onClick={() => setShowBuySell("SELL")}>Sell</button>
//       </div>

//       {showBuySell && (
//         <div style={styles.modal}>
//           <h3>{showBuySell} {market.name}</h3>
//           <input type="number" placeholder="Quantity" style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
//           <button style={styles.button}>Confirm {showBuySell}</button>
//           <button style={styles.button} onClick={() => setShowBuySell(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MarketDetail;











import React, { useState } from "react";

function MarketDetail({ market, onBack }) {
  const [showBuySell, setShowBuySell] = useState(null);

  // mocked order book for the given market
  const bidOrders = [
    { price: 270.72, qty: 83 },
    { price: 270.71, qty: 71134 },
    { price: 270.62, qty: 1 },
    { price: 270.50, qty: 4 },
    { price: 270.45, qty: 7500 }
  ];
  const offerOrders = [
    { price: 271.01, qty: 1212 },
    { price: 271.21, qty: 16 },
    { price: 271.35, qty: 6601 },
    { price: 271.46, qty: 36 },
    { price: 271.46, qty: 3580 }
  ];

  return (
    <div style={{
      position:"fixed", left:0, top:0, width:"100vw", minHeight:"100vh",
      background:"rgba(247,249,250,0.96)", zIndex:2000,
      fontFamily: "'Inter', 'Roboto', sans-serif"
    }}>
      <div style={{
        maxWidth: 420, margin: "70px auto", padding: 32,
        background: "#fff", borderRadius: 12,
        boxShadow: "0 2px 18px rgba(44,66,161,.12)",
        position:"relative"
      }}>
        <button 
          onClick={onBack}
          style={{
            position:"absolute", left:24, top:24,
            fontSize:22, background:"none", border:0, color:"#2563eb", cursor:"pointer"
          }}
        >←</button>
        <div style={{textAlign:"center", marginBottom:17}}>
          <h2 style={{fontWeight:600, fontSize:21, marginBottom: 8}}>
            {market.name} <span style={{
              color:"#28b560", fontSize:15}}>NSE</span>
          </h2>
          <div style={{ fontWeight: 600, color: "#2563eb", fontSize: 22 }}>
            ₹{market.price}
            <span style={{
              fontSize:13, marginLeft:5,
              color: market.price > market.prevClose ? "#2dbb64" : "#dc2b3c"
            }}>
              +0.09 (0.03%) {/* Sample change */}
            </span>
          </div>
        </div>

        {/* Order Book */}
        <div style={{
          background: "#f5f8fa", borderRadius: 8, padding: "15px 15px 10px 15px",
          marginBottom: 12, boxShadow: "0 1px 4px 0 rgba(232,235,240,0.18)"
        }}>
          <div style={{
            display:"grid", gridTemplateColumns:"1.1fr 1fr 1.1fr 1fr",
            fontWeight:600, color:"#556176", fontSize: 14, marginBottom: 2
          }}>
            <span>Bid</span><span>Qty</span><span style={{paddingLeft:17}}>Offer</span><span>Qty</span>
          </div>
          {[0,1,2,3,4].map(i => (
            <div key={i}
              style={{
                display:"grid", gridTemplateColumns:"1.1fr 1fr 1.1fr 1fr",
                alignItems: "center",
                padding: "7px 0",
                color: "#333",
                fontSize: 14,
                fontFamily: "monospace monospace"
              }}>
              <span style={{ color: "#1673ff" }}>{bidOrders[i].price.toFixed(2)}</span>
              <span style={{ fontWeight: 700 }}>{bidOrders[i].qty}</span>
              <span style={{ color: "#e25530", paddingLeft:17 }}>{offerOrders[i].price.toFixed(2)}</span>
              <span style={{ fontWeight: 700 }}>{offerOrders[i].qty}</span>
            </div>
          ))}
        </div>

        <div style={{color:"#63718c", fontSize: 13, marginBottom: 8}}>
          <strong>High:</strong> ₹{market.high}&nbsp;&nbsp; 
          <strong>Low:</strong> ₹{market.low}&nbsp;&nbsp;
          <strong>Volume:</strong> {market.volume}
        </div>

        <div style={{display:"flex", gap:10, marginTop: 16}}>
          <button style={{
            flex:1, background:"#089981", color:"#fff", border:0,
            borderRadius:4, padding:"10px 0", fontWeight:500, fontSize:15, cursor:"pointer"
          }} onClick={() => setShowBuySell("BUY")}>Buy</button>
          <button style={{
            flex:1, background:"#e25530", color:"#fff", border:0,
            borderRadius:4, padding:"10px 0", fontWeight:500, fontSize:15, cursor:"pointer"
          }} onClick={() => setShowBuySell("SELL")}>Sell</button>
          <button style={{
            background:"#e9ecef", color:"#2b354f", border:0, borderRadius:4,
            padding:"10px 18px", fontWeight:500, fontSize:15, cursor:"pointer"
          }} onClick={onBack}>Close</button>
        </div>
      </div>

      {showBuySell && (
        <div style={{
          position:"fixed", zIndex:9999, left:0,top:0,right:0,bottom:0,
          background: "rgba(30, 43, 61, 0.14)"}}>
          <div style={{
            maxWidth: 340, background: "#fff", margin: "170px auto",
            borderRadius: 12, boxShadow:"0 3px 18px 0 rgba(0,0,0,.18)", padding: 22,
            textAlign:"center"
          }}>
            <h3 style={{margin:"2px 0 18px 0", fontWeight:600, fontSize:18}}>
              {showBuySell} {market.name}
            </h3>
            <input type="number" placeholder="Quantity"
              style={{
                border:"1px solid #e9ecef", borderRadius:6,
                width:"100%", fontSize: 16, padding:"10px 12px", marginBottom: 18
              }}
            />
            <button style={{
              background:"#2563eb", color:"#fff", border:0,
              borderRadius:5, padding:"11px 22px", fontWeight:600, fontSize:15, marginRight: 15, cursor:"pointer"
            }}>Confirm {showBuySell}</button>
            <button style={{
              background:"#fff", color:"#9fa8b3", border:0, borderRadius:5,
              boxShadow: "0 1px 3px #0001", padding:"11px 22px",
              fontWeight:600, fontSize:15, cursor:"pointer"
            }} onClick={() => setShowBuySell(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketDetail;
