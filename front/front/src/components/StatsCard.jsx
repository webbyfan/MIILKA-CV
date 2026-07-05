import React from "react";
import "../styles/StatsCard.css";

// Reusable Statistics Card Component
export default function StatsCard({ icon, label, value, trend }) {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>

      <div className="stats-content">
        <p className="stats-label">{label}</p>
        <h3 className="stats-value">{value}</h3>
      </div>

      {/* Trend indicator (optional) */}
      {trend && (
        <div className={`stats-trend ${trend.type}`}>
          <span className="trend-icon">
            {trend.type === "up" ? "📈" : "📉"}
          </span>
          <span className="trend-text">{trend.value}</span>
        </div>
      )}
    </div>
  );
}
