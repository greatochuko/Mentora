import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/fobeworkLMS";

// Connect to MongoDB and start the server
async function startServer() {
  console.log("Starting server...");
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error.message);
    process.exit(1);
  }
}

startServer();

export default app;
