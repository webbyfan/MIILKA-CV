import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();

async function seed() {
  await connectDB();
  const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const pass = process.env.SEED_ADMIN_PASSWORD || "password123";

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    console.log("Admin user already exists:", email);
    process.exit(0);
  }

  const hash = await bcrypt.hash(pass, 10);
  const user = await User.create({ email, password: hash, firstName: "Admin" });
  console.log("Created admin user:", user.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
