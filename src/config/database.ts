import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const DB_PATH = path.join(__dirname, "../../db.json");

// Initialize db.json if it doesn't exist
const initializeDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      users: [],
      projects: [],
      applications: [],
      submissions: [],
      comments: [],
      reviews: [],
      notifications: [],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
};

// Mock query function for JSON-based database
export const query = async (sql: string, params?: any[]) => {
  initializeDB();

  // For now, return a mock response that services can work with
  // In a real scenario, this would parse SQL and interact with db.json
  return {
    rows: [],
    rowCount: 0,
  };
};

export const testDBConnection = async () => {
  try {
    initializeDB();
    console.log("JSON Server database connection successful");
  } catch (error) {
    console.error("Unable to initialize database: ", error);
    process.exit(1);
  }
};
