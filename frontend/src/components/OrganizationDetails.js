import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrganizationDetails = () => {
  const { organizationId } = useParams();
  const [organization, setOrganization] = useState({ teams: [] });
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserInOrganization, setIsUserInOrganization] = useState(false);
  const [error, setError] = useState(null);

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
          setIsUserInOrganization(res.data.id === organizationId);
        })
        .catch((err) => {
          console.error("Error fetching current user:", err);
          setError("Error fetching current user.");
        });
    }
  }, []);

  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching data
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
            setIsLoading(false); // Set loading to false after fetching
          })
          .catch((err) => {
            console.error("Error fetching teams:", err);
            setError("Error fetching teams.");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.error("Error fetching organization:", err);
        setError("Error fetching organization data.");
        setIsLoading(false);
      });
  }, [organizationId]);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg animate-fade-in">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-t-4 border-sky-500 w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-sky-50 rounded-lg shadow-lg animate-fade-in-up">
      {organization ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-sky-600 animate-fade-in-down">
              {organization.name}
            </h2>
            <p className="text-gray-700 animate-fade-in-up">
              <span className="font-semibold">Email:</span> {organization.email}
            </p>
            <p className="text-gray-700 animate-fade-in-up">
              <span className="font-semibold">Location:</span>{" "}
              {organization.location}
            </p>
            {isUserInOrganization && (
              <Link
                to={`/organization/${organizationId}/add-team`}
                className="inline-block mt-4 bg-sky-500 text-white font-medium py-2 px-6 rounded-md shadow hover:bg-sky-600 transform hover:scale-105 transition"
              >
                Add Team
              </Link>
            )}
          </div>

          <div>
            <h3 className="text-xl font-medium text-sky-500 mb-4 animate-fade-in-up">
              Teams
            </h3>
            {teams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team, index) => (
                  <div
                    key={team._id}
                    className={`bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-fade-in delay-${
                      index * 100
                    }`}
                  >
                    <h4 className="text-lg font-semibold text-sky-700">
                      {team.name}
                    </h4>
                    <p className="text-gray-600">
                      <span className="font-medium">Members:</span>{" "}
                      {team.members ? team.members.length : 0}
                    </p>
                    <Link
                      to={`/teams/${team._id}`}
                      className="block mt-4 bg-sky-500 text-white font-medium py-2 px-4 rounded-md text-center hover:bg-sky-600 transition"
                    >
                      View Team
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 animate-fade-in-up">
                No teams available.
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 animate-fade-in-up">
            Organization not found.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetails;
