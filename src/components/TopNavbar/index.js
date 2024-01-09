import { Link } from 'react-router-dom';
import './index.css'

const TopNavbar = () => {
  const handleSignOut = ()=>{
    window.location.href="/"
  }
  
  return(
    <nav className="navbar">
      <div className="logo-container">
        {/* <img
          src="https://pics.freeicons.io/uploads/icons/png/11469623821639569239-512.png"
          alt="ZealCrafters Logo"
          className="logo"
        /> */}
        <img className="companypng" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKg8elVv6hSqTvrsLRMIkXWtEXxE-pu86pCA&usqp=CAU" />
        <span className="brand-name">Moonhive</span>
      </div>
      <ul className="nav-links">
      <Link to="/explore/:id" >
      <li><i class="bi bi-house"></i><a>Home</a></li>
      </Link>
      <Link to="/profile/:id">
      <li><a>Profile</a></li>
      </Link>
        <li><a>About</a></li>
        <li><a>contact</a></li>
        <button className='signoutbtn' onClick={handleSignOut}>
          Sign Out
        </button>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  )};

export default TopNavbar