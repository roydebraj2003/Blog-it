import React from 'react'

function Navigation() {
  return (
        <nav
  className="nav flex-column bg-light p-3 position-fixed"
  style={{ width: '200px', height: '100vh' }}
>
  <a className="nav-link text-black active" href="/">
    <strong>Home</strong>
  </a>
  <a className="nav-link text-black active" href="/">
  <strong>Profile</strong>
  </a>
  <a className="nav-link text-black active" href="/">
  <strong>About</strong>
  </a>
  <a className="nav-link text-black active" href="/">
  <strong>Services</strong>
  </a>
</nav>
  )
}

export default Navigation
