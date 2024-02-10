import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from '../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ username, email, password });
      await dispatch(registerUserThunk({ username, email, password }));
      console.log({ username, email, password });
      console.log('Registration successful');
      navigate('/log-in');
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Create an Account
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <button
            className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/log-in"
              className="font-bold text-blue-500 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
