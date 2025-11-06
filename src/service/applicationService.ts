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
  const { rows } = await query(
    `SELECT * FROM applications ORDER BY appliedAt DESC`,
    []
  );
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


export const updateApplicationById = async (req: Request, res: Response) => {
  try {
    // const id = parseInt(req.params.id);
    console.log(req);

    // const updatedApplication = await applicationService.updateApplication(id, req.body);
  } catch (error) {

  }
}