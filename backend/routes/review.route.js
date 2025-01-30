import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addReview, getReview, upload } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add-review", upload.single("image"), verifyToken, addReview);
router.get("/getReview", getReview);

export default router;
