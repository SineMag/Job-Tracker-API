import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const DB_PATH = path.join(__dirname, "../../db.json");

interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
}

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
export const query = async (
  sql: string,
  params?: any[]
): Promise<QueryResult> => {
  initializeDB();

  const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

  // Simplified SQL parsing
  const isSelectUserByEmail = sql.match(/SELECT .* FROM users WHERE email = \$1/i);
  const isSelectUserById = sql.match(/SELECT .* FROM users WHERE id = \$1/i);
  const isInsertUser = sql.match(/INSERT INTO users/i);

  if (isSelectUserByEmail && params) {
    const email = params[0];
    const user = dbData.users.find((u: any) => u.email === email);
    if (user) {
      return {
        rows: [user],
        rowCount: 1,
      };
    }
    return {
      rows: [],
      rowCount: 0,
    };
  }

  if (isSelectUserById && params) {
    const id = params[0];
    const user = dbData.users.find((u: any) => u.id === id);
    if (user) {
      // Return the user without the password
      const { password, ...userResponse } = user;
      return {
        rows: [userResponse],
        rowCount: 1,
      };
    }
    return {
      rows: [],
      rowCount: 0,
    };
  }

  if (isInsertUser && params) {
    const [username, email, password_hash] = params;
    const newUser = {
      id: dbData.users.length > 0 ? Math.max(...dbData.users.map((u: any) => u.id)) + 1 : 1,
      username,
      email,
      password: password_hash,
      role: 'user',
      display_picture: null,
      created_at: new Date().toISOString(),
    };
    dbData.users.push(newUser);
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
    
    // Return the newly created user without the password
    const { password, ...userResponse } = newUser;
    return {
      rows: [userResponse],
      rowCount: 1,
    };
  }

  const isInsertApplication = sql.match(/INSERT INTO applications/i);
  if (isInsertApplication && params) {
    const [companyName, jobTitle, status, user_id] = params;
    const newApplication = {
      id: dbData.applications.length > 0 ? Math.max(...dbData.applications.map((a: any) => a.id)) + 1 : 1,
      companyName,
      jobTitle,
      status,
      user_id,
      appliedAt: new Date().toISOString(),
    };
    dbData.applications.push(newApplication);
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
    
    return {
      rows: [newApplication],
      rowCount: 1,
    };
  }

  const isSelectApplications = sql.match(/SELECT \* FROM applications(?: WHERE user_id = \$1)?(?: ORDER BY appliedAt DESC)?/i);
  if (isSelectApplications) {
      let applications = dbData.applications;
      if (sql.includes("WHERE user_id = $1") && params && params.length > 0) {
          const userId = params[0];
          applications = applications.filter((app: any) => app.user_id === userId);
      }
      return {
          rows: applications,
          rowCount: applications.length,
      };
  }

  const isSelectApplicationById = sql.match(/SELECT \* FROM applications WHERE id = \$1/i);
  if (isSelectApplicationById && params) {
    const id = params[0];
    const application = dbData.applications.find((app: any) => app.id === id);
    if (application) {
      return {
        rows: [application],
        rowCount: 1,
      };
    }
    return {
      rows: [],
      rowCount: 0,
    };
  }

  const isUpdateApplication = sql.match(/UPDATE applications SET status = \$1 WHERE id = \$2 AND user_id = \$3/i);
  if (isUpdateApplication && params) {
    const [status, id, user_id] = params;
    const index = dbData.applications.findIndex((app: any) => app.id === id && app.user_id === user_id);
    if (index !== -1) {
      dbData.applications[index].status = status;
      fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
      return {
        rows: [dbData.applications[index]],
        rowCount: 1,
      };
    }
    return {
      rows: [],
      rowCount: 0,
    };
  }

  const isDeleteApplication = sql.match(/DELETE FROM applications WHERE id = \$1 AND user_id = \$2/i);
  if (isDeleteApplication && params) {
    const [id, user_id] = params;
    const initialLength = dbData.applications.length;
    dbData.applications = dbData.applications.filter((app: any) => !(app.id === id && app.user_id === user_id));
    if (dbData.applications.length < initialLength) {
      fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
      return {
        rows: [],
        rowCount: initialLength - dbData.applications.length,
      };
    }
    return {
      rows: [],
      rowCount: 0,
    };
  }

  // Fallback for other queries to avoid breaking other parts of the app
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
