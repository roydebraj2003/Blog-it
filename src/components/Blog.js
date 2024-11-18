import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div className="blog-card" style={{
      marginBottom: '20px',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      border: '1px solid #ddd',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{blog.title}</h2>
      <p style={{ fontSize: '1rem', color: '#555' }}>{blog.content.substring(0, 200)}...</p>
      <p><small>Published on {new Date(blog.publishedAt).toLocaleDateString()}</small></p>
    </div>
  );
};

export default Blog;
