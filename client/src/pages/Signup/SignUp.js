import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form,setForm]=useState({name:'',email:'',password:''});
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', form);
      console.log('Registration successful');
      navigate('/login')
      
    } catch (error) {
      
      console.error('Registration failed:', error.response.data.message);
      alert('Error during registration');
    }


  }

  return (
    <div className='SignUp'>
      <h2>Signup</h2>
      
      <form onSubmit={handleSubmit}>
        <input type="text" className='inp-box-name' name="name" value={form.name} onChange={handleChange}  placeholder='Name'/><br/>
        <input type="text" className='inp-box' name="email" value={form.email} onChange={handleChange}  placeholder='Email'/><br/>
        <input type="text" className='inp-box' name="password" value={form.password} onChange={handleChange} placeholder='Password'/><br/>
        <div className='footer'>
          <a href='/login' className='sign-btn'>already have an account</a>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
