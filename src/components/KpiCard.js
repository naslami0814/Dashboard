import React from 'react';
import './KpiCard.css'; // Styling for this component

function KpiCard({ title, value, icon, color }) {
  return (
    <div className="kpi-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="kpi-icon" style={{ color: color }}>
        {icon}
      </div>
      <div className="kpi-content">
        <h3 className="kpi-title">{title}</h3>
        <p className="kpi-value">{value}</p>
      </div>
    </div>
  );
}

export default KpiCard;
