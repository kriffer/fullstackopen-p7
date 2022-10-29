import { useSelector } from "react-redux"

const User = ({ user }) => {

  const blogs = useSelector(state => state.blogs)


  if (user)
    return (
      <div>
        <h6>{user.name}</h6>
        <div><b>added blogs:</b></div>
        <ul >
          {blogs ? blogs.map(blog => blog.user.username === user.username ? <li key={blog.id}>{blog.title}</li> : '') : ''}
        </ul>
      </div>
    )
}

export default User;