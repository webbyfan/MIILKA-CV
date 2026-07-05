import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// GET /api/users/me
router.get("/me", authMiddleware, async (req, res) => {
  // req.user is set by authMiddleware
  return res.json({ user: req.user });
});

export default router;
