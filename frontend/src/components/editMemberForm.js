import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditMember = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState({ name: "", email: "", uniqueId: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/members/${memberId}`)
      .then((res) => setMember(res.data))
      .catch((err) => console.log(err));
  }, [memberId]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/members/${memberId}`, member)
      .then(() => {
        alert("Member updated successfully");
        navigate(-1); // Go back to the previous page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-sky-600 mb-6">Edit Member</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={member.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={member.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Unique ID</label>
          <input
            type="text"
            name="uniqueId"
            value={member.uniqueId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 px-6 rounded-md shadow hover:bg-sky-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditMember;
