import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true' || 
    (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/log-in');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <nav className="bg-gray-50 dark:bg-gray-800 border-b-2 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/log-in" className="px-3 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300">Log In</Link>
                <Link to="/sign-up" className="px-3 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300">Sign Up</Link>
              </>
            ) : (
              <Link to="/dashboard" className="text-gray-800 dark:text-white font-semibold">Dashboard</Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <p className="text-gray-800 dark:text-gray-400 italic">Log in to access the Dashboard</p>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="text-gray-800 dark:text-white mr-4">Logout</button>
            )}
            <button onClick={toggleDarkMode} className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-yellow-500 dark:text-white font-bold py-2 px-4 rounded">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
