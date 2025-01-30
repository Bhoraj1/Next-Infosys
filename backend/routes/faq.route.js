import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addFaq, getFaqs } from "../controllers/faq.controller.js";

const router = express.Router();

router.post("/add-faq", verifyToken, addFaq);
router.get("/get-faqs", getFaqs);

export default router;
