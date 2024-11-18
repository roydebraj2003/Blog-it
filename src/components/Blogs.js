import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/home/blogs') // Adjust the URL based on your backend API
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div
      className="blogs-container"
      style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto', // Enables vertical scrolling
        marginLeft: '250px', // Prevents overlap with vertical navigation
        backgroundColor: '#f9f9f9',
        marginTop: '55px',
        height: 'calc(100vh - 20px)', // Makes the container fit within the viewport, accounting for padding
        boxSizing: 'border-box', // Ensures padding is included in height calculation
      }}
    >
      <div
        className="blog-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;

