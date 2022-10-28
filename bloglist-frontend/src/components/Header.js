import { Link } from "react-router-dom"

const Header = () => {
  return (

    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Blogs App</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header