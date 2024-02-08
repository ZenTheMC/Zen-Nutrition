import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/log-in">Log In</Link>
      <Link to="/sign-up">Sign Up</Link>
      {isLoggedIn && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;