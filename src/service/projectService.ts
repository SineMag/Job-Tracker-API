import { query } from "../config/database";

export const createProject = async (name: string, description: string, owner_id: number) => {
  const { rows } = await query(
    'INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *',
    [name, description, owner_id]
  );
  return rows[0];
};

export const findAllProjects = async () => {
  const { rows } = await query('SELECT * FROM projects');
  return rows;
};

export const findProjectById = async (id: number) => {
  const { rows } = await query('SELECT * FROM projects WHERE id = $1', [id]);
  return rows[0];
};

export const assignUserToProject = async (projectId: number, userId: number) => {
  const { rows } = await query(
    'INSERT INTO project_members (project_id, user_id) VALUES ($1, $2) RETURNING *',
    [projectId, userId]
  );
  return rows[0];
};

export const removeUserFromProject = async (projectId: number, userId: number) => {
  await query('DELETE FROM project_members WHERE project_id = $1 AND user_id = $2', [projectId, userId]);
};
