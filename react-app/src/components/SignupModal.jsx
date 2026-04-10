import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function SignupModal({ show, handleClose, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // When the modal is open we lock background scrolling and preserve scroll position.
  useEffect(() => {
    if (!show) return;

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    // lock body in place
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    // store the scroll position so we can restore it on close
    document.body.dataset.modalScrollY = String(scrollY);

    return () => {
      // restore
      const stored = Number(document.body.dataset.modalScrollY || 0);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      delete document.body.dataset.modalScrollY;
      window.scrollTo(0, stored);
    };
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please provide first name, last name and a valid email.");
      return;
    }

    // basic phone normalization/allow optional
    if (formData.phone && !/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
      setError("Please enter a valid phone number or leave it blank.");
      return;
    }

    console.log("User registered:", formData);
    setSubmitted(true);

    // Notify parent that signup succeeded (simulate immediate login)
    if (onSignupSuccess) {
      const user = { name: `${formData.firstName} ${formData.lastName}`, email: formData.email };
      onSignupSuccess(user);
    }
    // close the modal
    if (handleClose) handleClose();
  };

  return (
    <div className="signup-overlay" onClick={handleClose}>
      <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="signup-close"
          onClick={handleClose}
          aria-label="Close signup modal"
        >
          ×
        </button>

        <div className="signup-modal-body">
          <div className="text-center mb-4">
            <h2 className="fw-bold signup-title">Create your account</h2>
            <p className="signup-subtitle mb-0">
              Start your affordable housing application journey
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-4">
              <h4 className="fw-bold mb-3">Account created successfully</h4>
              <p className="text-muted mb-0">
                Your information has been captured.
              </p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone (optional)</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                />
              </Form.Group>

              <p className="text-muted small">
                Message and data rates may apply. By submitting your phone number, you consent to being contacted by affordahouse.com
                <br />
                This site is protected by reCAPTCHA and the <a href="/privacy">Privacy Policy</a> and the <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Google Terms of Service</a> apply.
              </p>

              <div className="d-grid">
                <Button type="submit" className="btn btn-primary signup-submit py-2">
                  Create Account
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupModal;