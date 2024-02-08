import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../store/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserThunk({ email, password }));
      console.log('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Log In</button>
      <div>
        Don't have an account? <Link to="/sign-up" className="text-blue-500">Sign up</Link>
      </div>
    </form>
  );
};

export default LoginPage;
