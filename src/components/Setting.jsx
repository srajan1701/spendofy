// Settings.jsx
import React, { useEffect, useState } from "react";
import "../styles/Setting.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    language: "English",
    currency: "INR",
    firstDayMonth: "1",
    firstDayWeek: "Monday",
    transactionTime: false,
    reminder: true,
    defaultCheck: "Not checked",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("settings"));
    if (saved) setSettings(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">
      <div className="topbar">
        <h2>⚙️ Settings</h2>
        <button className="exit-btn">EXIT</button>
      </div>

      <div className="settings-card">
        <h3>Feedback & Support</h3>
        <p>If you have any question, contact support@spendofy.com</p>

        <div className="row">
          <label>Language</label>
          <select name="language" value={settings.language} onChange={handleChange}>
            <option>English</option>
            <option>Hindi</option>
          </select>
         
        </div>

        <div className="row">
          <label>Currency</label>
          <select name="currency" value={settings.currency} onChange={handleChange}>
            <option>USD</option>
            <option>INR</option>
          </select>
          
        </div>

        <h3>General Settings</h3>

        <div className="row">
          <label>First day of month</label>
          <select name="firstDayMonth" value={settings.firstDayMonth} onChange={handleChange}>
            {[...Array(28)].map((_, i) => (
              <option key={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <label>First day of week</label>
          <select name="firstDayWeek" value={settings.firstDayWeek} onChange={handleChange}>
            <option>Monday</option>
            <option>Sunday</option>
          </select>
        </div>

        <div className="toggle-row">
          <label>Transactions - Set time</label>
          <input
            type="checkbox"
            name="transactionTime"
            checked={settings.transactionTime}
            onChange={handleChange}
          />
        </div>

        <div className="toggle-row">
          <label>Reminder icon</label>
          <input
            type="checkbox"
            name="reminder"
            checked={settings.reminder}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Default</label>
          <select name="defaultCheck" value={settings.defaultCheck} onChange={handleChange}>
            <option>Checked</option>
            <option>Not checked</option>
          </select>
        </div>

        <button className="save-all" onClick={saveSettings}>Save All</button>
      </div>
    </div>
  );
}


