import { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

function SignupModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

    if (formData.phone && !/^\+?[0-9\s()-]{7,20}$/.test(formData.phone)) {
      setError("Please enter a valid phone number or leave it blank.");
      return;
    }

    console.log("User registered:", formData);
    setSubmitted(true);
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal">

        {/* CLOSE BUTTON */}
        <button className="signup-close" onClick={handleClose}>
          ✕
        </button>

        <Card className="border-0 signup-card">
          <Card.Body>

            <div className="text-center mb-4">
              <h2 className="fw-bold">Create your account</h2>
              <p className="text-muted mb-0">
                Start your affordable housing application journey
              </p>
            </div>

            {submitted ? (
              <div className="text-center">
                <h4 className="fw-bold mb-3">Account created successfully</h4>
                <p className="text-muted">
                  Your information has been captured.
                </p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>

                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone (optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <p className="text-muted small">
                  Message and data rates may apply. By submitting your phone number, you consent to being contacted by affordahouse.com
                  <br />
                  This site is protected by reCAPTCHA and the <a href="/privacy">Privacy Policy</a> and the <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Google Terms of Service</a> apply.
                </p>

                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary py-2">
                    Create Account
                  </Button>
                </div>

              </Form>
            )}

          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default SignupModal;