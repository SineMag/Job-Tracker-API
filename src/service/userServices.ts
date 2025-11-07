import { query } from "../config/database";
import { User } from "../types/user.types";
import bcrytp from "bcryptjs";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await query(`SELECT id, email, role, display_picture FROM users WHERE email = $1`, [email]);
  return rows[0] || null;
};

export const findUserByEmailWithPassword = async (email: string): Promise<User | null> => {
  const { rows } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
  return rows[0] || null;
};

export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const salt = await bcrytp.genSalt(10); //hashing the password
  const password_hash = await bcrytp.hash(password, salt);
  const { rows } = await query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, email`,
    [username, email, password_hash]
  );
  return rows[0];
};

export const findUserById = async (id: number): Promise<User | null> => {
  const { rows } = await query(`SELECT id, username, email, role, display_picture FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
};

export const updateUser = async (id: number, username: string, display_picture: string): Promise<User | null> => {
  const { rows } = await query(
    `UPDATE users SET username = $1, display_picture = $2 WHERE id = $3 RETURNING id, username, email, role, display_picture`,
    [username, display_picture, id]
  );
  return rows[0] || null;
};

export const deleteUser = async (id: number): Promise<void> => {
  await query(`DELETE FROM users WHERE id = $1`, [id]);
};