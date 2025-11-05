import { application } from "express";
import { query } from "../config/database";
import { Application, NewApplication } from "../types/application.types";

export const createApplication = async (
  appData: NewApplication
): Promise<Application> => {
  const { companyName, jobTitle, status } = appData;
  const { rows } = await query(
    `INSERT INTO applications (companyName, jobTitle, status) VALUES ($1, $2, $3) RETURNING *`,
    [companyName, jobTitle, status]
  );
  return rows[0];
};

export const findApplications = async (): Promise<Application[]> => {
    const { rows } = await query(`SELECT * FROM applications ORDER BY appliedAt DESC`, []);
    return rows;
};

export const findApplicationById = async (id:number): Promise<Application | null> => {
    const { rows } = await query(`SELECT * FROM applications WHERE id = $1`, [id]);
    return rows[0] || null;
}