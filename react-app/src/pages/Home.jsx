// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ApplicationModal from "../components/ApplicationModal";
import FooterMap from "../components/FooterMap";
import images from "../assets/images";
import { toPropertyCards, getStoredProperties } from "./Results";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  // load properties from localStorage (if available)
  const properties = getStoredProperties();

  // infinite scroll refs/state
  const ribbonRef = useRef(null);
  const shouldInfinite = properties.length > 1;
  const displayedItems = shouldInfinite ? [...properties, ...properties, ...properties] : properties;

  useEffect(() => {
    // If navigated with a scroll request (from Navbar), perform the scroll
    // after the component mounts and DOM is ready.
    if (location && location.state && location.state.scrollTo) {
      const id = location.state.scrollTo;
      // small timeout to allow layout/paint
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const headerEl = document.querySelector('.header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 72;
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Clear the navigation state so future navigations don't re-trigger
        try {
          window.history.replaceState({}, document.title);
        } catch (e) {
          // ignore
        }
      }, 80);
    }

    const el = ribbonRef.current;
    if (!el || !shouldInfinite) return;

    // When items are tripled, set initial scroll to the middle group
    const setToMiddle = () => {
      const total = el.scrollWidth;
      const groupWidth = total / 3;
      el.scrollLeft = groupWidth;
    };

    // small timeout to allow layout/paint
    const t = setTimeout(setToMiddle, 50);

    let isAdjusting = false;

    const onScroll = () => {
      if (!el || isAdjusting) return;
      const total = el.scrollWidth;
      const groupWidth = total / 3;
      const left = el.scrollLeft;

      // if we've scrolled into the first third, jump forward one group
      if (left < groupWidth * 0.2) {
        isAdjusting = true;
        el.scrollLeft = left + groupWidth;
        requestAnimationFrame(() => (isAdjusting = false));
        return;
      }

      // if we've scrolled into the last third, jump back one group
      if (left > groupWidth * 1.8) {
        isAdjusting = true;
        el.scrollLeft = left - groupWidth;
        requestAnimationFrame(() => (isAdjusting = false));
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      // recenter on resize
      setToMiddle();
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [shouldInfinite, properties.length]);
  

  return (
    <>
      {/* HERO */}
      <header
        className="vh-100 d-flex align-items-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url('https://3das.com/wp-content/uploads/2024/01/1a-neighborhood_typical-1545x1030.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Affordable Housing</h1>

          <div className="d-inline-flex flex-column align-items-center gap-3">
            <button
              type="button"
              className="btn btn-lg btn-primary px-5"
              onClick={() => setShowModal(true)}
            >
              Start Application
            </button>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-5 main_sec">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#1f2937" }}>
              Housing Options
            </h2>
            <p style={{ color: "#374151" }} className="mb-0">
              These are the most popular options for affordable housing.
            </p>
          </div>
        </div>

        {/* full-bleed horizontal ribbon */}
        <div className="container-fluid px-0">
          <div
            ref={ribbonRef}
            className="d-flex infinite-ribbon"
            role="list"
            aria-label="Housing options"
            style={{
              gap: "1rem",
              overflowX: "auto",
              paddingBottom: "1rem",
              WebkitOverflowScrolling: "touch",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              scrollBehavior: "auto",
            }}
          >
            {displayedItems.length > 0 ?

              displayedItems.map((p, idx) => {
                const imageUrl = p.image || images[idx % images.length];
                const hasImage = Boolean(imageUrl);
                const cardStyle = hasImage
                  ? {
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.12)), url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      color: "#ffffff",
                    }
                  : {};

                return (
                  <div key={`${p.id}-${idx}`} role="listitem" style={{ minWidth: 300, flex: "0 0 auto" }}>
                    <div className={`glass-card ${hasImage ? "has-image" : ""}`} style={cardStyle}>
                      <h5 className="fw-bold" style={{ color: hasImage ? "#ffffff" : "#1f2937" }}>
                        {p.name}
                      </h5>
                      <p style={{ color: hasImage ? "#f3f4f6" : "#4b5563" }} className="mb-2">
                        {p.address}
                      </p>

                    <div className="property-meta">
                      <div><strong>AMI:</strong> {p.ami}</div>
                      <div><strong>Units:</strong> {p.units}</div>
                      <div><strong>Rent:</strong> {p.rent}</div>
                    </div>

                    {p.link ? (
                      <a
                        className="btn btn-sm btn-primary mt-3"
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Property
                      </a>
                    ) : null}
                  </div>
                  </div>
                );
              }) : (
              <div role="listitem" style={{ minWidth: 320, flex: "0 0 auto" }}>
                <div className="glass-card text-center">
                  <h5 className="fw-bold" style={{ color: "#1f2937" }}>
                    No properties to show
                  </h5>
                  <p style={{ color: "#4b5563" }}>
                    Start an application to get personalized housing recommendations.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={() => setShowModal(true)}
                  >
                    Start Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact card placed outside the updates glass-card */}
      {/* contact moved to its own /contact page */}

      {/* MAP */}
      <FooterMap />

      {/* GET UPDATES */}
      <section id="updates" className="py-5 main_sec">
        <div className="container">
          <div className="glass-card">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-lg-6">
                <h3 className="fw-bold mb-1" style={{ color: "#1f2937" }}>
                  Get Updates
                </h3>
                <p className="mb-0" style={{ color: "#4b5563" }}>
                  News on programs, new units, and housing tips.
                </p>
              </div>

              <div className="col-12 col-lg-6">
                <form
                  className="d-flex flex-column flex-sm-row gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Subscription sent");
                  }}
                >
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>

                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="consent"
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="consent"
                    style={{ color: "#4b5563" }}
                  >
                    I agree to receive email updates. I can unsubscribe at any
                    time.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <ApplicationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}