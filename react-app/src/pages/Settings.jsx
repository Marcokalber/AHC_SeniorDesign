import React, { useState } from "react";

export default function Settings({ compact = false }) {
  const [prefs, setPrefs] = useState({ emailNotifications: true, pushNotifications: false, darkMode: false });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const SectionTag = compact ? 'div' : 'section';
  const sectionClass = compact ? '' : 'py-5 main_sec page-offset';

  return (
    <SectionTag className={sectionClass}>
      <div className={compact ? '' : 'container'}>
        <h1 className="fw-bold">Settings</h1>
        <p className="text-muted">Account preferences and notifications</p>

        <div className="glass-card mt-4">
          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="emailNotif" checked={prefs.emailNotifications} onChange={() => toggle('emailNotifications')} />
            <label className="form-check-label" htmlFor="emailNotif">Email notifications</label>
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="pushNotif" checked={prefs.pushNotifications} onChange={() => toggle('pushNotifications')} />
            <label className="form-check-label" htmlFor="pushNotif">Push notifications</label>
          </div>

          <div className="form-check form-switch mb-3">
            <input className="form-check-input" type="checkbox" id="darkMode" checked={prefs.darkMode} onChange={() => toggle('darkMode')} />
            <label className="form-check-label" htmlFor="darkMode">Dark mode (preview)</label>
          </div>

          <div className="mt-3">
            <button className="btn btn-primary">Save preferences</button>
          </div>
        </div>
      </div>
    </SectionTag>
  );
}
