import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`)
      .then((res) => {
        setOrganizations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 animate-fade-in-down">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Explore Organizations
        </span>
      </h1>
      {!token && (
        <div className="text-center mb-10 animate-fade-in-up">
          <Link
            to="/add-organization"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 transform hover:scale-110 transition-transform duration-300"
          >
            Add Your Organization Now!
          </Link>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="loader border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.length > 0 ? (
            organizations.map((org, index) => (
              <div
                key={org._id}
                className={`card bg-white border rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-${
                  index * 100
                }`}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 truncate">
                    {org.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {org.email}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium text-gray-700">Location:</span>{" "}
                    {org.location}
                  </p>
                  <Link
                    to={`/organizations/${org._id}`}
                    className="block w-full text-center py-2 bg-indigo-500 text-white font-medium rounded-md shadow-md hover:bg-indigo-600 transform hover:scale-105 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl text-gray-600 animate-fade-in-up">
              No organizations found. Please add one.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
