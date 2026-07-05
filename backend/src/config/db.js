import mongoose from "mongoose";

export default async function connectDB() {
  const uri =
    process.env.MONGODB_URI || "mongodb://localhost:27017/resume_builder";
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    // useNewUrlParser and useUnifiedTopology are default in Mongoose 6+
  });
  console.log("Connected to MongoDB");
}
