import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import OrganizationFormPage from "./pages/OrganizationFormPage";
import OrganizationDetailsPage from "./pages/OrganizationDetailsPage";
import TeamFormPage from "./pages/TeamFormPage";
import TeamDetailsPage from "./pages/TeamDetailsPage";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import AddMemberForm from "./components/AddMemberForm";
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/add-organization"
              element={<OrganizationFormPage />}
            />
            <Route
              path="/organizations/:organizationId"
              element={<OrganizationDetailsPage />}
            />
            <Route
              path="/organization/:organizationId/add-team"
              element={<TeamFormPage />}
            />
            <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
            <Route
              path="/teams/:teamId/add-member"
              element={<AddMemberForm />}
            />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
