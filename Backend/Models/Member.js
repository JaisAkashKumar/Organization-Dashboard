const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: String,
  email: String,
  uniqueId: { type: String, unique: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  image: String, // Path to uploaded image
  status: {
    type: String,
    enum: ["Image Not Uploaded", "Image Uploaded"],
    default: "Image Not Uploaded",
  },
});

module.exports = mongoose.model("Member", memberSchema);
