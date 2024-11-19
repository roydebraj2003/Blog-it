import { BrowserRouter, Route, Routes } from'react-router-dom';
import './App.css';
import BlogPage from './components/BlogPage';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile'; // Don't forget to import Profile!
import RegisterPage from './components/RegisterPage';
import WriteBlogPage from './components/WriteBlogPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<BlogPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/write-blog" element={<WriteBlogPage />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;