import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrganizationDetails = () => {
  const { organizationId } = useParams();
  console.log("OrganizationId ya id", organizationId);
  const [organization, setOrganization] = useState({ teams: [] });
  const [teams, setTeams] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  // const isUserInOrganization = useRef(false); // Use useRef to track if user is in the organization

  const [isUserInOrganization, setIsUserInOrganization] = useState(false);

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
          setIsUserInOrganization(res.data.id === organizationId);
        })
        .catch((err) => {
          console.error("Error fetching current user:", err);
          setError("Error fetching current user.");
        });
    }
  }, []); // Empty dependency array ensures this runs only once

  // useEffect(() => {
  //   if (currentUser) {
  //     // Update the ref value when currentUser is set
  //     setIsUserInOrganization(currentUser.id === organizationId);
  //     // isUserInOrganization.current = currentUser.id === organizationId;
  //     console.log("isUserInOrganization", isUserInOrganization.current);
  //   }
  // }, []); // Only update when currentUser or organizationId changes

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/organizations/${organizationId}`
      )
      .then((res) => {
        setOrganization(res.data);

        const teamPromises = res.data.teams.map((teamId) =>
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/teams/${teamId}`)
        );

        Promise.all(teamPromises)
          .then((teamResponses) => {
            setTeams(teamResponses.map((response) => response.data));
          })
          .catch((err) => {
            console.error("Error fetching teams:", err);
            setError("Error fetching teams.");
          });
      })
      .catch((err) => {
        console.error("Error fetching organization:", err);
        setError("Error fetching organization data.");
      });
  }, [organizationId]);

  console.log(isUserInOrganization);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg">
      {organization ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-sky-600">
              {organization.name}
            </h2>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {organization.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Location:</span>{" "}
              {organization.location}
            </p>
            {isUserInOrganization && (
              <Link
                to={`/organization/${organizationId}/add-team`}
                className="inline-block mt-4 bg-sky-500 text-white font-medium py-2 px-6 rounded-md shadow hover:bg-sky-600 transition"
              >
                Add Team
              </Link>
            )}
          </div>

          <div>
            <h3 className="text-xl font-medium text-sky-500 mb-4">Teams</h3>
            {teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => {
                  const teamId = team._id;
                  return (
                    <div
                      key={team._id}
                      className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition"
                    >
                      <h4 className="text-lg font-semibold text-sky-700">
                        {team.name}
                      </h4>
                      <p className="text-gray-600">
                        <span className="font-medium">Members:</span>{" "}
                        {team.members ? team.members.length : 0}
                      </p>
                      <Link
                        to={`/teams/${teamId}`}
                        className="block mt-4 bg-sky-500 text-white font-medium py-2 px-4 rounded-md text-center hover:bg-sky-600 transition"
                      >
                        View Team
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No teams available.</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">Organization not found.</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetails;
