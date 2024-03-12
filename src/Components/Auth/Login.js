import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Login = () => {
  const [formdata, setFormdata] = useState({
    Email: '',
    Password: ''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'https://motion-63l4.onrender.com/api/v1/login', formdata);

      toast.success('Login Success')
      const Token = response.data.token
      sessionStorage.setItem('token', Token)
      window.location.href="/"
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='login-main-section'>
      <div className='login-container-box'>
      <div class="container-login">
      <div class="card-login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="Email" onChange={handleChange} name="Email" value={formdata.Email} placeholder="Username" required />
          <input type="password" id="Password" name="Password" onChange={handleChange} value={formdata.Password} placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Login