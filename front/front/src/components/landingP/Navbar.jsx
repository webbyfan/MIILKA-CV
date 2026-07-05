import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [hoverLogin, setHoverLogin] = React.useState(false);
  const [hoverStart, setHoverStart] = React.useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "rgba(50, 50, 50, 0.5)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #ddd",
        zIndex: 50,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "16px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "8px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(to bottom right, #DA291C, #48fb81)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
            >
              M
            </span>
          </div>
          <span style={{ fontWeight: "bold", fontSize: "20px", color: "#111" }}>
            MilkaaCV
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <a
            href="#features"
            style={{
              color: "#f3ecec",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#111")}
            onMouseLeave={(e) => (e.target.style.color = "#f3ecec")}
          >
            Features
          </a>
          <a
            href="#ats"
            style={{
              color: "#f3ecec",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#111")}
            onMouseLeave={(e) => (e.target.style.color = "#f3ecec")}
          >
            ATS Checker
          </a>
          <a
            href="#pricing"
            style={{
              color: "#f3ecec",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#111")}
            onMouseLeave={(e) => (e.target.style.color = "#f3ecec")}
          >
            Pricing
          </a>
          <a
            href="#faq"
            style={{
              color: "#f3ecec",
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#111")}
            onMouseLeave={(e) => (e.target.style.color = "#f3ecec")}
          >
            FAQ
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: hoverLogin ? "#111" : "#f3ecec",
              border: "none",
              fontWeight: "500",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={() => setHoverLogin(true)}
            onMouseLeave={() => setHoverLogin(false)}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 24px",
              background: "linear-gradient(to right, #DA291C, #FCD116)",
              color: "black",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: hoverStart
                ? "0 20px 25px rgba(218, 41, 28, 0.3)"
                : "0 10px 15px rgba(218, 41, 28, 0.2)",
              transition: "all 0.3s",
              transform: hoverStart ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={() => setHoverStart(true)}
            onMouseLeave={() => setHoverStart(false)}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
