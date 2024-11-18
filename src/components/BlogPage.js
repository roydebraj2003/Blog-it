import React, { useState } from 'react';
import blogs from './Blogs';
import Blog from './Blog';


function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="blogs-container">
      {/* Search Section */}
      <div className="search-section" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
      </div>

      {/* Option to Write Blog */}
      <div className="write-blog-section" style={{ marginBottom: '20px' }}>
        <button
          className="write-blog-button"
          onClick={() => alert('Redirect to blog writing page')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Write Your Blog
        </button>
      </div>

      {/* Blog List Section */}
      <div className="blog-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
