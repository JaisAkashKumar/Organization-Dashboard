import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const isUserInTeam = useRef(false);

  // Fetch team details
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/teams/${teamId}`)
      .then((res) => setTeam(res.data))
      .catch((err) => console.log(err));
  }, [teamId]);

  // Fetch currentUser details (this assumes that currentUser has organization info)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/api/organizations/auth/current-user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.error("Error fetching current user:", err);
        });
    }
  }, []);

  // Check if currentUser is part of the same organization as the team
  useEffect(() => {
    if (currentUser && team) {
      // Check if currentUser belongs to the same organization as the team
      isUserInTeam.current = currentUser.id === team.organization;
      console.log("isUserInTeam.current", isUserInTeam.current);
    }
  }, [currentUser, team]);

  return (
    <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg">
      {team ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sky-600">{team.name}</h2>
            <p className="text-gray-700 mt-2">{team.description}</p>
            {/* Add Member button will be visible only if currentUser is in the same organization as the team */}
            {isUserInTeam.current && (
              <Link
                to={`/teams/${teamId}/add-member`}
                className="inline-block mt-4 bg-sky-500 text-white font-medium py-2 px-6 rounded-md shadow hover:bg-sky-600 transition"
              >
                Add Member
              </Link>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-medium text-sky-500 mb-4">Members</h3>
            {team.members && team.members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.members.map((member) => {
                  // const memberId = member._id;
                  return (
                    <div
                      key={member._id}
                      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
                    >
                      {/* Image handling */}
                      {member.image ? (
                        <img
                          src={`${member.image}`} // Assuming "member.image" contains "uploads/filename.jpg"
                          alt={`${member.name}'s profile`}
                          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border border-gray-300"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                      <h4 className="text-lg font-semibold text-sky-700 text-center">
                        {member.name}
                      </h4>
                      <p className="text-gray-600 mt-1 text-center">
                        <span className="font-medium">Email:</span>{" "}
                        {member.email}
                      </p>
                      <p className="text-gray-600 mt-1 text-center">
                        <span className="font-medium">Unique ID:</span>{" "}
                        {member.uniqueId}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No members available.</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
