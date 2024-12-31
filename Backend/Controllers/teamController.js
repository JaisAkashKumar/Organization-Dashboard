const Team = require("../Models/Team");
const Organization = require("../Models/Organization");

exports.createTeam = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const teamData = { ...req.body, organization: organizationId };

    const team = new Team(teamData);
    await team.save();

    await Organization.findByIdAndUpdate(organizationId, {
      $push: { teams: team._id },
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId).populate("members");

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
