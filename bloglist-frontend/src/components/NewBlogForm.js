import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from "../reducers/blogReducer";
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const NewBlogForm = () => {


  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [newBlog, setNewBlog] = useState({});
  const [message, setMessage] = useState({});

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())

  }, [newBlog, dispatch]);

  useEffect(() => {
    dispatch(addNotification(message))
    setTimeout(() => {
      dispatch(removeNotification(message))
    }, 3000);
  }, [message, dispatch]);


  const handleAddBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    try {
      dispatch(createBlog(newBlog))
      setNewBlog(newBlog);
      setMessage({
        text: `A new blog ${newBlog.title} by ${newBlog.author} added`,
        type: "success",
      });
      setAuthor('')
      setTitle('')
      setUrl('')

    } catch (exception) {
      setMessage({ text: "Oops something went wrong", type: "error" });

    }
  };


  return (
    <div>
      <h4>Create new</h4>
      <div>
        <form onSubmit={handleAddBlog}>
          <div>

            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="title"
            />
          </div>
          <div>

            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author"
            />
          </div>
          <div>

            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="url"
            />
          </div>
          <button type="submit" className=" btn-small waves-effect waves-light" id="create-blog-button">
            create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewBlogForm;
