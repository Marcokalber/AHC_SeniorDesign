import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar as BSNavbar, Button } from "react-bootstrap";
import ProfileDropdown from "./ProfileDropdown";

function Navbar({ onOpenLogin, onOpenSignup, user, setUser }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      let current = "";
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    // If we're not on the homepage, navigate there and request the Home
    // component to scroll after navigation using location state.
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      setActiveSection(id);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    // Account for the fixed header so the section is not hidden beneath it.
    const headerEl = document.querySelector('.header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 72; // fallback
    const y = el.getBoundingClientRect().top + window.scrollY - headerHeight - 12; // small gap

    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <BSNavbar
      expand="lg"
      fixed="top"
      className={`header ${scrolled ? "scrolled" : ""}`}
    >
      <Container fluid>
        <BSNavbar.Brand as={Link} to="/">
          AffordaHouse
        </BSNavbar.Brand>

        <BSNavbar.Toggle aria-controls="main-navbar" />

        <BSNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto gap-4 align-items-center">
            <Nav.Link
              onClick={() => scrollTo("how-it-works")}
              className={activeSection === "how-it-works" ? "active" : ""}
            >
              Housing Options
            </Nav.Link>

            {/* Resources link removed per request */}

            {!user && (
              <Nav.Link
                onClick={() => navigate('/contact')}
                className={activeSection === "contact" ? "active" : ""}
              >
                Contact
              </Nav.Link>
            )}

            {user ? (
              <ProfileDropdown user={user} onLogout={() => setUser(null)} />
            ) : (
              <>
                <Button type="button" className="nav-link" onClick={onOpenLogin}>
                  Log In
                </Button>

                <Button type="button" className="nav-link" onClick={onOpenSignup}>
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;