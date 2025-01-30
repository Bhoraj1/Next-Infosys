import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getBlog, postBlog, upload } from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/post-blog", upload.single("image"), verifyToken, postBlog);
router.get("/getBlogs", getBlog);

export default router;
