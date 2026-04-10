import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPanel from "./components/LoginPanelRevised";
import SignupModal from "./components/SignupModal";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import HelpCenter from "./pages/HelpCenter";
import ProvideFeedback from "./pages/ProvideFeedback";
import Settings from "./pages/Settings";
import MySearches from "./pages/MySearches";
import TopMatches from "./pages/TopMatches";
import Favorites from "./pages/Favorites";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  // user state: null when logged out, object when authenticated
  const [user, setUser] = useState(null);
  const INACTIVITY_MS = 1000 * 60 * 10; // 10 minutes
  const inactivityTimerRef = useRef(null);

  const persistUser = (u) => {
    if (u) {
      try {
        localStorage.setItem('authUser', JSON.stringify(u));
        localStorage.setItem('authLastActive', `${Date.now()}`);
      } catch (e) {
        console.warn('Could not persist user', e);
      }
    } else {
      localStorage.removeItem('authUser');
      localStorage.removeItem('authLastActive');
    }
  };

  const handleSetUser = (u) => {
    setUser(u);
    persistUser(u);
    // reset inactivity timer when user logs in or we update the user
    if (u) startInactivityTimer();
    else stopInactivityTimer();
  };

  const stopInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const startInactivityTimer = () => {
    stopInactivityTimer();
    inactivityTimerRef.current = setTimeout(() => {
      // auto-logout after inactivity
      handleSetUser(null);
    }, INACTIVITY_MS);
  };

  useEffect(() => {
    const setHeaderVar = () => {
      const headerEl = document.querySelector('.header');
      const h = headerEl ? headerEl.offsetHeight : 72;
      // set a CSS variable on the root so CSS can compute offsets
      document.documentElement.style.setProperty('--header-height', `${h}px`);
    };

    setHeaderVar();
    window.addEventListener('resize', setHeaderVar);
    return () => window.removeEventListener('resize', setHeaderVar);
  }, []);

  // Initialize user from localStorage and setup activity listeners
  useEffect(() => {
    const tryRestore = () => {
      try {
        const raw = localStorage.getItem('authUser');
        const last = parseInt(localStorage.getItem('authLastActive') || '0', 10);
        if (raw) {
          const parsed = JSON.parse(raw);
          const age = Date.now() - (isNaN(last) ? 0 : last);
          if (age < INACTIVITY_MS) {
            handleSetUser(parsed);
          } else {
            // expired
            localStorage.removeItem('authUser');
            localStorage.removeItem('authLastActive');
          }
        }
      } catch (e) {
        console.warn('Failed to restore auth', e);
      }
    };

    tryRestore();

    const touchActivity = () => {
      if (!localStorage.getItem('authUser')) return;
      try {
        localStorage.setItem('authLastActive', `${Date.now()}`);
      } catch (e) {}
      // reset timer
      startInactivityTimer();
    };

    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach((ev) => document.addEventListener(ev, touchActivity));

    return () => {
      events.forEach((ev) => document.removeEventListener(ev, touchActivity));
      stopInactivityTimer();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell d-flex flex-column min-vh-100">
        <Navbar
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenSignup={() => setIsSignupOpen(true)}
          user={user}
          setUser={handleSetUser}
        />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/feedback" element={<ProvideFeedback />} />

            {/* Profile-related pages */}
            <Route path="/profile" element={<Profile user={user} setUser={handleSetUser} />} />
            <Route path="/searches" element={<MySearches />} />
            <Route path="/top-matches" element={<TopMatches />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <Footer />

        <LoginPanel
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(u) => handleSetUser(u)}
        />

        <SignupModal
          show={isSignupOpen}
          handleClose={() => setIsSignupOpen(false)}
          onSignupSuccess={(u) => handleSetUser(u)}
        />
      </div>
    </BrowserRouter>
  );
}