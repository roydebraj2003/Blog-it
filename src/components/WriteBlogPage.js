import React, { useState } from'react';
import { ArrowRightShort, PencilSquare } from'react-bootstrap-icons';

const WriteBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: implement API call to save blog post
    console.log('Blog post submitted:', title, content, tags);
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
          <button className="btn btn-dark rounded-pill px-4 py-2 me-2">
            Back to Dashboard
          </button>
        </div>
      </nav>
      <main className="py-5">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-4">
                Write Your Story
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Enter title" 
                    value={title} 
                    onChange={handleTitleChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Content</label>
                  <textarea 
                    className="form-control" 
                    id="content" 
                    placeholder="Start writing..." 
                    value={content} 
                    onChange={handleContentChange} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tags</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="tags" 
                    placeholder="Enter tags (comma separated)" 
                    value={tags} 
                    onChange={handleTagsChange} 
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-dark rounded-pill px-5 py-2 d-flex align-items-center"
                >
                  Publish
                  <ArrowRightShort size={22} className="ms-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WriteBlogPage;