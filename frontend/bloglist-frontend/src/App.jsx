import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(user){
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
   
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("wrong password or username");
    }
  };

  

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            ></input>
          </div>
          password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
          <div>
          <button type="submit">login</button>
          </div>
        
        </form>
      </div>
    );
  }

  return (
    <>
    <div>
      {user.name} is logged in.
    </div>
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
};

export default App;
