
import React from'react';
import { ArrowRightShort, LayoutTextWindow, BookHalf, PeopleFill } from'react-bootstrap-icons';

const LandingPage = () => {
  return (
    <div className="min-vh-100 bg-white">
      <nav className="navbar navbar-light border-bottom bg-white">
        <div className="container-fluid px-4">
          <div className="navbar-brand d-flex align-items-center ms-2">
            <div className="rounded-circle p-2 d-flex align-items-center justify-content-center">
              <img 
                src={`${process.env.PUBLIC_URL}/blogging.png`} 
                alt="Logo" 
                className="img-fluid" 
                style={{ width: "40px", height: "40px" }} 
              />
            </div>
            <span className="fw-bold fs-4 ms-2">Blog-it</span>
          </div>
          <div className="d-flex">
            <button className="btn btn-dark rounded-pill px-4 py-2 me-2">
              <a href="/login" style={{textDecoration: "none", color: "white"}}>Login</a>
            </button>
            <button className="btn btn-dark rounded-pill px-4 py-2 me-2">
              <a href="/register" style={{textDecoration: "none", color: "white"}}>Register</a>
            </button>
          </div>
        </div>
      </nav>
      <header className="bg-light py-5">
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-4">
                Where Words
                <span className="d-block">Come to Life</span>
              </h1>
              <p className="lead text-muted mb-5">
                Express yourself through the power of words. Join a community of writers who share stories that inspire, educate, and connect.
              </p>
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center">
                  <a href="/write-blog" style={{textDecoration: "none", color: "white"}}>Begin Writing</a>
                  <ArrowRightShort size={22} className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <LayoutTextWindow size={32} />
              </div>
              <h3 className="h4 fw-semibold mb-3">Beautiful Templates</h3>
              <p className="text-muted">
                Choose from our collection of minimalist templates designed for better readability.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <BookHalf size={32} />
              </div>
              <h3 className="h4 fw-semibold mb-3">Easy Publishing</h3>
              <p className="text-muted">
                Write and publish your stories with our intuitive editor. No coding required.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className="mb-4">
                <PeopleFill size={32} />
              </div>
              <h3 className="h4 fw-semibold mb-3">Engaged Community</h3>
              <p className="text-muted">
                Connect with readers and writers who share your passion for storytelling.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-light py-5">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-4">Start Writing Today</h2>
              <p className="text-muted mb-5">
                Share your unique perspective with the world. Join our community of writers.
              </p>
              <button className="btn btn-dark rounded-pill px-5 py-2">
                <a href="/write-blog" style={{textDecoration: "none", color: "white"}}>Create Your Blog</a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;