import express from "express";
import authMiddleware from "../middleware/auth.js";
import Resume from "../models/Resume.js";

const router = express.Router();

// ============================================
// GET /api/resumes - Get all resumes for logged-in user
// ============================================
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const resumes = await Resume.find({ userId }).sort({ createdAt: -1 });
    return res.json({ resumes });
  } catch (err) {
    next(err);
  }
});

// ============================================
// GET /api/resumes/:id - Get single resume by ID
// ============================================
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    // Check ownership
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    return res.json({ resume });
  } catch (err) {
    next(err);
  }
});

// ============================================
// POST /api/resumes - Create new resume
// ============================================
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Resume title is required" });
    }

    // Validate content structure
    if (content && typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content format" });
    }

    // Validate personal info exists in content
    if (
      content &&
      content.personalInfo &&
      (!content.personalInfo.fullName ||
        !content.personalInfo.email ||
        !content.personalInfo.phone)
    ) {
      return res.status(400).json({
        error: "Personal information must include fullName, email, and phone",
      });
    }

    const resume = new Resume({
      userId,
      title: title.trim(),
      content: content || {},
      atsScore: 0,
    });

    await resume.save();
    return res.status(201).json({ resume });
  } catch (err) {
    next(err);
  }
});

// ============================================
// PUT /api/resumes/:id - Update resume
// ============================================
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, atsScore } = req.body;
    const userId = req.user.id;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    // Check ownership
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update fields
    if (title !== undefined) resume.title = title;
    if (content !== undefined) resume.content = content;
    if (atsScore !== undefined) resume.atsScore = atsScore;

    await resume.save();
    return res.json({ resume });
  } catch (err) {
    next(err);
  }
});

// ============================================
// DELETE /api/resumes/:id - Delete resume
// ============================================
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    // Check ownership
    if (resume.userId.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Resume.findByIdAndDelete(id);
    return res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
