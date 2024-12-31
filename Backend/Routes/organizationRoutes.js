const express = require("express");
const {
  createOrganization,
  getOrganizations,
  updateOrganization,
  deleteOrganization,
  getOrganization,
  loginOrganization,
  authenticateJWT,
  getCurrentOrganization,
} = require("../Controllers/organizationController");

const router = express.Router();

router.post("/", createOrganization);
router.post("/login", loginOrganization);
router.get("/auth/current-user", authenticateJWT, getCurrentOrganization);
router.get("/", getOrganizations);
router.get("/:id", getOrganization);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

module.exports = router;
