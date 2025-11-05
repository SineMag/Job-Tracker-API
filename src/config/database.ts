import { Pool } from "pg";
import dotenv from "dotenv";
// import { parse } from "path";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABSE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const testDBConnection = async () => {
    try {
        const client = await pool.connect(); // tempting to check out a client from the pool
        console.log("Database connection successfully");
        client.release() // release the client back to the pool
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
        process.exit(1); // exit the process with failure.terminates an appliaction with an error
    }
}