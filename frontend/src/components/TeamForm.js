import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const TeamForm = () => {
  const { organizationId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTeam = { name, description, organization: organizationId };

    axios
      .post(
        `http://localhost:5000/api/organizations/${organizationId}/teams`,
        newTeam
      )
      .then((res) => {
        navigate(`/organizations/${organizationId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Team</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Team Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(`/organizations/${organizationId}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
