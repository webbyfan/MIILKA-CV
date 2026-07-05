import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FormField from "../components/FormField";
import PasswordStrength from "../components/PasswordStrength";
import { validateChangePasswordForm } from "../utils/validation";
import { getUserProfile } from "../services/api";
import "../styles/Profile.css";
import "../styles/AuthForms.css";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    jobTitle: "",
  });

  const [formData, setFormData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordTouched, setPasswordTouched] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    atsAlerts: true,
    weeklyUpdates: false,
    newsletter: true,
    twoFactorAuth: false,
  });

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await getUserProfile();
      const userData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: "",
        location: "",
        bio: "",
        jobTitle: "",
      };
      setProfileData(userData);
      setFormData(userData);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    const next = { ...passwordData, [name]: value };
    setPasswordData(next);
    setPasswordSuccess("");

    if (passwordTouched[name]) {
      const errors = validateChangePasswordForm(next);
      setPasswordErrors((prev) => ({ ...prev, [name]: errors[name] || "" }));
    }

    if (name === "newPassword" && passwordTouched.confirmPassword) {
      const errors = validateChangePasswordForm(next);
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: errors.confirmPassword || "",
      }));
    }
  };

  const handlePasswordBlur = (field) => {
    setPasswordTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validateChangePasswordForm(passwordData);
    setPasswordErrors((prev) => ({ ...prev, [field]: errors[field] || "" }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleSaveProfile = () => {
    setProfileData(formData);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setEditMode(false);
  };

  const handleChangePassword = () => {
    const errors = validateChangePasswordForm(passwordData);
    setPasswordErrors(errors);
    setPasswordTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (Object.keys(errors).length > 0) return;

    setPasswordSuccess("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({});
    setPasswordTouched({});
  };

  const handleSavePreferences = () => {
    alert("Preferences saved successfully!");
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-main">
        <Header />

        <div className="dashboard-content">
          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <p>Loading your profile...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-state">
              <p>⚠️ {error}</p>
              <button onClick={fetchUserProfile}>Try Again</button>
            </div>
          )}

          {/* Profile Content */}
          {!loading && (
            <>
              {/* Profile Header */}
              <section className="profile-header">
                <div className="profile-banner">
                  <div className="profile-avatar">
                    <div className="avatar-placeholder">
                      {profileData.firstName.charAt(0)}
                      {profileData.lastName.charAt(0)}
                    </div>
                  </div>
                  <div className="profile-header-info">
                    <h1 className="profile-name">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <p className="profile-title">
                      {profileData.jobTitle || "User"}
                    </p>
                    <p className="profile-email">{profileData.email}</p>
                  </div>
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setEditMode(!editMode);
                      setFormData(profileData);
                    }}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>
              </section>

              {/* Tabs Navigation */}
              <div className="profile-tabs">
                <button
                  className={`tab-btn ${activeTab === "info" ? "active" : ""}`}
                  onClick={() => setActiveTab("info")}
                >
                  Personal Information
                </button>
                <button
                  className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
                  onClick={() => setActiveTab("password")}
                >
                  Change Password
                </button>
                <button
                  className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
                  onClick={() => setActiveTab("preferences")}
                >
                  Preferences
                </button>
                <button
                  className={`tab-btn ${activeTab === "billing" ? "active" : ""}`}
                  onClick={() => setActiveTab("billing")}
                >
                  Billing
                </button>
              </div>

              {/* Tab Content */}
              <div className="profile-tabs-content">
                {/* Personal Information Tab */}
                {activeTab === "info" && (
                  <section className="tab-content info-tab">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="jobTitle">Job Title</label>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="form-textarea"
                        rows="4"
                      ></textarea>
                    </div>

                    {editMode && (
                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleSaveProfile}
                        >
                          Save Changes
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* Change Password Tab */}
                {activeTab === "password" && (
                  <section className="tab-content password-tab">
                    <div className="password-section">
                      <h3>Change Your Password</h3>
                      <p className="section-description">
                        Enter your current password and choose a new one.
                      </p>

                      {passwordSuccess && (
                        <div
                          className="form-alert form-alert--success"
                          role="status"
                        >
                          {passwordSuccess}
                        </div>
                      )}

                      <FormField
                        id="currentPassword"
                        label="Current password"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        onBlur={() => handlePasswordBlur("currentPassword")}
                        error={passwordErrors.currentPassword}
                        touched={passwordTouched.currentPassword}
                        placeholder="Enter your current password"
                        required
                        showPasswordToggle
                        autoComplete="current-password"
                      />

                      <FormField
                        id="newPassword"
                        label="New password"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        onBlur={() => handlePasswordBlur("newPassword")}
                        error={passwordErrors.newPassword}
                        touched={passwordTouched.newPassword}
                        placeholder="Enter your new password"
                        required
                        showPasswordToggle
                        autoComplete="new-password"
                      />
                      <PasswordStrength password={passwordData.newPassword} />

                      <FormField
                        id="confirmPassword"
                        label="Confirm password"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        onBlur={() => handlePasswordBlur("confirmPassword")}
                        error={passwordErrors.confirmPassword}
                        touched={passwordTouched.confirmPassword}
                        placeholder="Confirm your new password"
                        required
                        showPasswordToggle
                        autoComplete="new-password"
                      />

                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <section className="tab-content preferences-tab">
                    <div className="preferences-section">
                      <h3>Notification Preferences</h3>
                      <p className="section-description">
                        Manage how you receive notifications.
                      </p>

                      <div className="preference-item">
                        <div className="preference-info">
                          <label htmlFor="emailNotifications">
                            Email Notifications
                          </label>
                          <p>Receive email updates about your resumes</p>
                        </div>
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          name="emailNotifications"
                          checked={preferences.emailNotifications}
                          onChange={handlePreferenceChange}
                          className="checkbox"
                        />
                      </div>

                      <div className="preference-item">
                        <div className="preference-info">
                          <label htmlFor="atsAlerts">ATS Score Alerts</label>
                          <p>Get notified when your ATS scores change</p>
                        </div>
                        <input
                          type="checkbox"
                          id="atsAlerts"
                          name="atsAlerts"
                          checked={preferences.atsAlerts}
                          onChange={handlePreferenceChange}
                          className="checkbox"
                        />
                      </div>

                      <div className="preference-item">
                        <div className="preference-info">
                          <label htmlFor="weeklyUpdates">Weekly Updates</label>
                          <p>
                            Receive a weekly summary of your resume activity
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          id="weeklyUpdates"
                          name="weeklyUpdates"
                          checked={preferences.weeklyUpdates}
                          onChange={handlePreferenceChange}
                          className="checkbox"
                        />
                      </div>

                      <div className="preference-item">
                        <div className="preference-info">
                          <label htmlFor="newsletter">Newsletter</label>
                          <p>Subscribe to tips and job hunting strategies</p>
                        </div>
                        <input
                          type="checkbox"
                          id="newsletter"
                          name="newsletter"
                          checked={preferences.newsletter}
                          onChange={handlePreferenceChange}
                          className="checkbox"
                        />
                      </div>

                      <div className="preference-item">
                        <div className="preference-info">
                          <label htmlFor="twoFactorAuth">
                            Two-Factor Authentication
                          </label>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                        <input
                          type="checkbox"
                          id="twoFactorAuth"
                          name="twoFactorAuth"
                          checked={preferences.twoFactorAuth}
                          onChange={handlePreferenceChange}
                          className="checkbox"
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleSavePreferences}
                        >
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <section className="tab-content billing-tab">
                    <div className="billing-section">
                      <h3>Subscription & Billing</h3>

                      <div className="billing-card current-plan">
                        <div className="billing-info">
                          <h4>Current Plan</h4>
                          <p className="plan-name">Pro Plan</p>
                          <p className="plan-price">$9.99/month</p>
                          <p className="plan-status">
                            Active since Jan 15, 2024
                          </p>
                        </div>
                        <div className="plan-features">
                          <p>✓ Unlimited resumes</p>
                          <p>✓ AI optimization</p>
                          <p>✓ ATS score checker</p>
                          <p>✓ Priority support</p>
                        </div>
                      </div>

                      <div className="billing-card payment-method">
                        <h4>Payment Method</h4>
                        <p>Visa ending in 4242</p>
                        <button className="btn-secondary">
                          Update Payment
                        </button>
                      </div>

                      <div className="billing-card billing-history">
                        <h4>Billing History</h4>
                        <table className="billing-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Feb 15, 2024</td>
                              <td>Pro Plan Monthly</td>
                              <td>$9.99</td>
                              <td>
                                <span className="status-paid">Paid</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Jan 15, 2024</td>
                              <td>Pro Plan Monthly</td>
                              <td>$9.99</td>
                              <td>
                                <span className="status-paid">Paid</span>
                              </td>
                            </tr>
                            <tr>
                              <td>Dec 15, 2023</td>
                              <td>Pro Plan Monthly</td>
                              <td>$9.99</td>
                              <td>
                                <span className="status-paid">Paid</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="billing-actions">
                        <button className="btn-secondary">Upgrade Plan</button>
                        <button className="btn-danger">
                          Cancel Subscription
                        </button>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
