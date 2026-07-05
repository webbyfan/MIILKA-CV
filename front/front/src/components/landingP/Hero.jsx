import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [hoverStart, setHoverStart] = React.useState(false);
  const [hoverDemo, setHoverDemo] = React.useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, white, #f9fafb)",
        paddingTop: "96px",
        paddingBottom: "64px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#43413a",
              color: "#c9f505f4",
              padding: "8px 16px",
              borderRadius: "9999px",
              marginBottom: "24px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            ✨ AI-Powered Resume Builder
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 8vw, 72px)",
              fontWeight: "bold",
              color: "#111",
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
          >
            Build Your Professional Resume
            <span
              style={{
                background: "linear-gradient(to right, #DA291C, #078930)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}
              in Minutes
            </span>
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#666",
              maxWidth: "672px",
              margin: "0 auto 32px",
              lineHeight: "1.6",
            }}
          >
            Built for Ethiopian students and fresh graduates. Create an
            ATS-friendly resume that actually gets you hired. No experience
            needed—our AI will help you shine.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              marginBottom: "48px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => navigate("/login")}
              onMouseEnter={() => setHoverStart(true)}
              onMouseLeave={() => setHoverStart(false)}
              style={{
                padding: "16px 32px",
                background: "linear-gradient(to right, #DA291C, #FCD116)",
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: hoverStart
                  ? "0 20px 25px rgba(218, 41, 28, 0.3)"
                  : "0 10px 15px rgba(218, 41, 28, 0.2)",
                transform: hoverStart ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
                fontSize: "16px",
              }}
            >
              Start Building Now →
            </button>

            <button
              onMouseEnter={() => setHoverDemo(true)}
              onMouseLeave={() => setHoverDemo(false)}
              style={{
                padding: "16px 32px",
                border: "2px solid #ddd",
                backgroundColor: hoverDemo ? "#f9fafb" : "white",
                color: "#111",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "16px",
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "64px",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "bold",
                color: "#DA291C",
              }}
            >
              50K+
            </div>
            <div style={{ color: "#666", fontSize: "16px" }}>
              Resumes Created
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "bold",
                color: "#078930",
              }}
            >
              92%
            </div>
            <div style={{ color: "#666", fontSize: "16px" }}>ATS Pass Rate</div>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "bold",
                color: "#FCD116",
              }}
            >
              4.9★
            </div>
            <div style={{ color: "#666", fontSize: "16px" }}>User Rating</div>
          </div>
        </div>

        {/* Hero Image/Preview */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(to bottom right, rgba(218, 41, 28, 0.1), rgba(7, 137, 48, 0.1))",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid rgba(218, 41, 28, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "32px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111",
                      marginBottom: "4px",
                    }}
                  >
                    John Doe
                  </h3>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    Full Stack Developer | San Francisco, CA
                  </p>
                </div>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(to bottom right, #DA291C, #FCD116)",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  borderTop: "1px solid #ddd",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    EXPERIENCE
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111",
                    }}
                  >
                    5+ Years
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    SKILLS
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111",
                    }}
                  >
                    15+
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    ATS SCORE
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#16a34a",
                    }}
                  >
                    98%
                  </p>
                </div>
              </div>

              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: "1.6",
                  }}
                >
                  <strong>Professional Summary:</strong> Experienced Full Stack
                  Developer with expertise in React, Node.js, and MongoDB.
                  Passionate about building scalable applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
