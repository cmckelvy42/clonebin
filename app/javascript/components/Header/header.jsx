import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../actions/user_actions';
import { DownIcon, ListIcon, LogoutIcon, UserIcon } from '../../util/fontawesome_icons';
import { useState } from 'react';


export default () => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logout());
  const currentUser = useSelector(state => state.session.currentUser);
  const [isHover, setIsHover] = useState(false);
  const DropdownMenu = () => {
    return (
      <div
        className='header-hover-menu'
        onMouseEnter={()=>setIsHover(true)}>
          <DownIcon/>
        {isHover && (
          <div className="hover-menu-list">
            <Link to="/profile"><UserIcon/>My Profile</Link>
            <Link to={`/u/${currentUser.name}`}><ListIcon/>My Pastes</Link>
            <Link to="/" onClick={logoutUser}><LogoutIcon/><b>Logout</b></Link>
          </div>
        )}
      </div>
    )
  }
  const display = currentUser ? (
    <div onMouseLeave={()=>setIsHover(false)}>
      <h3>Welcome {currentUser.name}!</h3>
      <Link className="header-profile-picture" to="/profile" title="My Profile">
        <img src={currentUser.picture_url} alt={currentUser.name}/>
      </Link>
      <DropdownMenu/>
    </div>
  ) : (
    <div>
      <h3>Welcome Guest!</h3>
      <Link className="nav-btn" id="signup-btn" to="/signup">Sign Up</Link>
      <Link className="nav-btn" id="login-btn" to="/login">Log In</Link>
    </div>
  );


  return (
    <header className="nav-bar">
      <div className="header-container">
        <div className="header-left">
            <Link className="header-logo" to="/">Clonebin</Link>
            <Link className="nav-btn" id="paste-btn" to='/'>Paste</Link>
        </div>
        <div className="header-right">
            {display}
        </div>
      </div>
    </header>
  )
}