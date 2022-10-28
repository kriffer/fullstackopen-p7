import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'


const BlogList = ({removeBlog, user}) => {

  const blogs = useSelector(state => state.blogs)



  return (<div className='collection' >
    {blogs
      .map((blog) => (
        <div key={blog.id} className="collection-item">
          
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} , {blog.author}
          </Link>
        </div>
      ))}
  </div>
  )
}

export default BlogList