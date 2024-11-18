import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/home/blogs')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="blogs-container"
      style={{
        flex: 1,
        padding: '20px',
        marginLeft: '205px',
        backgroundColor: '#f9f9f9',
        marginTop: '30px',
        marginBottom: '20px',
    
        height: 'calc(100vh - 20px)',
      }}
    >
      <h3 className="text-center" style={{ marginBottom: '20px' }}>
        Explore Our Latest Blogs
      </h3>
      <div className="search-section" style={{ marginBottom: '15px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '8px',
          }}
        />
      </div>

      <div className="write-blog-section" style={{ marginBottom: '20px' }}>
      <button
          className="btn btn-dark"
          style={{ padding: '10px 20px' }}
        >
          Write Your Blog
        </button>
      </div>
      <div
        className="blog-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '15px',
        }}
      >
        {filteredBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
