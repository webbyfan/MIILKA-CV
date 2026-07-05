import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().max(128).optional(),
  lastName: Joi.string().max(128).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function signToken(user) {
  const payload = { sub: user._id.toString(), email: user.email };
  const secret = process.env.JWT_SECRET || "changeme";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// POST /api/auth/register
router.post("/register", async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await User.findOne({ email: value.email }).lean();
    if (existing)
      return res.status(409).json({ error: "Email already registered" });

    const hash = await bcrypt.hash(value.password, 10);
    const user = await User.create({
      email: value.email,
      password: hash,
      firstName: value.firstName || null,
      lastName: value.lastName || null,
    });

    const token = signToken(user);
    return res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(value.password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken(user);
    return res.json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
