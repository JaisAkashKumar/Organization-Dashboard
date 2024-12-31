// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     console.log(
//       "process.env.REACT_APP_BACKEND_URL",
//       process.env.REACT_APP_BACKEND_URL
//     );
//     axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`)
//       .then((res) => setOrganizations(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       {console.log("org", organizations)}
//       <h1 className="text-3xl font-bold mb-6">Organizations</h1>
//       {!token && (
//         <Link
//           to="/add-organization"
//           className="btn btn-primary mb-6 bg-sky-500 hover:bg-sky-700 text-white"
//         >
//           Add Your Organization Now!
//         </Link>
//       )}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {organizations.length > 0 ? (
//           organizations.map((org) => {
//             const organizationId = org._id;
//             return (
//               <div
//                 key={org._id}
//                 className="card shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
//               >
//                 <h2 className="text-xl font-semibold mb-2">{org.name}</h2>
//                 <p>Email: {org.email}</p>
//                 <p>Location: {org.location}</p>
//                 <Link
//                   to={`/organizations/${organizationId}`}
//                   className="btn btn-accent mt-4"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             );
//           })
//         ) : (
//           <p>No organizations found. Please add one.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [organizations, setOrganizations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/organizations`)
      .then((res) => setOrganizations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Explore Organizations
      </h1>
      {!token && (
        <div className="text-center mb-8">
          <Link
            to="/add-organization"
            className="btn btn-primary px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700"
          >
            Add Your Organization Now!
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <div
              key={org._id}
              className="card bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {org.name}
                </h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> {org.email}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Location:</span> {org.location}
                </p>
                <Link
                  to={`/organizations/${org._id}`}
                  className="inline-block px-6 py-2 bg-indigo-500 text-white rounded-md shadow-md hover:bg-indigo-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">
            No organizations found. Please add one.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
