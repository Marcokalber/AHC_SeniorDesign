import React from "react";

export default function MySearches() {
  // For now show a mocked list or read from localStorage
  const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');

  return (
  <section className="py-5 main_sec page-offset">
      <div className="container">
        <h1 className="fw-bold">My Searches</h1>
        <p className="text-muted">Saved searches you can rerun or delete</p>

        <div className="mt-4">
          {saved.length === 0 ? (
            <div className="alert alert-secondary">You have no saved searches yet.</div>
          ) : (
            saved.map((s, i) => (
              <div key={i} className="glass-card mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{s.name || `Search ${i + 1}`}</div>
                  <div className="text-muted small">{s.query || JSON.stringify(s.filters)}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-primary me-2">Run</button>
                  <button className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
