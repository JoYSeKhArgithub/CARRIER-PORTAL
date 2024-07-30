# Carrier Portal Backend

This is a backend for a carrier portal application that manages user authentication and authorization using JWT tokens. It includes features for user registration, login, and profile updates, as well as CRUD operations on job listings, including searching, sorting, and pagination.

## Features

- **User Authentication and Authorization**
  - Registration
  - Login
  - Profile Update

- **Job Management**
  - Create Job
  - Update Job
  - Delete Job
  - Search Jobs
  - Sort Jobs
  - Paginate Jobs
  - Count Job Statistics

## Technology Stack

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Other Tools:** Mongoose, bcrypt, dotenv

## API Endpoints

### User Routes

- **POST /api/v1/auth/register**
  - Registers a new user.
  - 
- **POST /api/v1/auth/login**
  - Logs in a user and returns a JWT token.

- **PUT /api/v1/user/update-user**
  - Updates user profile information.

### Job Routes

- **POST /api/v1/job/create-job**
  - Creates a new job.

- **PATCH /api/v1/job/update-job/:id**
  - Updates a job.
- **DELETE /api/v1/job/logout-job/:id**
  - Deletes a job.

- **GET /api/v1/job/get-jobs**
  - Retrieves jobs with optional searching, sorting, and pagination.
  - **Query Parameters:**
    - `search`: Search keyword
    - `sort`: Sorting criteria (e.g., `title`, `location`)
    - `page`: Page number (for pagination)
    - `limit`: Number of jobs per page

- **GET /api/v1/job/job-stats**
  - Retrieves job statistics (e.g., total jobs, jobs by time).

## Configuration
Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT: Set to your desired port number.
    MONGODB_URI: Set to your MongoDB connection URI.
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRY= Set to the desired expiration time for JWT tokens
    ```
    
## Documentation

For detailed API documentation and examples, visit the [Postman Documentation](https://documenter.getpostman.com/view/34969211/2sA3kYhzAM).
