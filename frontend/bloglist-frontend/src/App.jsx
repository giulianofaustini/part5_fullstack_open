import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import DisplayMessageGreen from "./components/DisplayMessageGreen";
import DisplayRedMessage from "./components/DisplayRedMessage";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [greenMessage, setGreenMessage] = useState("");
  const [redMessage, setRedMessage] = useState("");

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleGreenMessage = (message) => {
    setGreenMessage(message);
    setTimeout(() => {
      setGreenMessage("");
    }, 3000);
  };

  const handleRedMessage = (message) => {
    setRedMessage(message);
    setTimeout(() => {
      setRedMessage("");
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogsAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (error) {
      handleRedMessage(`The username or password you inserted is not valid.`);
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogsAppUser");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log into the blog application</h2>
        <DisplayRedMessage message={redMessage} />
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
      <div>{user.name} is logged in.</div>
      <div>
        <button onClick={handleLogout}>logout</button>
        <div>
          <h2>Add your favorite blog and share it with other users</h2>
          <Togglable buttonLabel="Click for a New Blog Form">
            <AddBlog
              setBlogs={setBlogs}
              handleGreenMessage={handleGreenMessage}
              handleRedMessage={handleRedMessage}
            />
          </Togglable>
          <DisplayMessageGreen message={greenMessage} />
          <DisplayRedMessage message={redMessage} />
        </div>
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => {
         // console.log(blog)
          return <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />;
        })}
      </div>
    </>
  );
};

export default App;
