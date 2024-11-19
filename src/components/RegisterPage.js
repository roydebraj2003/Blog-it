import React, { useState } from'react';
import { Person } from'react-bootstrap-icons';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: implement API call to register user
    console.log('Register attempted:', name, email, password, confirmPassword);
  };

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
        </div>
      </nav>
      <main className="py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bold mb-4">
                Register
              </h1>
              <div className="card border-0 shadow-sm mb-5">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Name</label>
                      <input 
                        type="text" 
                        className="form-control border-0 rounded-pill p-2" 
                        id="name" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(event) => setName(event.target.value)} 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email</label>
                      <input 
                        type="email" 
                        className="form-control border-0 rounded-pill p-2" 
                        id="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Password</label>
                      <input 
                        type="password" 
                        className="form-control border-0 rounded-pill p-2" 
                        id="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Confirm Password</label>
                      <input 
                        type="password" 
                        className="form-control border-0 rounded-pill p-2" 
                        id="confirmPassword" 
                        placeholder="Confirm password" 
                        value={confirmPassword} 
                        onChange={(event) => setConfirmPassword(event.target.value)} 
                      />
                    </div>
                    {error && <div className="alert alert-danger mb-3">{error}</div>}
                    <button 
                      type="submit" 
                      className="btn btn-dark rounded-pill px-5 py-2 d-flex align-items-center"
                    >
                      Register
                      <Person size={22} className="ms-2" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;