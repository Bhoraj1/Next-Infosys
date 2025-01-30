import { errorHandler } from "../utils/error.js";
import FAQModel from "../models/faq.model.js";

export const addFaq = async (req, res, next) => {
  const { question, answer } = req.body;
  // console.log(req.body);

  if (!question || !answer) {
    return next(errorHandler("All fields are required"));
  }

  const faq = new FAQModel({
    question,
    answer,
  });

  try {
    await faq.save();
    res.status(201).json({
      message: "FAQ added succfully !",
      faq,
    });
  } catch (error) {
    next(error);
  }
};

export const getFaqs = async (req, res, next) => {
  try {
    const faqs = await FAQModel.find();
    if (faqs.length === 0) {
      return next(errorHandler(404, "FAQ not found"));
    }
    res.status(200).json({
      message: "FAQs retrieved successfully!",
      faqs,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this FAQ")
    );
  }
  const FAQ = await FAQModel.findById(req.params.id);
  if (!FAQ) {
    return next(errorHandler(404, "FAQ not found"));
  }
  try {
    await FAQModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    next(error);
  }
};
