import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Menu items configuration
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", path: "/dashboard" },
    {
      id: "create",
      label: "Create Resume",
      icon: "✨",
      path: "/create-resume",
    },
    { id: "resumes", label: "My Resumes", icon: "📄", path: "/my-resumes" },
    { id: "tips", label: "ATS Tips", icon: "💡", path: "/ats-tips" },
    { id: "profile", label: "Profile", icon: "👤", path: "/profile" },
  ];

  // Handle menu item click
  const handleMenuClick = (path) => {
    navigate(path);
  };

  // Handle logout
  const handleLogout = () => {
    // TODO: Add logout API call later
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="logo-icon">M</span>
          {!isCollapsed && <span className="logo-text">MilkaaCV</span>}
        </div>
        <button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => handleMenuClick(item.path)}
            title={isCollapsed ? item.label : ""}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : ""}
        >
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span className="logout-label">Logout</span>}
        </button>
      </div>
    </div>
  );
}
