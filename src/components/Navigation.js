import React from 'react';

function Navigation() {
  return (
    <nav
      className="d-flex flex-column bg-light position-fixed p-5"
      style={{
        width: '200px',
        height: '100vh',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <a className="nav-link text-center p-3" href="/" style={linkStyle}>
        Home
      </a>
      <a className="nav-link text-center p-3" href="/" style={linkStyle}>
        Profile
      </a>
      <a className="nav-link text-center p-3" href="/" style={linkStyle}>
        About
      </a>
      <a className="nav-link text-center p-3" href="/" style={linkStyle}>
        Services
      </a>
    </nav>
  );
}

const linkStyle = {
  color: '#333',
  fontWeight: 'bold',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

export default Navigation;
