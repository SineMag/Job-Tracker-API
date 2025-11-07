import { query } from "../config/database";

export const getUserActivity = async (user_id: number) => {
  // Get comments on user's submissions
  const commentNotifications = await query(
    `SELECT c.id, c.comment, s.title as submission_title, u.username as author, c.created_at
    FROM comments c
    JOIN submissions s ON c.submission_id = s.id
    JOIN users u ON c.user_id = u.id
    WHERE s.submitter_id = $1 AND c.user_id != $1
    ORDER BY c.created_at DESC
    LIMIT 10`,
    [user_id]
  );

  // Get status updates on user's submissions
  const reviewNotifications = await query(
    `SELECT r.id, r.status, s.title as submission_title, u.username as reviewer, r.created_at
    FROM reviews r
    JOIN submissions s ON r.submission_id = s.id
    JOIN users u ON r.reviewer_id = u.id
    WHERE s.submitter_id = $1
    ORDER BY r.created_at DESC
    LIMIT 10`,
    [user_id]
  );

  return {
    comments: commentNotifications.rows,
    reviews: reviewNotifications.rows,
  };
};
