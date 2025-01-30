import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import TeamModel from "../models/team.model.js";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Image filter (check if file is an image)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

// Initialize multer with memory storage
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const addTeam = async (req, res, next) => {
  // console.log(req.body);
  // Extract data from the request body
  const {
    name,
    email,
    phoneNumber,
    department,
    bio,
    description,
    socialMedia,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !phoneNumber ||
    !department ||
    !bio ||
    !description ||
    !socialMedia
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if an image file was uploaded
  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  let parsedSocialMedia;
  try {
    parsedSocialMedia = JSON.parse(socialMedia);
  } catch (error) {
    return next(errorHandler(400, "Invalid social media format"));
  }

  // Upload image to Cloudinary directly from memory
  try {
    const uploadResult = await cloudinary.v2.uploader.upload_stream(
      { folder: "team" },
      (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        // Create new team document with Cloudinary image URL
        const addTeam = new TeamModel({
          name,
          email,
          phoneNumber,
          image: result.secure_url,
          department,
          bio,
          description,
          socialMedia: parsedSocialMedia,
          createdAt: new Date(),
        });

        // Save the team document to the database
        addTeam
          .save()
          .then(() => {
            res.status(201).json({
              message: "Team member added successfully",
              addTeam,
            });
          })
          .catch(next);
      }
    );

    // Pipe the image buffer to the upload stream
    uploadResult.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getTeams = async (req, res, next) => {
  try {
    const teams = await TeamModel.find();
    if (teams.length === 0) {
      return res.status(404).json({
        message: "Teams not found",
      });
    }

    res.status(200).json({
      message: "Teams retrieved successfully",
      teams,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this TeamMember")
    );
  }
  const TeamMember = await TeamModel.findById(req.params.id);
  if (!TeamMember) {
    return next(errorHandler(404, "Team Member not found"));
  }
  try {
    await TeamModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "TeamMember deleted successfully" });
  } catch (error) {
    next(error);
  }
};
