import React, { useState } from "react";

export default function ProvideFeedback({ compact = false }) {
  const SectionTag = compact ? 'div' : 'section';
  const sectionClass = compact ? '': 'py-5 main_sec page-content';
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const onFiles = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })));
  };

  return (
    <SectionTag id="feedback" className={sectionClass}>
      <div className={compact ? '' : 'container'}>
        <h1 className="fw-bold">Provide Feedback</h1>
        <p className="text-muted">We appreciate your feedback — tell us what you liked or how we can improve.</p>

        <div className="glass-card transparent p-3 mb-3">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Attach screenshots or files (optional)</label>
              <input type="file" multiple onChange={onFiles} className="form-control" />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary" onClick={() => alert('Feedback submitted (simulated)')}>Send Feedback</button>
            </div>
          </form>
        </div>

        <div className="glass-card transparent p-3">
          <h3>Google Review</h3>
          <p className="text-muted">You may leave a public Google review for our platform. Posting directly to Google Reviews from this site requires a server-side integration and Google OAuth credentials. For now you can:</p>
          <ol>
            <li>Click the button below to open our Google review page.</li>
            <li>Paste or write your review on the Google page.</li>
          </ol>
          <div className="d-flex gap-2">
            <a className="btn btn-outline-primary" href="https://search.google.com/local/writereview?placeid=PLACE_ID" target="_blank" rel="noreferrer">Open Google Review</a>
            <button className="btn btn-secondary" onClick={() => alert('Direct upload to Google requires OAuth and a backend; implement later')}>Upload direct (placeholder)</button>
          </div>

          {files.length > 0 && (
            <div className="mt-3">
              <strong>Attachments preview</strong>
              <div className="d-flex gap-2 mt-2">
                {files.map((f, idx) => (
                  <div key={idx} style={{ width: 120 }}>
                    <div className="small text-truncate">{f.name}</div>
                    <img src={f.url} alt={f.name} style={{ width: '100%', borderRadius: 6 }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionTag>
  );
}
