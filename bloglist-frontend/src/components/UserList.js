import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from '../reducers/blogReducer';

const UserList = ({ users }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs())

  }, [dispatch]);

  const blogs = useSelector(state => state.blogs)

  const getUsersBlogsCount = (user) => {
    return blogs.filter(b => b.user.username === user.username).length
  }

  return (
    <div>
      <h5>Users</h5>
      <table>
        <thead><tr><td>{' '}</td><td>blogs created</td></tr></thead>
        <tbody>{users ? users.map(user => <tr key={user.username}><td><Link to={`/users/${user.username}`}>{user.name}</Link>
        </td><td>{getUsersBlogsCount(user)}</td></tr>) : ''}
        </tbody>
      </table>
    </div>
  )
}

export default UserList;