const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
});

module.exports = mongoose.model("Team", teamSchema);
