import React from "react";
import Navbar from "../components/landingP/Navbar";
import Hero from "../components/landingP/Hero";
import Footer from "../components/landingP/Footer";
import "../App.css";

export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = React.useState(null);

  return (
    <div>
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section style={{ padding: "80px 24px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "16px",
              }}
            >
              Powerful Features
            </h2>
            <p
              style={{
                fontSize: "20px",
                color: "#666",
                maxWidth: "672px",
                margin: "0 auto",
              }}
            >
              Everything you need to create a professional resume that gets you
              hired
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "⚡ AI-Powered Writing",
                desc: "Let AI improve your bullet points professionally",
              },
              {
                title: "🧠 Smart ATS Optimization",
                desc: "Pass through Applicant Tracking Systems",
              },
              {
                title: "📐 Modern Templates",
                desc: "Beautiful, ATS-safe templates for everyone",
              },
              {
                title: "📄 Easy Builder",
                desc: "Drag & drop interface—super simple",
              },
              {
                title: "🛡️ ATS-Safe Guarantee",
                desc: "No tables, icons, or complex formatting",
              },
              {
                title: "📊 Real-time Feedback",
                desc: "Get instant suggestions to improve",
              },
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  padding: "24px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9fafb",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#DA291C";
                  e.currentTarget.style.boxShadow =
                    "0 10px 15px rgba(218, 41, 28, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#ddd";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#111",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666" }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Checker Section */}
      <section
        id="ats"
        style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "48px",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#111",
                  marginBottom: "24px",
                }}
              >
                ATS-Optimized for Success
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                  marginBottom: "32px",
                  lineHeight: "1.6",
                }}
              >
                75% of resumes never reach human eyes. Our ATS Checker ensures
                your resume passes through Applicant Tracking Systems.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  {
                    title: "No Complex Formatting",
                    desc: "Clean layouts that every ATS can read",
                  },
                  {
                    title: "Keyword Optimization",
                    desc: "AI suggests keywords from job descriptions",
                  },
                  {
                    title: "Structure Analysis",
                    desc: "Detects issues like tables and icons",
                  },
                  {
                    title: "Compatibility Score",
                    desc: "Get real-time ATS compatibility %",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px" }}>
                    <span
                      style={{
                        color: "#16a34a",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      ✓
                    </span>
                    <div>
                      <p
                        style={{
                          fontWeight: "600",
                          color: "#111",
                          marginBottom: "4px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p style={{ fontSize: "14px", color: "#666" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 20px 25px rgba(0,0,0,0.1)",
                padding: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#111",
                  marginBottom: "24px",
                }}
              >
                ATS Compatibility
              </h3>
              <div
                style={{
                  background:
                    "linear-gradient(to bottom right, #f0fdf4, #ecfdf5)",
                  borderRadius: "8px",
                  padding: "24px",
                  marginBottom: "24px",
                  border: "1px solid #bbf7d0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    marginBottom: "8px",
                  }}
                >
                  Your ATS Score
                </p>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    color: "#16a34a",
                    marginBottom: "8px",
                  }}
                >
                  94%
                </div>
                <p style={{ fontSize: "14px", color: "#059669" }}>
                  Excellent - Ready to Submit!
                </p>
              </div>
              {[
                { label: "Format", score: 100 },
                { label: "Keywords", score: 88 },
                { label: "Structure", score: 95 },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    <span>{item.label}</span>
                    <span>{item.score}%</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: item.score + "%",
                        height: "100%",
                        backgroundColor:
                          item.score >= 90 ? "#22c55e" : "#eab308",
                        transition: "width 0.3s",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        style={{ padding: "80px 24px", backgroundColor: "#fff" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "16px",
              }}
            >
              Affordable Plans for Students
            </h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Get started free. Upgrade only when you're ready.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "1 Resume",
                  "Basic Templates",
                  "PDF Export",
                  "Basic ATS Checker",
                  "Perfect for Students",
                ],
              },
              {
                name: "Professional",
                price: "200ETB",
                featured: true,
                features: [
                  "Unlimited Resumes",
                  "All Templates",
                  "AI Writing Assistance",
                  "Advanced ATS Checker",
                  "Real-time Feedback",
                  "Priority Support",
                ],
              },
              {
                name: "Elite",
                price: "500ETB",
                features: [
                  "Everything in Pro",
                  "Portfolio Generator",
                  "LinkedIn Optimization",
                  "Interview Prep",
                  "Resume Analytics",
                  "1-on-1 Support",
                ],
              },
            ].map((plan, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  border: plan.featured ? "none" : "1px solid #ddd",
                  borderRadius: "12px",
                  backgroundColor: plan.featured ? "#DA291C" : "#fff",
                  color: plan.featured ? "white" : "#111",
                  position: "relative",
                  transform: plan.featured ? "scale(1.05)" : "scale(1)",
                  boxShadow: plan.featured
                    ? "0 20px 25px rgba(218, 41, 28, 0.3)"
                    : "none",
                }}
              >
                {plan.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#facc15",
                      color: "#78350f",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  {plan.name}
                </h3>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                  }}
                >
                  {plan.price}
                </div>
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                    marginBottom: "24px",
                    backgroundColor: plan.featured ? "white" : "#DA291C",
                    color: plan.featured ? "#DA291C" : "white",
                    transition: "all 0.3s",
                  }}
                >
                  Get Started
                </button>
                {plan.features.map((feature, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "12px",
                      fontSize: "14px",
                    }}
                  >
                    <span>✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}
      >
        <div style={{ maxWidth: "768px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#111",
                marginBottom: "16px",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Find answers to common questions about MilkaaCV
            </p>
          </div>
          {[
            {
              q: "What makes MilkaaCV different?",
              a: "MilkaaCV combines AI-powered writing with ATS optimization. Our templates pass every ATS system and we provide real-time suggestions.",
            },
            {
              q: "Is my data secure?",
              a: "Yes, all resumes are encrypted and stored securely. Your data is never shared with third parties.",
            },
            {
              q: "Can I export as PDF?",
              a: "Absolutely! All plans include PDF export with perfect formatting and ATS compatibility.",
            },
            {
              q: "What is the ATS score?",
              a: "The ATS score shows how well your resume will be parsed by Applicant Tracking Systems. A score of 85%+ is excellent.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginBottom: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 24px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <p style={{ fontWeight: "600", color: "#111" }}>{item.q}</p>
                <span
                  style={{
                    transform:
                      expandedFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  +
                </span>
              </div>
              {expandedFaq === i && (
                <div
                  style={{
                    padding: "24px",
                    backgroundColor: "#f9fafb",
                    borderTop: "1px solid #ddd",
                  }}
                >
                  <p style={{ color: "#666", lineHeight: "1.6" }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(to right, #DA291C, #078930)",
          padding: "80px 24px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Ready to Land Your Dream Job?
          </h2>
          <p style={{ fontSize: "18px", marginBottom: "32px", opacity: 0.9 }}>
            Join thousands of job seekers who have created resumes that get
            results.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                padding: "16px 32px",
                backgroundColor: "white",
                color: "#DA291C",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Start For Free
            </button>
            <button
              style={{
                padding: "16px 32px",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
