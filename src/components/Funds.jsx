import React from 'react';

export default function FundsPage() {
  const equityData = [
    { label: 'Available margin', value: 0 },
    { label: 'Used margin', value: 0 },
    { label: 'Available cash', value: 0 },
    { label: 'Opening balance', value: 0 },
    { label: 'Payin', value: 0 },
    { label: 'Payout', value: 0 },
    { label: 'SPAN', value: 0 },
    { label: 'Delivery margin', value: 0 },
    { label: 'Exposure', value: 0 },
    { label: 'Options premium', value: 0 },
    { label: 'Collateral (Liquid funds)', value: 0 }
  ];

  const commodityData = [
    { label: 'Available margin', value: 0 },
    { label: 'Used margin', value: 0 },
    { label: 'Available cash', value: 0 },
    { label: 'Opening balance', value: 0 },
    { label: 'Payin', value: 0 },
    { label: 'Payout', value: 0 },
    { label: 'SPAN', value: 0 },
    { label: 'Delivery margin', value: 0 },
    { label: 'Exposure', value: 0 },
    { label: 'Options premium', value: 0 },
    { label: 'Collateral (Liquid funds)', value: 0 }
  ];

  const containerStyle = {
    display: 'flex',
    gap: '50px',
    padding: '40px',
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSize: '16px',
    color: '#263238',
    background: '#fafbfc',
    minHeight: "100vh"
  };

  const sectionStyle = {
    flex: 1,
    boxShadow: '0 3px 8px rgb(0 0 0 / 10%)',
    borderRadius: '12px',
    background: '#fff',
    padding: '24px'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #e3e3e3'
  };

  const labelStyle = {
    fontWeight: 500
  };

  const valueStyle = {
    fontWeight: 600
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '16px'
  };

  const addFundsBtn = {
    ...buttonStyle,
    backgroundColor: '#73cf42',
    color: 'white',
    marginRight: '20px'
  };

  const withdrawBtn = {
    ...buttonStyle,
    backgroundColor: '#1e87f0',
    color: 'white'
  };

  return (
    <div>
      <div style={{ padding: '40px 60px 20px 60px', fontWeight: 500, color: '#718096', fontSize: '14px' }}>
        Instant, zero-cost fund transfers with <span style={{ fontWeight: 700 }}>UPI</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 60px 20px 60px' }}>
        <button style={addFundsBtn} onClick={() => alert('Add Funds clicked!')}>Add funds</button>
        <button style={withdrawBtn} onClick={() => alert('Withdraw clicked!')}>Withdraw</button>
      </div>

      <div style={containerStyle}>
        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ margin: 0, marginRight: 12, color: '#263238', fontSize: 22, fontWeight: 600 }}>Equity</h2>
            <div style={{ color: '#254eaa', fontWeight: "600", marginRight: 16, fontSize: "15px", cursor: "pointer" }}>● View statement</div>
            <div style={{ color: '#254eaa', fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>● Help</div>
          </div>
          {equityData.map((item, index) => (
            <div key={index} style={rowStyle}>
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>₹{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: "center", marginBottom: 18 }}>
            <h2 style={{ margin: 0, marginRight: 12, color: '#263238', fontSize: 22, fontWeight: 600 }}>Commodity</h2>
            <div style={{ color: '#254eaa', fontWeight: "600", marginRight: 16, fontSize: "15px", cursor: "pointer" }}>● View statement</div>
            <div style={{ color: '#254eaa', fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>● Help</div>
          </div>
          {commodityData.map((item, index) => (
            <div
              key={index}
              style={{
                ...rowStyle,
                backgroundColor: item.label === "Available cash" ? "#f2f6fa" : "transparent"
              }}
            >
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>₹{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
