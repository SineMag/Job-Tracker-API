## Job Tracker API

A RESTful API for managing job applications, projects, submissions, and code reviews.

### Project Structure

``` bash
Collaboration App
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── src
    ├── config
    │   └── database.ts
    ├── controllers
    │   ├── analyticsController.ts
    │   ├── applicationControllers.ts
    │   ├── authController.ts
    │   ├── commentControlller.ts
    │   ├── notificationController.ts
    │   ├── projectController.ts
    │   ├── reviewController.ts
    │   ├── statsController.ts
    │   ├── submissionController.ts
    │   └── userController.ts
    ├── db
    │   ├── init-db.ts
    │   └── schema.sql
    ├── middleware
    │   ├── authMiddleware.ts
    │   ├── checkAuth.ts
    │   ├── checkRoutes.ts
    │   ├── errorHandler.ts
    │   ├── validateRequest.ts
    │   └── validators.ts
    ├── models
    │   ├── commentModels.ts
    │   ├── projectModels.ts
    │   ├── reviewModels.ts
    │   ├── submissionModels.ts
    │   └── userModel.ts
    ├── public
    │   ├── css
    │   │   └── styles.css
    │   ├── images
    │   │   ├── android-chrome-192x192.png
    │   │   └── favicon.ico
    │   └── js
    │       └── script.js
    ├── routes
    │   ├── applicationRoutes.ts
    │   ├── authRoutes.ts
    │   ├── commentRoutes.ts
    │   ├── projectsRoutes.ts
    │   ├── submissionRoutes.ts
    │   └── userRoutes.ts
    ├── service
    │   ├── applicationService.ts
    │   ├── commentService.ts
    │   ├── notificationService.ts
    │   ├── projectService.ts
    │   ├── reviewService.ts
    │   ├── statsService.ts
    │   ├── submissionService.ts
    │   └── userServices.ts
    ├── sockets
    │   └── notificationSocket.ts
    ├── types
    │   ├── application.types.ts
    │   ├── express.d.ts
    │   └── user.types.ts
    ├── views
    │   └── index.html
    └── server.ts
```

---
Bellow are the steps to test the endpoints (Postman is Recommended)
---
---

### 1. Authentication & User Management

   * **Register** a new user:
       * POST http://localhost:3000/api/auth/register
       * Headers: Content-Type: application/json
       * Body (raw, JSON):
   1         {
   2             "username": "user",
   3             "email": "user@mail.com",
   4             "password": "abc123"
   5         }
       * Expected: 201 Created ("User registered successfully", userID) <!--congratulationsssss -->

   * **Login** a user and get JWT token:
       * POST http://localhost:3000/api/auth/login
       * Headers: Content-Type: application/json
       * Body (raw, JSON):
   1         {
   2             "email": "some@email.com",
   3             "password": "abc123"
   4         }
       * Expected: 200 OK ("Login successful", token). Save this token for authenticated requests.

<!-- Please don't forget your token as you will need it in the next steps!! -->
   * **Get** user profile (authenticated):
       * GET http://localhost:3000/api/users/:id (Replace :id with userID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (user profile data)

   * **Update** user profile (authenticated):
       * PUT http://localhost:3000/api/users/:id (Replace :id with user ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "username": "updateduser",
   3             "display_picture": "http://example.com/new_pic.jpg"
   4         }
       * Expected: 200 OK (updated user profile data)

   * **Delete** user (authenticated):
       * DELETE http://localhost:3000/api/users/:id (Replace :id with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
        * Expected: 204 No Content <!--Oops, gone with the wind -->

  ---

###  2. Projects

   * **Create** a new project (authenticated):
       * POST http://localhost:3000/api/projects
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "name": "My First Project",
   3             "description": "This is a test project for code reviews."
   4         }
       * Expected: 201 Created (new project data). Save the `id`.

   * **List all** projects (authenticated):
       * GET http://localhost:3000/api/projects
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of project data)

   * **Assign** user to project (authenticated):
       * POST http://localhost:3000/api/projects/:id/members (Replace :id with project ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):
   1         {
   2             "userId": 2 // Replace with another user's ID
   3         }
       * Expected: 201 Created (assignment data)

   * **Remove** user from project (authenticated):
       * DELETE http://localhost:3000/api/projects/:id/members/:userId (Replace :id with project ID, :userId with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

   * **Get project statistics** (authenticated):
       * GET http://localhost:3000/api/projects/:id/stats (Replace :id with project ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (project statistics)

  ---

###  3. Submissions

   * **Create** a new submission (authenticated):
       * POST http://localhost:3000/api/submissions
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "title": "Initial Code Submission",
   3             "code": "console.log(\"Hello World!\");",
   4             "project_id": 1 // Replace with your project's ID
   5         }
       * Expected: 201 Created (new submission data). Save the `id`.

   * **List** submissions by project (authenticated):
       * GET http://localhost:3000/api/projects/:id/submissions (Replace :id with project ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of submission data)

   * **View** a single submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (submission data)

   * **Update** submission status (authenticated):
       * PUT http://localhost:3000/api/submissions/:id/status (Replace :id with submission ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "status": "in_review" // 'pending', 'in_review', 'approved', 'changes_requested'
   3         }
       * Expected: 200 OK (updated submission data)

   * **Delete** a submission (authenticated):
       * DELETE http://localhost:3000/api/submissions/:id (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

  ---

###  4. Comments

   * **Add** a comment to a submission (authenticated):
       * POST http://localhost:3000/api/submissions/:id/comments (Replace :id with submission ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):

   1         {
   2             "comment": "Great code, just a small suggestion on line 5."
   3         }
       * Expected: 201 Created (new comment data). Save the `id`.

   * **List** comments for a submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id/comments (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of comment data)

   * **Update** a comment (authenticated):
       * PUT http://localhost:3000/api/comments/:id (Replace :id with comment ID)
       * Headers: Content-Type: application/json, Authorization: Bearer YOUR_JWT_TOKEN
       * Body (raw, JSON):
   1         {
   2             "comment": "Updated comment: Consider using a helper function here."
   3         }
       * Expected: 200 OK (updated comment data)

   * **Delete** a comment (authenticated):
       * DELETE http://localhost:3000/api/comments/:id (Replace :id with comment ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 204 No Content

  ---

###  5. Reviews

   * **Approve a submission** (authenticated):
       * POST http://localhost:3000/api/submissions/:id/approve (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 201 Created (review data)

   * **Request changes** for a submission (authenticated):
       * POST http://localhost:3000/api/submissions/:id/request-changes (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 201 Created (review data)

   * **Get review history** for a submission (authenticated):
       * GET http://localhost:3000/api/submissions/:id/reviews (Replace :id with submission ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (array of review history data)

  ---

###  6. Notifications

   * **Get user activity feed** (authenticated):
       * GET http://localhost:3000/api/users/:id/notifications (Replace :id with user ID)
       * Headers: Authorization: Bearer YOUR_JWT_TOKEN
       * Expected: 200 OK (user activity data)

  ---

## Deployment on Render.com

### Prerequisites
- A Render.com account
- A PostgreSQL database (can be created on Render)

### Steps to Deploy

1. **Push your code to GitHub**
   - Make sure your code is in a GitHub repository

2. **Create a PostgreSQL Database on Render**
   - Go to Render Dashboard → New → PostgreSQL
   - Note down the connection details (host, database, user, password, port)

3. **Create a Web Service on Render**
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Configure the service:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Node

4. **Set Environment Variables in Render**
   Add the following environment variables in your Render service settings:
   ```
   NODE_ENV=production
   PORT=10000 (or leave empty - Render sets this automatically)
   DB_USER=<your_postgres_user>
   DB_HOST=<your_postgres_host>
   DB_DATABASE=<your_database_name>
   DB_PASSWORD=<your_postgres_password>
   DB_PORT=5432
   JWT_SECRET=<generate_a_strong_random_string>
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your application
   - Your API will be available at the provided Render URL

### Environment Variables

Create a `.env` file locally with the following variables:
- `PORT` or `APP_PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (production/development)
- `DB_USER`: PostgreSQL username
- `DB_HOST`: PostgreSQL host
- `DB_DATABASE`: PostgreSQL database name
- `DB_PASSWORD`: PostgreSQL password
- `DB_PORT`: PostgreSQL port (default: 5432)
- `JWT_SECRET`: Secret key for JWT tokens

### Notes
- The server automatically uses SSL for database connections in production
- Make sure your database is accessible from Render's servers
- Update your frontend API URLs to point to your Render deployment URL


