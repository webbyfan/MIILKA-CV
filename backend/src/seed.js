import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Stat from "./models/Stat.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  const defaults = [
    { key: "resumesCreated", value: 50000 },
    { key: "users", value: 12000 },
    { key: "atsPassRate", value: "92%" },
  ];

  for (const d of defaults) {
    await Stat.findOneAndUpdate(
      { key: d.key },
      { value: d.value },
      { upsert: true },
    );
  }

  console.log("Seeded stats");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
