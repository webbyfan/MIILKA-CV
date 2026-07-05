import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import ResumeCard from "../components/ResumeCard";
import ATSCard from "../components/ATSCard";
import {
  getResumes,
  getAtsTips,
  deleteResume,
  getUserProfile,
} from "../services/api";
import "../styles/Dashboard.css";

export default function DashboardPage() {
  const navigate = useNavigate();

  // State management
  const [resumes, setResumes] = useState([]);
  const [tips, setTips] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check token and fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch user, resumes, and ATS tips
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await getUserProfile();
      const resumesData = await getResumes();
      const tipsData = await getAtsTips();

      setUser(userData);
      setResumes(resumesData || []);
      setTips(tipsData || []);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.response?.data?.error || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate average ATS score
  const averageAtsScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((sum, r) => sum + r.atsScore, 0) / resumes.length,
        )
      : 0;

  // Handle create new resume
  const handleCreateResume = () => {
    // TODO: Navigate to create resume page when implemented
    navigate("/create-resume");
  };

  // Handle edit resume
  const handleEditResume = (resumeId) => {
    // TODO: Navigate to edit resume page with ID when implemented
    navigate(`/edit-resume/${resumeId}`);
  };

  // Handle delete resume
  const handleDeleteResume = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(resumeId);
        setResumes(resumes.filter((r) => r.id !== resumeId));
      } catch (error) {
        console.error("Error deleting resume:", error);
        alert("Failed to delete resume");
      }
    }
  };

  // Handle download resume
  const handleDownloadResume = (resumeId) => {
    // TODO: Implement download functionality when backend is ready
    alert("Download feature coming soon!");
  };

  // Handle improve with AI
  const handleImproveWithAI = () => {
    // TODO: Implement AI improvement feature when backend is ready
    alert("AI improvement feature coming soon!");
  };

  if (error) {
    return (
      <div className="dashboard-error">
        <p>⚠️ {error}</p>
        <button onClick={fetchDashboardData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-content">
                <h2 className="welcome-heading">
                  Ready to build your ATS-friendly resume?
                </h2>
                <p className="welcome-description">
                  Create professional resumes optimized for Applicant Tracking
                  Systems to increase your chances of landing internships and
                  jobs.
                </p>
              </div>
              <button className="btn-primary" onClick={handleCreateResume}>
                ✨ Create New Resume
              </button>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="stats-section">
            <h3 className="section-title">Your Resume Statistics</h3>
            <div className="stats-grid">
              <StatsCard
                icon="📄"
                label="Total Resumes"
                value={resumes.length}
                trend={{ type: "up", value: "+2 this month" }}
              />
              <StatsCard
                icon="🎯"
                label="Average ATS Score"
                value={`${averageAtsScore}%`}
                trend={{ type: "up", value: "+5% improvement" }}
              />
              <StatsCard
                icon="⬇️"
                label="Total Downloads"
                value="12"
                trend={{ type: "up", value: "+4 this month" }}
              />
            </div>
          </section>

          {/* Recent Resumes Section */}
          <section className="resumes-section">
            <h3 className="section-title">Your Recent Resumes</h3>
            {loading ? (
              <div className="loading-spinner">Loading resumes...</div>
            ) : resumes.length > 0 ? (
              <div className="resumes-grid">
                {resumes.map((resume) => (
                  <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onEdit={handleEditResume}
                    onDelete={handleDeleteResume}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>📭 No resumes yet</p>
                <button className="btn-secondary" onClick={handleCreateResume}>
                  Create your first resume
                </button>
              </div>
            )}
          </section>

          {/* ATS Tips Section */}
          <section className="tips-section">
            <h3 className="section-title">ATS Tips & Best Practices</h3>
            <div className="tips-grid">
              {tips.map((tip) => (
                <ATSCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>

          {/* Quick Actions Section */}
          <section className="quick-actions-section">
            <h3 className="section-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <button
                className="quick-action-btn create-btn"
                onClick={handleCreateResume}
              >
                <span className="action-icon">✨</span>
                <span className="action-label">Create Resume</span>
              </button>
              <button
                className="quick-action-btn download-btn"
                onClick={() => handleDownloadResume(resumes[0]?.id)}
                disabled={resumes.length === 0}
              >
                <span className="action-icon">⬇️</span>
                <span className="action-label">Download Resume</span>
              </button>
              <button
                className="quick-action-btn improve-btn"
                onClick={handleImproveWithAI}
              >
                <span className="action-icon">🤖</span>
                <span className="action-label">Improve with AI</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
