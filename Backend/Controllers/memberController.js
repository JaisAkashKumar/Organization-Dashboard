const Member = require("../Models/Member");
const Team = require("../Models/Team");
const path = require("path");

exports.createMember = async (req, res) => {
  try {
    const member = new Member({
      ...req.body,
      status: req.body.image ? "Image Uploaded" : "Image Not Uploaded",
    });
    await member.save();
    await Team.findByIdAndUpdate(req.body.team, {
      $push: { members: member._id },
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    console.log("loda members", members);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadMemberImage = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { image: req.file.path, status: "Image Uploaded" },
      { new: true }
    );
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMembersWithDetails = async (req, res) => {
  try {
    const members = await Member.find()
      .populate("team", "name")
      .populate({
        path: "team",
        populate: { path: "organization", select: "name" },
      });
    console.log("loda2 members", members);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeMemberFromTeam = async (req, res) => {
  try {
    const { teamId, memberId } = req.params;

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $pull: { members: memberId } },
      { new: true }
    );

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    await Member.findByIdAndDelete(memberId);

    res.status(200).json({ message: "Member removed successfully", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editMemberDetails = async (req, res) => {
  try {
    const { memberId } = req.params;
    const { name, email, uniqueId } = req.body;

    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { name, email, uniqueId },
      { new: true, runValidators: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the member" });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json(member);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the member" });
  }
};
