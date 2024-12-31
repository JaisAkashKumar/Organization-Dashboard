import React from "react";
import TeamForm from "../components/TeamForm";

const TeamFormPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Team</h1>
      <TeamForm />
    </div>
  );
};

export default TeamFormPage;
