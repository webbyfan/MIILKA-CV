import React from "react";
import "../styles/ATSCard.css";

// Reusable ATS Tips Card Component
export default function ATSCard({ tip }) {
  return (
    <div className="ats-card">
      <div className="ats-card-header">
        <h4 className="ats-card-title">{tip.title}</h4>
      </div>
      <p className="ats-card-description">{tip.description}</p>
    </div>
  );
}
