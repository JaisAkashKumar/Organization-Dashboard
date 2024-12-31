const Organization = require("../Models/Organization");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// exports.createOrganization = async (req, res) => {
//   try {
//     const organization = new Organization(req.body);
//     await organization.save();
//     res.status(201).json(organization);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.createOrganization = async (req, res) => {
  try {
    const { name, email, location, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new organization
    const newOrganization = new Organization({
      name,
      email,
      location,
      password: hashedPassword,
    });

    // Save the organization to the database
    await newOrganization.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newOrganization._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h", // Token expires in 1 hour (you can adjust this as needed)
      }
    );

    // Send the token in the response to automatically log the user in
    res.status(201).json({ token, organizationId: newOrganization._id });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).send("Error creating organization");
  }
};

exports.loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organization = await Organization.findOne({ email });
    if (!organization) return res.status(404).send("Organization not found");

    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    // Generate a JWT token
    const token = jwt.sign({ id: organization._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with token
    res.status(200).json({ token, organizationId: organization._id });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().populate("teams");
    res.json(organizations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(organization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    res.json(organization);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteOrganization = async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Middleware to authenticate JWT token
exports.authenticateJWT = (req, res, next) => {
  console.log("auth loda");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(403).send("Access denied.");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).send("Invalid token.");
    }

    console.log("Decoded JWT payload:", decoded); // Debug decoded payload
    req.organization = decoded;
    next();
  });
};

// Controller to fetch the current organization info
exports.getCurrentOrganization = async (req, res) => {
  try {
    const { id } = req.organization;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing Organization ID" });
    }

    const organization = await Organization.findById(id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Return organization information
    res.json({
      id: organization._id,
      name: organization.name,
      email: organization.email,
      location: organization.location,
      teams: organization.teams,
    });
  } catch (err) {
    console.error("Error fetching organization:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
