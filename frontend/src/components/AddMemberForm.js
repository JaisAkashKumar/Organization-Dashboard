import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddMemberForm = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [image, setImage] = useState(null);
  const [imageStatus, setImageStatus] = useState("Image Not Uploaded");

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.size > MAX_SIZE) {
  //     setImage(null);
  //     setImageStatus("Image size exceeds 500 KB");
  //   } else if (file) {
  //     setImage(file);
  //     setImageStatus("Image Selected");
  //   } else {
  //     setImageStatus("Image Not Uploaded");
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const MAX_SIZE = 500 * 1024; // 500 KB in bytes

    if (file) {
      if (file.size > MAX_SIZE) {
        setImage(null);
        setImageStatus("Image size exceeds 500 KB");
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result); // Base64 string
          setImageStatus("Image successfully uploaded and converted to Base64");
        };

        reader.readAsDataURL(file);
      }
    } else {
      setImage(null);
      setImageStatus("No image selected");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { name, email, image, uniqueId, team: teamId };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/members`, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        navigate(`/teams/${teamId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Member Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Unique ID</label>
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Profile Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file-input file-input-bordered w-full"
          />
          <p
            className={`mt-2 text-sm ${
              imageStatus === "Image Not Uploaded" ||
              imageStatus.includes("exceeds")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {imageStatus}
          </p>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!image || imageStatus.includes("exceeds")}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(`/teams/${teamId}`)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;
