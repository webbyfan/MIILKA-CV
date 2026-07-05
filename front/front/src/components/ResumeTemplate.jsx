import React, { useEffect, useRef, useState } from "react";
import "../styles/ResumeTemplates.css";

/**
 * ResumeTemplate Component
 * Renders resume in selected template format
 * Props:
 *   - data: object containing resume data (personalInfo, experiences, education, skills)
 *   - templateId: string identifying which template to render
 *
 * Adding new templates: Add a new case in the switch statement below
 */

export default function ResumeTemplate({ data, templateId = "modern" }) {
  if (!data) {
    return <div className="resume-preview">No resume data</div>;
  }

  const {
    personalInfo = {},
    experiences = [],
    education = [],
    skills = [],
  } = data;

  const fileInputRef = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(personalInfo.photo || "");
  const previousObjectUrl = useRef("");

  useEffect(() => {
    setPhotoUrl(personalInfo.photo || "");
  }, [personalInfo.photo]);

  useEffect(() => {
    if (
      previousObjectUrl.current &&
      previousObjectUrl.current.startsWith("blob:") &&
      previousObjectUrl.current !== photoUrl
    ) {
      URL.revokeObjectURL(previousObjectUrl.current);
    }
    previousObjectUrl.current = photoUrl;

    return () => {
      if (previousObjectUrl.current.startsWith("blob:")) {
        URL.revokeObjectURL(previousObjectUrl.current);
      }
    };
  }, [photoUrl]);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  // Convert skills array to formatted string if needed
  const skillsText = Array.isArray(skills) ? skills.join(" • ") : skills;

  // ============================================
  // MODERN TEMPLATE
  // ============================================
  const ModernTemplate = () => (
    <div className="resume-template modern-template">
      {/* Header */}
      <div className="template-header modern-header">
        <div className="modern-header-left">
          <h1 className="candidate-name">{personalInfo.fullName}</h1>
          <p className="professional-title">{personalInfo.professionalTitle}</p>
          <div className="contact-info-modern">
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phone}</span>
            <span>•</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        <div
          className={`photo-upload-circle ${photoUrl ? "photo-filled" : ""}`}
          title="Upload photo"
          onClick={handlePhotoClick}
        >
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="photo-preview" />
          ) : (
            <span>+</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="template-section modern-section">
          <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
          <p className="section-content">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="template-section modern-section">
          <h2 className="section-title">WORK EXPERIENCE</h2>
          <div className="section-content">
            {experiences.map((exp, idx) => (
              <div key={idx} className="entry modern-entry">
                <div className="entry-header">
                  <h3 className="entry-title">{exp.position}</h3>
                  <span className="entry-date">
                    {exp.startDate && exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : exp.startDate
                        ? `${exp.startDate} - Present`
                        : ""}
                  </span>
                </div>
                <p className="entry-company">{exp.company}</p>
                <p className="entry-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="template-section modern-section">
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-content">
            {education.map((edu, idx) => (
              <div key={idx} className="entry modern-entry">
                <div className="entry-header">
                  <h3 className="entry-title">{edu.degree}</h3>
                  <span className="entry-date">{edu.graduationYear}</span>
                </div>
                <p className="entry-company">{edu.school}</p>
                <p className="entry-field">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsText && (
        <div className="template-section modern-section">
          <h2 className="section-title">SKILLS</h2>
          <p className="section-content skills-text">{skillsText}</p>
        </div>
      )}
    </div>
  );

  // ============================================
  // CLASSIC TEMPLATE
  // ============================================
  const ClassicTemplate = () => (
    <div className="resume-template classic-template">
      {/* Header */}
      <div className="template-header classic-header">
        <div className="classic-header-top">
          <h1 className="candidate-name">{personalInfo.fullName}</h1>
        </div>
        <div className="classic-header-divider"></div>
        <div className="classic-header-info">
          <p className="professional-title">{personalInfo.professionalTitle}</p>
          <div className="contact-info-classic">
            <span>{personalInfo.email}</span>
            <span> | </span>
            <span>{personalInfo.phone}</span>
            <span> | </span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">PROFESSIONAL SUMMARY</h2>
          <p className="section-content">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">EXPERIENCE</h2>
          <div className="section-content">
            {experiences.map((exp, idx) => (
              <div key={idx} className="entry classic-entry">
                <div className="entry-header-classic">
                  <h3 className="entry-title">{exp.position}</h3>
                  <span className="entry-date">
                    {exp.startDate && exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : exp.startDate
                        ? `${exp.startDate} - Present`
                        : ""}
                  </span>
                </div>
                <p className="entry-company classic-company">{exp.company}</p>
                <p className="entry-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">EDUCATION</h2>
          <div className="section-content">
            {education.map((edu, idx) => (
              <div key={idx} className="entry classic-entry">
                <div className="entry-header-classic">
                  <h3 className="entry-title">{edu.degree}</h3>
                  <span className="entry-date">{edu.graduationYear}</span>
                </div>
                <p className="entry-company classic-company">{edu.school}</p>
                <p className="entry-field">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsText && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">SKILLS</h2>
          <p className="section-content skills-text">{skillsText}</p>
        </div>
      )}
    </div>
  );

  // ============================================
  // CREATIVE TEMPLATE
  // ============================================
  const CreativeTemplate = () => (
    <div className="resume-template creative-template">
      {/* Header */}
      <div className="template-header creative-header">
        <div className="creative-accent"></div>
        <h1 className="candidate-name">{personalInfo.fullName}</h1>
        <p className="professional-title">{personalInfo.professionalTitle}</p>
        <div className="contact-info-creative">
          <span>{personalInfo.email}</span>
          <span className="separator">✦</span>
          <span>{personalInfo.phone}</span>
          <span className="separator">✦</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title">ABOUT</h2>
          <div className="creative-accent-small"></div>
          <p className="section-content">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title">EXPERIENCE</h2>
          <div className="creative-accent-small"></div>
          <div className="section-content">
            {experiences.map((exp, idx) => (
              <div key={idx} className="entry creative-entry">
                <div className="creative-entry-marker"></div>
                <div className="entry-content">
                  <h3 className="entry-title">{exp.position}</h3>
                  <p className="entry-company">{exp.company}</p>
                  <span className="entry-date">
                    {exp.startDate && exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : exp.startDate
                        ? `${exp.startDate} - Present`
                        : ""}
                  </span>
                  <p className="entry-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title">EDUCATION</h2>
          <div className="creative-accent-small"></div>
          <div className="section-content">
            {education.map((edu, idx) => (
              <div key={idx} className="entry creative-entry">
                <div className="creative-entry-marker"></div>
                <div className="entry-content">
                  <h3 className="entry-title">{edu.degree}</h3>
                  <p className="entry-company">{edu.school}</p>
                  <span className="entry-date">{edu.graduationYear}</span>
                  <p className="entry-field">{edu.field}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsText && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title">SKILLS</h2>
          <div className="creative-accent-small"></div>
          <p className="section-content skills-text">{skillsText}</p>
        </div>
      )}
    </div>
  );

  // ============================================
  // MINIMAL TEMPLATE
  // ============================================
  const MinimalTemplate = () => (
    <div className="resume-template minimal-template">
      {/* Header */}
      <div className="template-header minimal-header">
        <h1 className="candidate-name">{personalInfo.fullName}</h1>
        <p className="professional-title">{personalInfo.professionalTitle}</p>
        <div className="contact-info-minimal">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span> • </span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span> • </span>
              <span>{personalInfo.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="template-section minimal-section">
          <h2 className="section-title">SUMMARY</h2>
          <p className="section-content">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="template-section minimal-section">
          <h2 className="section-title">EXPERIENCE</h2>
          <div className="section-content">
            {experiences.map((exp, idx) => (
              <div key={idx} className="entry minimal-entry">
                <h3 className="entry-title">{exp.position}</h3>
                <div className="entry-meta">
                  <span className="entry-company">{exp.company}</span>
                  <span className="entry-date">
                    {exp.startDate && exp.endDate
                      ? `${exp.startDate} - ${exp.endDate}`
                      : exp.startDate
                        ? `${exp.startDate} - Present`
                        : ""}
                  </span>
                </div>
                <p className="entry-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="template-section minimal-section">
          <h2 className="section-title">EDUCATION</h2>
          <div className="section-content">
            {education.map((edu, idx) => (
              <div key={idx} className="entry minimal-entry">
                <h3 className="entry-title">{edu.degree}</h3>
                <div className="entry-meta">
                  <span className="entry-company">{edu.school}</span>
                  <span className="entry-date">{edu.graduationYear}</span>
                </div>
                <p className="entry-field">{edu.field}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsText && (
        <div className="template-section minimal-section">
          <h2 className="section-title">SKILLS</h2>
          <p className="section-content skills-text">{skillsText}</p>
        </div>
      )}
    </div>
  );

  // ============================================
  // TEMPLATE SELECTOR
  // ============================================
  const templates = {
    modern: <ModernTemplate />,
    classic: <ClassicTemplate />,
    creative: <CreativeTemplate />,
    minimal: <MinimalTemplate />,
  };

  return (
    <div className="resume-preview-container">
      {templates[templateId] || templates.modern}
    </div>
  );
}
