import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <nav className="bg-white p-4 fixed top-0 left-0 w-full z-50"> 
      <div className="container mx-auto flex justify-between items-center">
       

        {/* Nav Items for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
        <Link to="/empdata" className="text-black hover:text-green-700">Employee Details</Link>
        <Link to="/dataadd" className="text-black hover:text-green-700">Add Data</Link>
        <Link to="/signin" className="text-red-600 hover:text-green-700">Log Out</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 mt-4">
            <Link to="/empdata" className="text-black hover:text-green-500">Employee Details</Link>
            <Link to="/dataadd" className="text-black hover:text-green-500">Add Data</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;


