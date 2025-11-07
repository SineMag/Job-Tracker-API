import { query } from "../config/database";

export const createComment = async (comment: string, submission_id: number, user_id: number) => {
  const { rows } = await query(
    'INSERT INTO comments (comment, submission_id, user_id) VALUES ($1, $2, $3) RETURNING *',
    [comment, submission_id, user_id]
  );
  return rows[0];
};

export const findCommentsBySubmissionId = async (submission_id: number) => {
  const { rows } = await query('SELECT * FROM comments WHERE submission_id = $1', [submission_id]);
  return rows;
};

export const updateComment = async (id: number, comment: string) => {
  const { rows } = await query(
    'UPDATE comments SET comment = $1 WHERE id = $2 RETURNING *',
    [comment, id]
  );
  return rows[0];
};

export const deleteComment = async (id: number) => {
  await query('DELETE FROM comments WHERE id = $1', [id]);
};
