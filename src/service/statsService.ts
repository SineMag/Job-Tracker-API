import { query } from "../config/database";

export const getProjectStats = async (project_id: number) => {
  const totalSubmissions = await query('SELECT COUNT(*) FROM submissions WHERE project_id = $1', [project_id]);
  const approvedSubmissions = await query('SELECT COUNT(*) FROM submissions WHERE project_id = $1 AND status = $2', [project_id, 'approved']);
  const rejectedSubmissions = await query('SELECT COUNT(*) FROM submissions WHERE project_id = $1 AND status = $2', [project_id, 'changes_requested']);

  const activeReviewers = await query(
    `SELECT u.username, COUNT(r.id) as review_count
    FROM reviews r
    JOIN users u ON r.reviewer_id = u.id
    JOIN submissions s ON r.submission_id = s.id
    WHERE s.project_id = $1
    GROUP BY u.username
    ORDER BY review_count DESC
    LIMIT 5`,
    [project_id]
  );

  const submissionWithMostComments = await query(
    `SELECT s.title, COUNT(c.id) as comment_count
    FROM comments c
    JOIN submissions s ON c.submission_id = s.id
    WHERE s.project_id = $1
    GROUP BY s.title
    ORDER BY comment_count DESC
    LIMIT 1`,
    [project_id]
  );

  return {
    totalSubmissions: totalSubmissions.rows[0].count,
    approvedSubmissions: approvedSubmissions.rows[0].count,
    rejectedSubmissions: rejectedSubmissions.rows[0].count,
    activeReviewers: activeReviewers.rows,
    submissionWithMostComments: submissionWithMostComments.rows[0],
  };
};
