import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addTeam, getTeams, upload } from "../controllers/team.controller.js";

const router = express.Router();

router.post("/add-team", upload.single("image"), verifyToken, addTeam);
router.get("/getTeams", getTeams);

export default router;
