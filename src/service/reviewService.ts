import { query } from "../config/database";

export const createReview = async (submission_id: number, reviewer_id: number, status: string) => {
  // Update submission status
  await query('UPDATE submissions SET status = $1 WHERE id = $2', [status, submission_id]);

  const { rows } = await query(
    'INSERT INTO reviews (submission_id, reviewer_id, status) VALUES ($1, $2, $3) RETURNING *',
    [submission_id, reviewer_id, status]
  );
  return rows[0];
};

export const getReviewHistoryBySubmissionId = async (submission_id: number) => {
  const { rows } = await query('SELECT * FROM reviews WHERE submission_id = $1', [submission_id]);
  return rows;
};
