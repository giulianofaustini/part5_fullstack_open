import RemoveBlog from "./RemoveBlog"

const Blog = ({ blog, setBlogs, handleRedMessage }) => (
  <div>
    
    Blog title: {blog.title}. Author: {blog.author} likes:{blog.likes}
    <RemoveBlog blog={blog}  setBlogs={setBlogs} handleRedMessage={handleRedMessage}/>
   
  </div>  
)

export default Blog