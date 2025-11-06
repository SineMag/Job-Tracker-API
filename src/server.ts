import express, { application } from "express";
import dotenv from "dotenv";
import { log } from "console";
import { testDBConnection } from "./config/database";
import applicationRoutes from "./routes/applicationRoutes";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

const startServer = async () => {
  await testDBConnection();
  app.use(express.json({ limit: '50mb' }));

  app.use('/api', applicationRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
startServer();
