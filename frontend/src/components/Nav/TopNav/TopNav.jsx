import React, { useState } from "react";
import "./TopNav.css"; // Import the CSS for styling
import { FaUserCircle } from "react-icons/fa";
import {Link} from "react-router-dom"

const TopNav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar z-50 fixed top-0 shadow-md left-0 w-full bg-navColor flex justify-between items-center px-6 py-4 text-gray-200">
      {/* Left Section: Navigation Links */}
      <div className="navbar-left">
        <ul className="nav-links flex space-x-6 ml-10">
          <li>
            <Link to={"/"} className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="vulns" className="hover:text-white transition-colors">
              Vulnerabilities
            </Link>
          </li>
          <li>
            <Link to ="feedback" className="hover:text-white transition-colors">
              Feedback
            </Link>
          </li>
          <li>
            <Link to="help" className="hover:text-white transition-colors">
              Help
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section: User Profile with Dropdown */}
      <div className="navbar-right relative">
        <div
          className="profile flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <FaUserCircle className="text-2xl text-gray-200 hover:text-white transition-colors" />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-navColor text-white rounded-md shadow-lg z-10">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-navColor text-white cursor-pointer">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 hover:text-navColor text-white cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
