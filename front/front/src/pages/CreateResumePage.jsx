import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ResumeTemplate from "../components/ResumeTemplate";
import { createResume } from "../services/api";
import { exportElementToPdf } from "../utils/pdf";
import "../styles/CreateResume.css";

export default function CreateResumePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Resume Title/Name
    title: "",

    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    location: "",
    professionalTitle: "",

    // Professional Summary
    summary: "",

    // Work Experience
    experiences: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    // Education
    education: [{ school: "", degree: "", field: "", graduationYear: "" }],

    // Skills
    skills: "",

    // Template Selection
    templateId: "modern",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      experiences: newExperiences,
    }));
  };

  // Add new experience
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  // Remove experience
  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  // Add new education
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", field: "", graduationYear: "" },
      ],
    }));
  };

  // Remove education
  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Resume title is required";
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.professionalTitle.trim())
      newErrors.professionalTitle = "Professional title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare resume data for backend
      const resumeData = {
        title: formData.title,
        content: {
          personalInfo: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            professionalTitle: formData.professionalTitle,
            summary: formData.summary,
          },
          experiences: formData.experiences.filter(
            (exp) => exp.company || exp.position,
          ),
          education: formData.education.filter(
            (edu) => edu.school || edu.degree,
          ),
          skills: formData.skills
            .split("\n")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0),
          template: formData.templateId,
        },
      };

      // Call API to create resume
      const result = await createResume(resumeData);

      // Success
      alert("Resume created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating resume:", error);
      setSubmitError(
        error.response?.data?.error ||
          error.message ||
          "Failed to create resume. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    setSubmitError("");
    const previewElement = document.getElementById("resume-preview-pdf");

    if (!previewElement) {
      setSubmitError(
        "Unable to generate PDF preview. Please show preview first.",
      );
      return;
    }

    try {
      await exportElementToPdf(
        previewElement,
        `${formData.title || "resume"}.pdf`,
      );
    } catch (error) {
      console.error("Error exporting PDF:", error);
      setSubmitError(
        error.message || "Failed to download PDF. Please try again.",
      );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />

        <div className="create-resume-container">
          {/* Header Section */}
          <div className="create-resume-header">
            <button
              className="btn-back"
              onClick={() => navigate("/dashboard")}
              title="Back to dashboard"
            >
              ← Back to Dashboard
            </button>
            <h1>Create New Resume</h1>
            <p>Build your professional resume step by step</p>
          </div>

          {/* Preview Toggle Button */}
          <div className="preview-toggle">
            <button
              className={`btn-toggle-preview ${showPreview ? "active" : ""}`}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "📋 Hide Preview" : "👁️ Show Preview"}
            </button>
          </div>

          {/* Main Content - Split View */}
          <div
            className={`create-resume-wrapper ${showPreview ? "split-view" : ""}`}
          >
            {/* Form Section */}
            <div className="form-section">
              {/* Tab Navigation */}
              <div className="resume-tabs">
                <button
                  className={`tab ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => setActiveTab("personal")}
                >
                  👤 Personal Info
                </button>
                <button
                  className={`tab ${activeTab === "experience" ? "active" : ""}`}
                  onClick={() => setActiveTab("experience")}
                >
                  💼 Experience
                </button>
                <button
                  className={`tab ${activeTab === "education" ? "active" : ""}`}
                  onClick={() => setActiveTab("education")}
                >
                  🎓 Education
                </button>
                <button
                  className={`tab ${activeTab === "skills" ? "active" : ""}`}
                  onClick={() => setActiveTab("skills")}
                >
                  ⚡ Skills
                </button>
                <button
                  className={`tab ${activeTab === "template" ? "active" : ""}`}
                  onClick={() => setActiveTab("template")}
                >
                  🎨 Template
                </button>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="resume-form">
                {/* Submit Error Alert */}
                {submitError && (
                  <div className="alert alert-error">
                    <p>{submitError}</p>
                  </div>
                )}
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="tab-content personal-tab">
                    <h2>Personal Information</h2>

                    <div className="form-group">
                      <label htmlFor="title">Resume Title *</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Software Engineer - 2024"
                        className={errors.title ? "error" : ""}
                      />
                      {errors.title && (
                        <span className="error-text">{errors.title}</span>
                      )}
                      <p className="helper-text">
                        Give your resume a name to distinguish multiple versions
                      </p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={errors.fullName ? "error" : ""}
                      />
                      {errors.fullName && (
                        <span className="error-text">{errors.fullName}</span>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className={errors.email ? "error" : ""}
                        />
                        {errors.email && (
                          <span className="error-text">{errors.email}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+251 91 234 5678"
                          className={errors.phone ? "error" : ""}
                        />
                        {errors.phone && (
                          <span className="error-text">{errors.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="location">Location *</label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="New York, NY"
                          className={errors.location ? "error" : ""}
                        />
                        {errors.location && (
                          <span className="error-text">{errors.location}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="professionalTitle">
                          Professional Title *
                        </label>
                        <input
                          type="text"
                          id="professionalTitle"
                          name="professionalTitle"
                          value={formData.professionalTitle}
                          onChange={handleInputChange}
                          placeholder="Senior Software Engineer"
                          className={errors.professionalTitle ? "error" : ""}
                        />
                        {errors.professionalTitle && (
                          <span className="error-text">
                            {errors.professionalTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="summary">Professional Summary</label>
                      <textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleInputChange}
                        placeholder="Brief overview of your professional background and goals..."
                        rows="4"
                      />
                    </div>

                    <button
                      type="button"
                      className="btn-next"
                      onClick={() => setActiveTab("experience")}
                    >
                      Next: Experience →
                    </button>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                  <div className="tab-content experience-tab">
                    <h2>Work Experience</h2>

                    {formData.experiences.map((exp, index) => (
                      <div key={index} className="experience-block">
                        <div className="block-header">
                          <h3>Position {index + 1}</h3>
                          {formData.experiences.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove"
                              onClick={() => removeExperience(index)}
                              title="Remove this experience"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Company Name</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "company",
                                  e.target.value,
                                )
                              }
                              placeholder="Tech Corp Inc."
                            />
                          </div>

                          <div className="form-group">
                            <label>Job Position</label>
                            <input
                              type="text"
                              value={exp.position}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "position",
                                  e.target.value,
                                )
                              }
                              placeholder="Software Engineer"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Start Date</label>
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label>End Date</label>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              placeholder="Leave blank if current"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Job Description / Achievements</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                            placeholder="• Describe your responsibilities and achievements&#10;• Use bullet points for clarity"
                            rows="4"
                          />
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn-add"
                      onClick={addExperience}
                    >
                      + Add Another Position
                    </button>

                    <div className="tab-navigation">
                      <button
                        type="button"
                        className="btn-prev"
                        onClick={() => setActiveTab("personal")}
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        className="btn-next"
                        onClick={() => setActiveTab("education")}
                      >
                        Next: Education →
                      </button>
                    </div>
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <div className="tab-content education-tab">
                    <h2>Education</h2>

                    {formData.education.map((edu, index) => (
                      <div key={index} className="education-block">
                        <div className="block-header">
                          <h3>Education {index + 1}</h3>
                          {formData.education.length > 1 && (
                            <button
                              type="button"
                              className="btn-remove"
                              onClick={() => removeEducation(index)}
                              title="Remove this education"
                            >
                              ✕
                            </button>
                          )}
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>School / University</label>
                            <input
                              type="text"
                              value={edu.school}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "school",
                                  e.target.value,
                                )
                              }
                              placeholder="Harvard University"
                            />
                          </div>

                          <div className="form-group">
                            <label>Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "degree",
                                  e.target.value,
                                )
                              }
                              placeholder="Bachelor of Science"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label>Field of Study</label>
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "field",
                                  e.target.value,
                                )
                              }
                              placeholder="Computer Science"
                            />
                          </div>

                          <div className="form-group">
                            <label>Graduation Year</label>
                            <input
                              type="number"
                              value={edu.graduationYear}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "graduationYear",
                                  e.target.value,
                                )
                              }
                              placeholder="2020"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn-add"
                      onClick={addEducation}
                    >
                      + Add Another Education
                    </button>

                    <div className="tab-navigation">
                      <button
                        type="button"
                        className="btn-prev"
                        onClick={() => setActiveTab("experience")}
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        className="btn-next"
                        onClick={() => setActiveTab("skills")}
                      >
                        Next: Skills →
                      </button>
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <div className="tab-content skills-tab">
                    <h2>Skills</h2>

                    <div className="form-group">
                      <label htmlFor="skills">List Your Skills</label>
                      <textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        placeholder="Enter skills separated by commas or new lines&#10;Example: JavaScript, React, Node.js, Python, SQL, Docker, AWS"
                        rows="6"
                      />
                      <p className="helper-text">
                        Tip: Add relevant technical and soft skills that match
                        the job description
                      </p>
                    </div>

                    <div className="tab-navigation">
                      <button
                        type="button"
                        className="btn-prev"
                        onClick={() => setActiveTab("education")}
                      >
                        ← Previous
                      </button>
                      <button
                        type="button"
                        className="btn-next"
                        onClick={() => setActiveTab("template")}
                      >
                        Next: Template →
                      </button>
                    </div>
                  </div>
                )}

                {/* Template Tab */}
                {activeTab === "template" && (
                  <div className="tab-content template-tab">
                    <h2>Choose Template</h2>

                    <div className="template-grid">
                      <div
                        className={`template-card ${formData.templateId === "modern" ? "selected" : ""}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            templateId: "modern",
                          }))
                        }
                      >
                        <div className="template-preview modern-template">
                          <div className="template-line"></div>
                          <div className="template-line short"></div>
                          <div className="template-line"></div>
                          <div className="template-line short"></div>
                        </div>
                        <h3>Modern</h3>
                        <p>Clean and contemporary design</p>
                      </div>

                      <div
                        className={`template-card ${formData.templateId === "classic" ? "selected" : ""}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            templateId: "classic",
                          }))
                        }
                      >
                        <div className="template-preview classic-template">
                          <div className="template-header"></div>
                          <div className="template-line"></div>
                          <div className="template-line"></div>
                        </div>
                        <h3>Classic</h3>
                        <p>Traditional professional style</p>
                      </div>

                      <div
                        className={`template-card ${formData.templateId === "creative" ? "selected" : ""}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            templateId: "creative",
                          }))
                        }
                      >
                        <div className="template-preview creative-template">
                          <div className="template-accent"></div>
                          <div className="template-line"></div>
                          <div className="template-line short"></div>
                        </div>
                        <h3>Creative</h3>
                        <p>Bold and visually appealing</p>
                      </div>

                      <div
                        className={`template-card ${formData.templateId === "minimal" ? "selected" : ""}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            templateId: "minimal",
                          }))
                        }
                      >
                        <div className="template-preview minimal-template">
                          <div className="template-line"></div>
                          <div className="template-line"></div>
                          <div className="template-line"></div>
                        </div>
                        <h3>Minimal</h3>
                        <p>Simple and elegant layout</p>
                      </div>
                    </div>

                    <div className="tab-navigation">
                      <button
                        type="button"
                        className="btn-prev"
                        onClick={() => setActiveTab("skills")}
                      >
                        ← Previous
                      </button>
                    </div>

                    <div className="form-actions">
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => navigate("/dashboard")}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                      >
                        {loading ? "Creating..." : "✓ Create Resume"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Preview Section */}
            {showPreview && (
              <div className="preview-section">
                <div className="preview-header">
                  <div>
                    <h3>Resume Preview</h3>
                    <p className="preview-subtitle">
                      Template:{" "}
                      <strong>{formData.templateId.toUpperCase()}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-secondary download-preview-btn"
                    onClick={handleDownloadPdf}
                  >
                    ⬇️ Download PDF
                  </button>
                </div>
                <div className="preview-content" id="resume-preview-pdf">
                  <ResumeTemplate
                    data={{
                      personalInfo: {
                        fullName: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        location: formData.location,
                        professionalTitle: formData.professionalTitle,
                        summary: formData.summary,
                      },
                      experiences: formData.experiences,
                      education: formData.education,
                      skills: formData.skills,
                    }}
                    templateId={formData.templateId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
