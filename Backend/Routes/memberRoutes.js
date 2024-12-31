const express = require("express");
const multer = require("multer");
const {
  createMember,
  getMembers,
  uploadMemberImage,
  getMembersWithDetails,
  editMemberDetails,
  getMemberById,
} = require("../Controllers/memberController");

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createMember);
router.get("/", getMembers);
router.post("/:id/upload", upload.single("image"), uploadMemberImage);
router.put("/:memberId", editMemberDetails);
router.get("/:memberId", getMemberById);
router.get("/api/members", getMembersWithDetails);

module.exports = router;
