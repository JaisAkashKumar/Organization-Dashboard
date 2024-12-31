// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token"); // Check for the token in localStorage

//   const handleLogout = () => {
//     // Remove the token from localStorage to log the user out
//     localStorage.removeItem("token");
//     // Redirect to the login page (or home page)
//     navigate("/login");
//   };

//   return (
//     <nav className="text-white bg-gradient-to-r from-teal-500 to-green-500 shadow-lg py-4">
//       <div className="container mx-auto flex justify-between items-center px-6">
//         <Link to="/" className="text-3xl font-extrabold tracking-wide">
//           Oralens Dashboard
//         </Link>
//         <div className="flex space-x-6 items-center">
//           <Link
//             to="/"
//             className="px-4 py-2 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-500 transition duration-300"
//           >
//             Home
//           </Link>
//           {!token && (
//             <Link
//               to="/add-organization"
//               className="px-4 py-2 rounded-lg text-lg font-medium hover:bg-white hover:text-indigo-500 transition duration-300"
//             >
//               Add Organization
//             </Link>
//           )}

//           {/* Show Logout button if the user is logged in */}
//           {token ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 rounded-lg text-lg font-medium bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-300"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/login"
//               className="px-4 py-2 rounded-lg text-lg font-medium bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-300"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-green-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          Oralens Dashboard
        </Link>
        {/* Hamburger Icon */}
        <button
          className="text-white md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
        {/* Links for larger screens */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-lg font-medium text-white hover:bg-white hover:text-blue-500 transition duration-300"
          >
            Home
          </Link>
          {!token && (
            <Link
              to="/add-organization"
              className="px-4 py-2 rounded-lg text-lg font-medium text-white hover:bg-white hover:text-indigo-500 transition duration-300"
            >
              Add Organization
            </Link>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-lg font-medium bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg text-lg font-medium bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-600 text-white">
          <Link
            to="/"
            className="block px-6 py-3 border-b border-teal-500 hover:bg-teal-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {!token && (
            <Link
              to="/add-organization"
              className="block px-6 py-3 border-b border-teal-500 hover:bg-teal-500"
              onClick={() => setIsOpen(false)}
            >
              Add Organization
            </Link>
          )}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-6 py-3 border-b border-teal-500 hover:bg-teal-500"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block px-6 py-3 border-b border-teal-500 hover:bg-teal-500"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
