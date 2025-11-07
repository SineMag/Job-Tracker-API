import { query } from "../config/database";

export const createSubmission = async (title: string, code: string, project_id: number, submitter_id: number) => {
  const { rows } = await query(
    'INSERT INTO submissions (title, code, project_id, submitter_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, code, project_id, submitter_id]
  );
  return rows[0];
};

export const findSubmissionsByProjectId = async (project_id: number) => {
  const { rows } = await query('SELECT * FROM submissions WHERE project_id = $1', [project_id]);
  return rows;
};

export const findSubmissionById = async (id: number) => {
  const { rows } = await query('SELECT * FROM submissions WHERE id = $1', [id]);
  return rows[0];
};

export const updateSubmissionStatus = async (id: number, status: string) => {
  const { rows } = await query(
    'UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return rows[0];
};

export const deleteSubmission = async (id: number) => {
  await query('DELETE FROM submissions WHERE id = $1', [id]);
};
