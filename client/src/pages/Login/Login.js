import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUserInfo}) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, name, email, userId } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);
      setUserInfo({ name, email, userId });
      navigate('/')
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Error during login');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('_id'); // Remove user ID from local storage
    localStorage.removeItem('name'); // Remove name from local storage
    alert('Logged out');
  };

  return (
    <div className='Login'>
      <h2>Login</h2>
      {!token ? (
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Login;
