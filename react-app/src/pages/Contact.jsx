import React, { useEffect, useState } from "react";

export default function Contact() {
  const [minHeight, setMinHeight] = useState("calc(100vh - 160px)");

  useEffect(() => {
    const compute = () => {
      const headerEl = document.querySelector(".header");
      const footerEl = document.querySelector("footer");
      const headerH = headerEl ? headerEl.offsetHeight : 88;
      const footerH = footerEl ? footerEl.offsetHeight : 80;
      setMinHeight(`calc(100vh - ${headerH + footerH}px)`);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const phone = "2394126533";
  const phoneFormatted = "(239) 412-6533";
  const address = "Vintage Commerce Blvd, 33912";
  const email = "affordahousing@gmail.com";

  return (
    <section
      id="contact"
      className="py-5"
      style={{
        scrollMarginTop: "88px",
        backgroundColor: "#bebfc2e7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight,
      }}
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-3" style={{ color: "#1f2937" }}>
          Contact
        </h2>
        <p style={{ color: "#374151" }} className="mb-4">
          Get in touch with us — phone, email, or visit our office.
        </p>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="contact-card-static" aria-label="Contact information">
              <div className="contact-inner text-center">
                <div className="d-flex flex-column align-items-center gap-3">
                  <div>
                    <strong style={{ color: "#1f2937", fontSize: 20 }}>Contact</strong>
                  </div>

                  <div style={{ color: "#374151" }}>
                    <div>
                      <a href={`tel:${phone}`} className="contact-link">
                        {phoneFormatted}
                      </a>
                    </div>
                    <div>
                      <a href={`mailto:${email}`} className="contact-link">
                        {email}
                      </a>
                    </div>
                    <div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          address
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link"
                      >
                        {address}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
