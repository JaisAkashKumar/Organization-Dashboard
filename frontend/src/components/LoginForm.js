import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/organizations/login", {
        email,
        password,
      })
      .then((response) => {
        const { token, organizationId } = response.data;

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Navigate to the organization's details page
        navigate(`/organizations/${organizationId}`);
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="space-y-4">
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
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
