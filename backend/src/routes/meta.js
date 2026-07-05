import express from "express";
import Stat from "../models/Stat.js";

const router = express.Router();

// GET /api/meta/stats
router.get("/stats", async (req, res, next) => {
  try {
    // Try to fetch precomputed stats
    const docs = await Stat.find({}).lean();
    const stats = {};
    docs.forEach((d) => (stats[d.key] = d.value));

    // Provide sensible defaults if not present
    const response = {
      resumesCreated: stats.resumesCreated || 0,
      users: stats.users || 0,
      atsPassRate: stats.atsPassRate || "N/A",
      createdAt: new Date(),
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
});

// GET /api/meta/ats-tips
router.get("/ats-tips", async (req, res, next) => {
  try {
    const tips = [
      {
        id: 1,
        title: "Avoid Tables",
        description:
          "Use simple formatting without tables as ATS parsers struggle with them.",
      },
      {
        id: 2,
        title: "Use Simple Formatting",
        description:
          "Stick to standard fonts and avoid complex designs or graphics.",
      },
      {
        id: 3,
        title: "Keep it One Page",
        description:
          "Keep your resume to one page for better ATS parsing accuracy.",
      },
      {
        id: 4,
        title: "Use Keywords",
        description:
          "Include keywords from the job description to improve ATS score.",
      },
      {
        id: 5,
        title: "Use Standard Fonts",
        description:
          "Arial, Calibri, and Times New Roman are most ATS-friendly.",
      },
      {
        id: 6,
        title: "Stick to Standard Sections",
        description:
          "Use common resume sections like Experience, Education, Skills.",
      },
    ];
    res.json({ tips });
  } catch (err) {
    next(err);
  }
});

export default router;
