import { useState } from 'react'
import blogService from '../services/blogs'


const AddBlog = ({ setBlogs, handleGreenMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })


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
      <form onSubmit={handleCreatedBlog} data-testid="add-blog-form">
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={newBlog.title}
            onChange={handleBlogChange}
            data-cy="write title"
            placeholder='write title'
          ></input>
        </div>
        <div>
          <label htmlFor="author">author: </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleBlogChange}
            data-cy="write author"
            placeholder='write author'
          ></input>
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            type="text"
            name="url"
            id="url"
            value={newBlog.url}
            onChange={handleBlogChange}
            data-cy="write url"
            placeholder='write url'
          ></input>
        </div>
        <div>
          <button data-cy="create" type="submit">create</button>
        </div>
      </form>
    </>
  )
}

export default AddBlog
