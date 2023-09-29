const Blog = ({ blog }) => (
  <div>
    <ul>
    <li> Blog title: {blog.title}. Author: {blog.author} likes:{blog.likes}</li>
    </ul>
  </div>  
)

export default Blog