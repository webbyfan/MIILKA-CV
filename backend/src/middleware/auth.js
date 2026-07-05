import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function authMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ error: "Missing token" });

    const token = auth.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET || "changeme";
    let payload;
    try {
      payload = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userId = payload.sub;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    next();
  } catch (err) {
    next(err);
  }
}
