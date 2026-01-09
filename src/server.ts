import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { testDBConnection } from "./config/database";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectsRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import commentRoutes from "./routes/commentRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const startServer = async () => {
  await testDBConnection();
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/applications", applicationRoutes);

  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Job Tracker API. Use the /api routes to access the data" });
  });

  // 404 handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not Found" });
  });

  // Error handler
  app.use(errorHandler);

  const server = createServer(app);

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
