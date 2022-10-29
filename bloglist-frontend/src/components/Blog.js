import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addNotification, removeNotification } from "../reducers/notificationReducer";
import { deleteBlog, updateBlog } from "../reducers/blogReducer";


const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [message, setMessage] = useState({});
  const user = useSelector(state => state.user[0])
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, 3000);
  }, [message, dispatch]);


  const addLike = (e) => {
    e.preventDefault();

    const blogToUpdate = {
      ...blog,
      likes: likes + 1,
    };
    try {
      dispatch(updateBlog(blog.id, blogToUpdate))
    } catch (exception) {
      setMessage({ text: "Oops something went wrong", type: "error" });
    }
    setLikes(likes + 1);
  };


  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(blog));
        navigate('/');
        setMessage({ text: `Blog ${blog.title} removed!`, type: "success" });

      } catch (exception) {
        setMessage({ text: "Oops something went wrong", type: "error" });
      }
    }
  };

  function showRemoveButton() {
    if (user) {
      return blog.user.username === user.username ? (
        <div>
          <button onClick={() => removeBlog(blog)} className="btn-small red">remove</button>
        </div>
      ) : (
        ""
      );
    } else return "";
  }

  return (
    <div  >
      {blog.title} {blog.author}

      <div className="togglableContent">
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {likes} <button className="btn-small blue" onClick={addLike}>like</button>
        </div>
        <div>{blog.author}</div>
        {showRemoveButton()}
      </div>

    </div>
  );
};

export default Blog;
