import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'


const AddBlog = ({ setBlogs, handleGreenMessage, user }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    if (user && user.token) {
      blogService.setToken(user.token)
    }
  }, [user])

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }

  const handleCreatedBlog = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs((prevBlogs) => [...prevBlogs, createdBlog])

      const message = `A new blog ${createdBlog.title} by ${createdBlog.author} has been added to the list.`
      handleGreenMessage(message)

      setNewBlog({ title: '', author: '', url: '' })
    } catch (error) {
      console.log('Error creating the blog:', error)
    }
  }


  return (
    <>
      <form onSubmit={handleCreatedBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleBlogChange}
          ></input>
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
          ></input>
        </div>
        <div>
          url:{' '}
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
  )
}

export default AddBlog
