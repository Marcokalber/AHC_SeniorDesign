import React from "react";

export default function TopMatches() {
  // show top matches using stored properties if any
  const props = JSON.parse(localStorage.getItem('housingResults') || '[]');
  const cards = props.slice(0, 6);

  return (
  <section className="py-5 main_sec page-offset">
      <div className="container">
        <h1 className="fw-bold">Top Matches</h1>
        <p className="text-muted">Top algorithmic matches for you</p>

        <div className="row mt-4">
          {cards.length === 0 ? (
            <div className="alert alert-secondary">No matches available yet.</div>
          ) : (
            cards.map((c, i) => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={i}>
                <div className="glass-card h-100">
                  <div className="fw-bold">{c.title || c.name || 'Listing'}</div>
                  <div className="text-muted small">{c.address || c.location || ''}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
