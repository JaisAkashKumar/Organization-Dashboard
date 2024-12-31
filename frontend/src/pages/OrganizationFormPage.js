import React from "react";
import OrganizationForm from "../components/OrganizationForm";

const OrganizationFormPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Organization</h1>
      <OrganizationForm />
    </div>
  );
};

export default OrganizationFormPage;
