import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="">
        <img
          src="/blogging.png"
          width="30"
          height="30"
          className="d-inline-block align-top mx-3"
          alt=""
        />
        <strong>Blog-it</strong>
      </a>
      <div className="ml-auto d-flex">
      <button className="btn btn-outline-dark btn-sm mx-1">Sign In</button>
      <button className="btn btn-outline-dark btn-sm mx-1">Register</button>
      </div>
    </nav>
  );
}

