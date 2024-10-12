import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../../src/images/i1.jpg';

const Signup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!values.name) {
      newErrors.name = 'Username is required';
    }
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios.post('http://localhost:8800/signup', values)
        .then(res => {
          setSuccess('Signup successful!');
          setErrors({});
          alert('Signup successful!');
          navigate('/signin');
        })
        .catch(err => {
          setErrors({ form: 'Failed to sign up. Please try again.' });
        });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Black overlay with opacity */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Signup form container */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg w-11/12 lg:w-3/5 flex flex-col lg:flex-row">
        {/* Left side: Solid Color */}
        <div className="w-full lg:w-2/5 bg-blue-950 flex items-center justify-center text-white p-6 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Welcome to Our Platform!</h2>
            <p className="text-sm lg:text-lg">Create an account to enjoy our services.</p>
            <p className="text-sm lg:text-lg mt-2">Sign up to explore more!</p>
          </div>
        </div>

        {/* Right side: Sign-up form */}
        <div className="w-full lg:w-3/5 p-6 flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl mb-5 text-center font-semibold">Sign Up</h2>
          {errors.form && <p className="text-red-500 text-center mb-4">{errors.form}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">If you already have an account?</p>
            <Link to="/signin" className="text-blue-500 hover:underline mt-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
