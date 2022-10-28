import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, useMatch
} from "react-router-dom"
import Header from "./components/Header";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import { addNotification, removeNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import 'materialize-css/dist/css/materialize.min.css'
import { doLogout, doLogin, refreshUser } from "./reducers/userReducer";
 

const App = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [newBlog, setNewBlog] = useState({});

  const dispatch = useDispatch()
  const user = useSelector(state => state.user[0])
  const blogs = useSelector(state => state.blogs)
 

  useEffect(() => {
    dispatch(initializeBlogs())

  }, [newBlog, dispatch]);




  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const sessionUser = JSON.parse(loggedUserJSON)
      dispatch(refreshUser(sessionUser))
    }
  }, []);

  useEffect(() => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, 3000);
  }, [message]);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(doLogin(username, password))
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ text: "Wrong username or password", type: "error" });

    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogsAppUser");
    dispatch(doLogout(user))

  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      dispatch(createBlog(newBlog))
      setMessage({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });

    } catch (exception) {
      setMessage({ text: "Oops something went wrong", type: "error" });

    }
  };

  const addLikes = (id, blogToUpdate) => {
    try {
      blogService.update(id, blogToUpdate);
    } catch (exception) {
      setMessage({ text: "Oops something went wrong", type: "error" });
    }
  };

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog));
        setMessage({ text: `Blog ${blog.title} removed!`, type: "success" });

      } catch (exception) {
        setMessage({ text: "Oops something went wrong", type: "error" });
      }
    }
  };

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id ===  match.params.id)
    : null

    console.log(blogs)

  return (
    <div>
      <Header />
      <h3>Blogs</h3>
      <Notification />

      
      {!user ? (
       <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <div>
            {user.name} is logged in{" "}
            <button className="waves-effect waves-light btn-small grey" onClick={handleLogout}>Logout</button>
          </div>
        
          <Togglable buttonLabel="new blog">
            <NewBlogForm
              handleSubmit={handleAddBlog}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
            />
          </Togglable>
        
        </div>
      )}
    <Routes>
     <Route path="/" element ={<BlogList removeBlog={removeBlog} user={user}/>}/>
     {/* <Route path="/users" element={<UserList />}/> */}
     <Route path="/blogs/:id" element ={<Blog  blog={blog}
            removeBlog = {removeBlog}
            user = {user} />}/>
     <Route path="/blogs" element ={<BlogList removeBlog={removeBlog} user={user}/>}/>
      </Routes>
    </div>
  );
};

export default App;
