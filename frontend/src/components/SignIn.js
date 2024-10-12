import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../../src/images/i1.jpg';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/login', formData);
      if (response.data === 'success') {
        navigate('/dataAdd');
      } else {
        alert('Error: Signin failed');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.response) {
        alert(`Signin failed: ${error.response.data.message || error.response.statusText}`);
      } else {
        alert('Signin failed. Please try again.');
      }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${Img})` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Sign-in form container */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg w-11/12 lg:w-3/5 flex flex-col lg:flex-row">
        {/* Left side: Solid Color */}
        <div className="w-full lg:w-2/5 bg-blue-950  flex items-center justify-center text-white p-8 lg:p-10 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-sm lg:text-lg">Sign in to continue exploring our platform.</p>
          </div>
        </div>

        {/* Right side: Sign-in form */}
        <div className="w-full lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl mb-6 text-center font-semibold">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline mt-2">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
