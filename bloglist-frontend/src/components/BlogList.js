import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Blog from './Blog'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from "../reducers/blogReducer";


const BlogList = () => {
 
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user[0])

  return (
  <div>
    {user ? <Link to="/new"><button className="btn-small">new blog</button></Link>: ''}
 
  <div className='collection' >
    
    {blogs
      .map((blog) => (
        <div key={blog.id} className="collection-item">
          
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} , {blog.author}
          </Link>
        </div>
      ))}
  </div>
  </div>
  )
}

export default BlogList