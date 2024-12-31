const express = require("express");
const {
  createTeam,
  getTeams,
  getTeamById,
} = require("../Controllers/teamController");
const { removeMemberFromTeam } = require("../Controllers/memberController");

const router = express.Router();

router.post("/organizations/:organizationId/teams", createTeam);
router.get("/teams/:teamId", getTeamById);
router.delete("/teams/:teamId/members/:memberId", removeMemberFromTeam);

module.exports = router;
