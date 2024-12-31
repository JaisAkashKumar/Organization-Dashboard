import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [organizations, setOrganizations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/organizations")
      .then((res) => setOrganizations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {console.log("org", organizations)}
      <h1 className="text-3xl font-bold mb-6">Organizations</h1>
      {!token && (
        <Link
          to="/add-organization"
          className="btn btn-primary mb-6 bg-sky-500 hover:bg-sky-700 text-white"
        >
          Add Organization
        </Link>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.length > 0 ? (
          organizations.map((org) => {
            const organizationId = org._id;
            return (
              <div
                key={org._id}
                className="card shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-2">{org.name}</h2>
                <p>Email: {org.email}</p>
                <p>Location: {org.location}</p>
                <Link
                  to={`/organizations/${organizationId}`}
                  className="btn btn-accent mt-4"
                >
                  View Details
                </Link>
              </div>
            );
          })
        ) : (
          <p>No organizations found. Please add one.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
