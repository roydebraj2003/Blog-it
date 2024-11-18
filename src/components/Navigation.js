import React from 'react';

function Navigation() {
  return (
    <nav
      className="d-flex flex-column bg-light position-fixed p-3"
      style={{
        width: '200px',
        height: '100vh',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <a className="nav-link text-center" href="/" style={linkStyle}>
        Home
      </a>
      <a className="nav-link text-center" href="/" style={linkStyle}>
        Profile
      </a>
      <a className="nav-link text-center" href="/" style={linkStyle}>
        About
      </a>
      <a className="nav-link text-center" href="/" style={linkStyle}>
        Services
      </a>
    </nav>
  );
}

const linkStyle = {
  color: '#333',
  fontWeight: 'bold',
  textDecoration: 'none',
  margin: '10px 0', // Minimal spacing between links
  transition: 'color 0.3s ease',
};

export default Navigation;
