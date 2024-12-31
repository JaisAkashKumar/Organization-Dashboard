const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const organizationSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  password: String,
});

module.exports = mongoose.model("Organization", organizationSchema);
