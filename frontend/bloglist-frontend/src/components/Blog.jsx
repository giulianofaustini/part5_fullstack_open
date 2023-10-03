import React, { useState } from 'react'
import blogService from '../services/blogs'
import DisplayRedMessage from './DisplayRedMessage'

const Blog = ({ blog, blogs, setBlogs, handleRedMessage, redMessage }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 3,
  }
  const [see, setSee] = useState(false)

  const hideBlogInfo = { display: see ? 'none' : '' }
  const showBlogInfo = { display: see ? '' : 'none' }

  const handleLike = async () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog)
      const updatedBlogs = await blogService.getAll(updatedBlog)
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }


  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      try {
        const user = JSON.parse(localStorage.getItem('loggedBlogsAppUser'))
        console.log('the user: ', user)

        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
        const message = `Blog "${blog.title}" by ${blog.author} has been deleted.`
        console.log(message)
        handleRedMessage(message)
        setBlogs(updatedBlogs)

      } catch (error) {
        console.error('Error deleting blog:', error)
      }
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
          style={{ backgroundColor: 'green', color: 'whitesmoke' }}
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
          {blog.user ? blog.user.name : 'Unknown User'}
        </p>

        {/*  */}
        <button
          onClick={() => setSee(false)}
          style={{ backgroundColor: 'red', color: 'whitesmoke' }}
        >
          hide info
        </button>
        <p>
          <button onClick={handleDelete} style={{ backgroundColor: 'blue', color: 'whitesmoke' }}>
            delete
          </button>
        </p>
        <DisplayRedMessage message={redMessage} />
      </div>
    </div>
  )
}

export { Blog }
