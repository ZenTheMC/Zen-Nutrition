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
    <nav className="flex justify-between items-center py-4">
      <div>
        {!isLoggedIn && (
          <>
            <Link to="/log-in" className="mr-4">Log In</Link>
            <Link to="/sign-up" className="mr-4">Sign Up</Link>
          </>
        )}
      </div>
      {isLoggedIn ? (
        <div>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p className="text-sm">Log in to access the dashboard.</p>
      )}
    </nav>
  );
};

export default Navbar;
