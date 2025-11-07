Collaboration App
---
---
Bellow are the steps to test the endpoints (Postman is Recommanded)
---
---

 1. Authentication & User Management

   * Register a new user:
       * POST http://localhost:3000/api/auth/register
       * Headers: Content-Type: application/json
       * Body (raw, JSON):
   1         {
   2             "username": "testuser",
   3             "email": "test@example.com",
   4             "password": "password123"
   5         }
       * Expected: 201 Created (success message, userID)

   * Login a user and get JWT token:
       * POST http://localhost:3000/api/auth/login
       * Headers: Content-Type: application/json
       * Body (raw, JSON):
   1         {
   2             "email": "test@example.com",
   3             "password": "password123"
   4         }
       * Expected: 200 OK (success message, token). Save this token for authenticated requests.

   * Get user profile (authenticated):
       * GET http://localhost:3000/api/users/:id (Replace :id with userID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (user profile data)

   * Update user profile (authenticated):
       * PUT http://localhost:3000/api/users/:id (Replace :id with user ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "username": "updateduser",
   3             "display_picture": "http://example.com/new_pic.jpg"
   4         }
       * Expected: 200 OK (updated user profile data)

   * Delete user (authenticated):
       * DELETE http://localhost:3000/api/users/:id (Replace :id with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

  ---

  2. Projects

   * Create a new project (authenticated):
       * POST http://localhost:3000/api/projects
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "name": "My First Project",
   3             "description": "This is a test project for code reviews."
   4         }
       * Expected: 201 Created (new project data). Save the `id`.

   * List all projects (authenticated):
       * GET http://localhost:3000/api/projects
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of project data)

   * Assign user to project (authenticated):
       * POST http://localhost:3000/api/projects/:id/members (Replace :id with project ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):
   1         {
   2             "userId": 2 // Replace with another user's ID
   3         }
       * Expected: 201 Created (assignment data)

   * Remove user from project (authenticated):
       * DELETE http://localhost:3000/api/projects/:id/members/:userId (Replace :id with project ID, :userId with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

   * Get project statistics (authenticated):
       * GET http://localhost:3000/api/projects/:id/stats (Replace :id with project ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (project statistics)

  ---

  3. Submissions

   * Create a new submission (authenticated):
       * POST http://localhost:3000/api/submissions
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "title": "Initial Code Submission",
   3             "code": "console.log(\"Hello World!\");",
   4             "project_id": 1 // Replace with your project's ID
   5         }
       * Expected: 201 Created (new submission data). Save the `id`.

   * List submissions by project (authenticated):
       * GET http://localhost:3000/api/projects/:id/submissions (Replace :id with project ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of submission data)

   * View a single submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (submission data)

   * Update submission status (authenticated):
       * PUT http://localhost:3000/api/submissions/:id/status (Replace :id with submission ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "status": "in_review" // 'pending', 'in_review', 'approved', 'changes_requested'
   3         }
       * Expected: 200 OK (updated submission data)

   * Delete a submission (authenticated):
       * DELETE http://localhost:3000/api/submissions/:id (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

  ---

  4. Comments

   * Add a comment to a submission (authenticated):
       * POST http://localhost:3000/api/submissions/:id/comments (Replace :id with submission ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "comment": "Great code, just a small suggestion on line 5."
   3         }
       * Expected: 201 Created (new comment data). Save the `id`.

   * List comments for a submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id/comments (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of comment data)

   * Update a comment (authenticated):
       * PUT http://localhost:3000/api/comments/:id (Replace :id with comment ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):
   1         {
   2             "comment": "Updated comment: Consider using a helper function here."
   3         }
       * Expected: 200 OK (updated comment data)

   * Delete a comment (authenticated):
       * DELETE http://localhost:3000/api/comments/:id (Replace :id with comment ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

  ---

  5. Reviews

   * Approve a submission (authenticated):
       * POST http://localhost:3000/api/submissions/:id/approve (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 201 Created (review data)

   * Request changes for a submission (authenticated):
       * POST http://localhost:3000/api/submissions/:id/request-changes (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 201 Created (review data)

   * Get review history for a submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id/reviews (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of review history data)

  ---

  6. Notifications

   * Get user activity feed (authenticated):
       * GET http://localhost:3000/api/users/:id/notifications (Replace :id with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (user activity data)

  ---


