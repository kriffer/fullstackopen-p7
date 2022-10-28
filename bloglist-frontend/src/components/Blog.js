import { useState } from "react";
 

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [showDetails, setShowDetails] = useState(false);
  const [label, setLabel] = useState("view");

 

  const addLike = (e) => {
    e.preventDefault();

    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: likes + 1,
    };
    updateBlog(blog.id, blogToUpdate);
    setLikes(likes + 1);
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
          <div>{blog.url}</div>
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
