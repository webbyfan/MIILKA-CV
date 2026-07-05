import express from "express";
import Joi from "joi";
import Contact from "../models/Contact.js";
import sendNotification from "../utils/sendNotification.js";

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(1).max(128).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(5).max(2000).required(),
  source: Joi.string().max(256).optional(),
});

router.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const contact = new Contact({
      ...value,
      ip: req.ip,
    });

    await contact.save();

    // Optionally send notification email (if configured)
    try {
      await sendNotification(contact);
    } catch (err) {
      // log but don't fail the request
      console.warn("Notification failed:", err.message);
    }

    return res.status(201).json({ success: true, message: "Message received" });
  } catch (err) {
    next(err);
  }
});

export default router;
