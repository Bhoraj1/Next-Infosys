import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addReview,
  deleteReview,
  getReview,
  updateReview,
  upload,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/add-review", upload.single("image"), verifyToken, addReview);
router.get("/getReview", getReview);
router.delete("/delete-review/:id", verifyToken, deleteReview);
router.put("/update-review/:reviewId", verifyToken, updateReview);

export default router;
