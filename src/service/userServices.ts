import { query } from "../config/database";
import { User } from "../types/user.types";
import bcrytp from "bcryptjs";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  return rows[0] || null;
};

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const salt = await bcrytp.genSalt(10); //hashing the password
  const password_hash = await bcrytp.hash(password, salt);
  const { rows } = await query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email`,
    [email, password_hash]
  );
  return rows[0];
};
