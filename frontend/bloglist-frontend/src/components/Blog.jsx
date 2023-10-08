import { useState } from 'react'
import React  from 'react'
import blogService from '../services/blogs'
import DisplayRedMessage from './DisplayRedMessage'

const Blog = ({ blog, blogs, setBlogs, handleRedMessage, redMessage }) => {
  const [see, setSee] = useState(false)

  const hideBlogInfo = { display: see ? 'none' : '' }
  const showBlogInfo = { display: see ? '' : 'none' }


  const handleLike = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('loggedBlogsAppUser'))
      const userToken = await user.token
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, updatedBlog, userToken)
      console.log('The user in the handle like function ', userToken)
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
        //console.log('the user: ', user)

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 3,
  }


  const user = JSON.parse(localStorage.getItem('loggedBlogsAppUser'))

  // console.log(user)
  // console.log(user.name)
  // console.log(blog)

  const deleteButtonToShow = user && user.name && user.username === blog && blog.user.username && blog.user.name ?
    (<button
      data-cy="deleteBlog"
      onClick={handleDelete}
      style={{ backgroundColor: 'blue', color: 'whitesmoke' }}
    >
    delete
    </button>) : null


  return (
    <div style={blogStyle} className='blog'>
      <div style={hideBlogInfo} className="blog-info-hidden">
        <p>
          Title: {blog.title}.
        </p>
        <button
          onClick={() => setSee(true)}
          style={{ backgroundColor: 'green', color: 'whitesmoke' }}
          className='viewInfoButton'
          data-cy="view info"
        >
          view info
        </button>
      </div>
      <div style={showBlogInfo} className="blog-info-visible">
        <p>
          Blog title: {blog.title}.
        </p>
        <p>
          Author: {blog.author}
        </p>
        <p>
          Likes: {blog.likes}
        </p>
        <p>
          <button data-cy="likeButton" className='likesButton' style={{ borderRadius: '4px', backgroundColor:'whitesmoke', color: 'whitesmoke'  }} onClick={handleLike}>❤️</button>
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
        </button> {}

        {deleteButtonToShow}


        <DisplayRedMessage message={redMessage} />
      </div>
    </div>
  )
}

export { Blog }
