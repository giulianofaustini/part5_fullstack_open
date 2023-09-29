import React, { useState } from "react";
import blogService from "../services/blogs";


const AddBlog = ({ blogs, setBlogs, handleGreenMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const handleCreatedBlog = async (event) => {
    event.preventDefault();

   

    try {
      // console.log("is there a response to blogs?", blogs);
      const user = JSON.parse(localStorage.getItem("loggedBlogsAppUser"));

      console.log("Is there a user?", user, "and the token is", user.token);
      if (!user || !user.token) {
        console.error("User token is missing or undefined.");
        return;
      }

      const createdBlog = await blogService.create(newBlog);
      console.log('the createdBlog is this:', createdBlog)

      setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);
     
      const message = `A new blog ${createdBlog.title} by ${createdBlog.author} has been added to the list.`;
      console.log("Message to display:", message);
      handleGreenMessage(message);

      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      console.log("Error creating the blog:", error);
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleCreatedBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          ></input>
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          ></input>
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleBlogChange}
          ></input>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </>
  );
};

export default AddBlog;
