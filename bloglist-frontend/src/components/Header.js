import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { doLogout } from "../reducers/userReducer"

const Header = () => {

  const user = useSelector(state => state.user[0])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogsAppUser");
    dispatch(doLogout(user))
    navigate('/')
  };



  return (

    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo center">Blogs App</a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
        <ul className="right">
          <li> {user ? <div >
            {user.name} is logged in{" "}
            <button className="waves-effect waves-light btn-small grey" onClick={handleLogout}>Logout</button>
          </div> :
            <Link to="/login"><button className="btn-small" >
              log in
            </button></Link>
          }</li>
        </ul>
      </div>
    </nav>
  )
}

export default Header