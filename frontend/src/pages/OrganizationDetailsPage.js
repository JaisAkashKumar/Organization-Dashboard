import React from "react";
import OrganizationDetails from "../components/OrganizationDetails";

const OrganizationDetailsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Organization Details</h1>
      <OrganizationDetails />
    </div>
  );
};

export default OrganizationDetailsPage;
