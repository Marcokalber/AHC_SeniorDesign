import React, { useState } from "react";

export default function Favorites() {
  const [fav, setFav] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const remove = (idx) => {
    const next = [...fav];
    next.splice(idx, 1);
    setFav(next);
    localStorage.setItem('favorites', JSON.stringify(next));
  };

  return (
  <section className="py-5 main_sec page-offset">
      <div className="container">
        <h1 className="fw-bold">Favorites</h1>
        <p className="text-muted">Properties you have favorited</p>

        <div className="mt-4">
          {fav.length === 0 ? (
            <div className="alert alert-secondary">You have no favorites yet.</div>
          ) : (
            fav.map((f, i) => (
              <div key={i} className="glass-card mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-bold">{f.title || f.name || 'Property'}</div>
                  <div className="text-muted small">{f.address || ''}</div>
                </div>
                <div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => remove(i)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
