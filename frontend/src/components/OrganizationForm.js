import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrganizationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/organizations",
        {
          name,
          email,
          location,
          password,
        }
      );

      const { token, organizationId } = response.data;
      localStorage.setItem("token", token); // Store the token in localStorage

      // Redirect to the dashboard or home page after successful registration
      navigate(`/organizations/${organizationId}`);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Organization</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Organization Name</label>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mt-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            className="input input-bordered w-full mt-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="input input-bordered w-full mt-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrganizationForm;
