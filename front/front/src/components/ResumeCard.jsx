import React from "react";
import "../styles/ResumeCard.css";

// Reusable Resume Card Component
export default function ResumeCard({ resume, onView, onEdit, onDelete }) {
  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="resume-card">
      {/* Resume Icon & Title */}
      <div className="resume-header">
        <div className="resume-icon">📄</div>
        <div className="resume-info">
          <h4 className="resume-title">{resume.title}</h4>
          <p className="resume-date">
            Updated: {formatDate(resume.lastUpdated)}
          </p>
        </div>
      </div>

      {/* ATS Score */}
      <div className="resume-ats">
        <span className="ats-label">ATS Score:</span>
        <div className="ats-score-container">
          <div className="ats-progress">
            <div
              className="ats-progress-bar"
              style={{ width: `${resume.atsScore}%` }}
            ></div>
          </div>
          <span className="ats-value">{resume.atsScore}%</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="resume-actions">
        <button
          className="btn btn-view"
          onClick={() => onView(resume._id)}
          title="View this resume"
        >
          👁️ View
        </button>
        <button
          className="btn btn-edit"
          onClick={() => onEdit(resume._id)}
          title="Edit this resume"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(resume._id)}
          title="Delete this resume"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
