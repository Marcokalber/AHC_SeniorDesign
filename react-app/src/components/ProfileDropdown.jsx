import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ user, onLogout }) {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (user?.email || "U").slice(0, 2).toUpperCase();

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="profile-dropdown" className="nav-link d-flex align-items-center gap-2">
        <div style={{ width: 36, height: 36, borderRadius: 18, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1f2937' }}>
          {initials}
        </div>
        <span className="d-none d-md-inline">{user?.name || user?.email}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Header>{user?.name || user?.email}</Dropdown.Header>
    <Dropdown.Item onClick={() => go('/profile')}>Profile</Dropdown.Item>
    <Dropdown.Item onClick={() => go('/searches')}>My Searches</Dropdown.Item>
    <Dropdown.Item onClick={() => go('/top-matches')}>Top Matches</Dropdown.Item>
    <Dropdown.Item onClick={() => go('/favorites')}>Favorites</Dropdown.Item>
    <Dropdown.Item onClick={() => go('/contact')}>Contact</Dropdown.Item>
    {/* Settings moved into Profile page sidebar — keep dropdown minimal */}
        <Dropdown.Divider />
        <Dropdown.Item onClick={onLogout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
