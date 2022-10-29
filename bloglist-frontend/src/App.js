import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes, Route, useMatch, Navigate
} from "react-router-dom"
import Header from "./components/Header";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import User from "./components/User";
import 'materialize-css/dist/css/materialize.min.css'
import { refreshUser } from "./reducers/userReducer";


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user[0])
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())

  }, [dispatch]);

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const sessionUser = JSON.parse(loggedUserJSON)
      dispatch(refreshUser(sessionUser))
    }
  }, [dispatch]);

  

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchUser = useMatch('/users/:username')
  const userByName = matchUser
    ? users.find(user => user.username === matchUser.params.username)
    : null

  return (
    <div>
      <Header />
      <br />
      <Notification />

      <Routes>
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/new" element={<NewBlogForm />} />
        <Route path="/users" element={user ? <UserList users={users} /> : <Navigate replace to="/login" />} />
        <Route path="/users/:username" element={<User user={userByName} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/blogs" element={<BlogList blogs={blogs} />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
};

export default App;
