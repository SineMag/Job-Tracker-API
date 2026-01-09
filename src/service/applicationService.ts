import { query } from "../config/database";
import { Application, NewApplication } from "../types/application.types";

export const createApplication = async (
  appData: NewApplication
): Promise<Application> => {
  try {
    const { companyName, jobTitle, status, user_id } = appData;
    const { rows } = await query(
      `INSERT INTO applications (companyName, jobTitle, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *`,
      [companyName, jobTitle, status, user_id]
    );
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const findApplications = async (user_id?: number): Promise<Application[]> => {
  let queryString = `SELECT * FROM applications`;
  const queryParams: any[] = [];

  if (user_id) {
    queryString += ` WHERE user_id = $1`;
    queryParams.push(user_id);
  }

  queryString += ` ORDER BY appliedAt DESC`;

  const { rows } = await query(queryString, queryParams);
  return rows;
};

export const findApplicationById = async (
  id: number
): Promise<Application | null> => {
  const { rows } = await query(`SELECT * FROM applications WHERE id = $1`, [
    id,
  ]);
  return rows[0] || null;
};

export const UpdateApplication = async (
  id: number,
  appData: Application
): Promise<Application | null> => {
  const { status } = appData;
  const { rows } = await query(
    `UPDATE applications SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return rows[0] || null;
};

// delete application service
export const deleteApplication = async (
  id: number
): Promise<Application | null> => {
  const { rows } = await query(
    `DELETE FROM applications WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
};