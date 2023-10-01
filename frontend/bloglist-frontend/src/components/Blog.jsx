// import RemoveBlog from "./RemoveBlog"

import React, { useState } from "react";
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 3,
  };
  const [see, setSee] = useState(false);

  const hideBlogInfo = { display: see ? "none" : "" };
  const showBlogInfo = { display: see ? "" : "none" };



  const handleLike = async () => {
try {
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  await blogService.update(blog.id, updatedBlog)
  const updatedBlogs = await blogService.getAll(updatedBlog);
    setBlogs(updatedBlogs);
} catch (error) {
  console.error("Error updating likes:", error);
}

  }

  return (
    <div style={blogStyle}>
      <div style={hideBlogInfo}>
        <p>
          <strong>Title:</strong> {blog.title}.
        </p>
        <button
          onClick={() => setSee(true)}
          style={{ backgroundColor: "green", color: "whitesmoke" }}
        >
          view info
        </button>
      </div>
      <div style={showBlogInfo}>
        <p>
          <strong>Blog title:</strong> {blog.title}.
        </p>
        <p>
          <strong>Author:</strong> {blog.author}
        </p>
        <p>
          <strong>Likes:</strong> {blog.likes}
        </p>
        <p>
          <button onClick={handleLike}>like it</button>
        </p>
        <p>
          <strong>Added by:</strong>
          {blog.user ? blog.user.name : "Unknown User"}
        </p>

        {/* <RemoveBlog blog={blog}  setBlogs={setBlogs} handleRedMessage={handleRedMessage}/> */}
        <button
          onClick={() => setSee(false)}
          style={{ backgroundColor: "red", color: "whitesmoke" }}
        >
          hide info
        </button>
      </div>
    </div>
  );
};

export { Blog };
