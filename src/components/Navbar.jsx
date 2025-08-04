import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ userId, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "15px 30px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <img
          src="https://zerodha.com/static/images/logo.svg"
          alt="Logo"
          style={{ height: "25px" }}
        />
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontWeight: "500",
            color: "#444",
          }}
        >
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/holdings">Holdings</Link>
          </li>
          <li>
            <Link to="/positions">Positions</Link>
          </li>
          <li>
            <Link to="/bids">Bids</Link>
          </li>
          <li>
            <Link to="/funds">Funds</Link>
          </li>
        </ul>
      </div>

      <div style={{ display: "flex", gap: "15px", alignItems: "center", fontWeight: "600" }}>
        {userId ? (
          <>
            <span>Welcome, {userId}</span>
            <button
              onClick={() => {
                if (onLogout) onLogout();
                navigate("/");
              }}
              style={{
                backgroundColor: "#e53e3e",
                border: "none",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span>🛒</span>
            <span
              style={{
                backgroundColor: "#eee",
                padding: "8px",
                borderRadius: "50%",
              }}
            >
              N
            </span>
            <span>QGC282</span>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
