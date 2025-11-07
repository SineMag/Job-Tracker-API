import express from "express";
import path from "path";
import dotenv from "dotenv";
import { testDBConnection } from "./config/database";
import { createServer } from "http";
// import { initWebSocket } from "./sockets/notificationSocket";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectsRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import commentRoutes from "./routes/commentRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  await testDBConnection();
  app.use(express.json());

  //serve static files
  app.use(express.static(path.join(__dirname, "public")));


  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/comments", commentRoutes);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

  // 404 handler
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  });

  // Error handler
  app.use(errorHandler);

  const server = createServer(app);

  // initWebSocket(server);

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();