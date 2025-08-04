import React, { useState, useMemo } from "react";

const ORDER_TYPES = ["All", "Regular", "Cover", "BO"];
const TRANSACTION_TYPES = {
  BUY: "BUY",
  SELL: "SELL",
};

const dummyOrders = [
  {
    id: 1,
    symbol: "INFY",
    orderType: "Regular",
    transactionType: TRANSACTION_TYPES.BUY,
    quantity: 100,
    price: 1452.5,
    status: "Complete",
    orderDate: "2025-08-01 10:30 AM",
  },
  {
    id: 2,
    symbol: "TCS",
    orderType: "BO",
    transactionType: TRANSACTION_TYPES.SELL,
    quantity: 50,
    price: 3005.0,
    status: "Cancelled",
    orderDate: "2025-08-02 11:15 AM",
  },
  {
    id: 3,
    symbol: "SBIN",
    orderType: "Cover",
    transactionType: TRANSACTION_TYPES.BUY,
    quantity: 200,
    price: 588.0,
    status: "Pending",
    orderDate: "2025-08-02 02:00 PM",
  },
  {
    id: 4,
    symbol: "RELIANCE",
    orderType: "Regular",
    transactionType: TRANSACTION_TYPES.SELL,
    quantity: 30,
    price: 2500.0,
    status: "Complete",
    orderDate: "2025-07-30 09:45 AM",
  },
];

// Utility color for transaction type and status


export default function OrdersPage() {
  const [filterOrderType, setFilterOrderType] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "orderDate", direction: "desc" });

  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      const orderTypeMatch = filterOrderType === "All" || order.orderType === filterOrderType;
      const searchMatch =
        order.symbol.toLowerCase().includes(searchText.toLowerCase()) ||
        order.status.toLowerCase().includes(searchText.toLowerCase());

      return orderTypeMatch && searchMatch;
    });
  }, [filterOrderType, searchText]);

  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders];
    sorted.sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      // For orderDate we convert to Date for sort
      if (sortConfig.key === "orderDate") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredOrders, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div
      style={{
        backgroundColor: "#fafbfc",
        minHeight: "100vh",
        padding: "24px 40px",
        fontFamily: "'Inter', 'Roboto', sans-serif",
        color: "#262626",
      }}
    >
      <h2 style={{ marginBottom: 16, fontWeight: 600, fontSize: 22 }}>Orders</h2>

      {/* Order Type Filter */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {ORDER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setFilterOrderType(type)}
            style={{
              padding: "8px 18px",
              borderRadius: 20,
              border: "1.5px solid",
              borderColor: filterOrderType === type ? "#fa8231" : "#d9dbe0",
              backgroundColor: filterOrderType === type ? "#fa8231" : "transparent",
              color: filterOrderType === type ? "white" : "#374c7f",
              fontWeight: 600,
              cursor: "pointer",
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            {type}
          </button>
        ))}

        {/* Search box */}
        <input
          type="text"
          placeholder="Search symbol or status..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            marginLeft: "auto",
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #d9dbe0",
            fontSize: 15,
            fontWeight: 500,
            minWidth: 240,
            outline: "none",
          }}
        />
      </div>

      {/* Orders table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #eceef2", color: "#6e6e73", fontWeight: 600 }}>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "left" }}
              onClick={() => requestSort("symbol")}
            >
              Symbol
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "left" }}
              onClick={() => requestSort("orderType")}
            >
              Type
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "left" }}
              onClick={() => requestSort("transactionType")}
            >
              Transaction
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }}
              onClick={() => requestSort("quantity")}
            >
              Qty
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "right" }}
              onClick={() => requestSort("price")}
            >
              Price (₹)
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "left" }}
              onClick={() => requestSort("status")}
            >
              Status
            </th>
            <th
              style={{ cursor: "pointer", padding: "12px 10px", textAlign: "left" }}
              onClick={() => requestSort("orderDate")}
            >
              Order Date/Time
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map((order) => (
            <tr key={order.id} style={{ borderBottom: "1px solid #f0f0f2" }}>
              <td style={{ padding: "12px 10px", fontWeight: 600 }}>{order.symbol}</td>
              <td style={{ padding: "12px 10px" }}>{order.orderType}</td>
              <td style={{ padding: "12px 10px", color: getTransactionColor(order.transactionType), fontWeight: 600 }}>
                {order.transactionType}
              </td>
              <td style={{ padding: "12px 10px", textAlign: "right" }}>{order.quantity}</td>
              <td style={{ padding: "12px 10px", textAlign: "right" }}>{order.price.toFixed(2)}</td>
              <td style={{ padding: "12px 10px", color: getStatusColor(order.status) }}>{order.status}</td>
              <td style={{ padding: "12px 10px" }}>{order.orderDate}</td>
            </tr>
          ))}
          {sortedOrders.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 30, color: "#999" }}>
                No matching orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function getTransactionColor(type) {
  return type === "BUY" ? "#2dbb64" : "#dc2b3c";
}

function getStatusColor(status) {
  switch (status) {
    case "Complete":
      return "#2dbb64";
    case "Cancelled":
      return "#dc2b3c";
    case "Pending":
      return "#f2a516";
    default:
      return "#757e8c";
  }
}
