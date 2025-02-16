# Task API

A simple RESTful API for managing tasks, built with Node.js, Express, and Prisma. This API allows users to register, log in, and manage their tasks.

## Features

- User registration and authentication using JWT.
- Create, retrieve, and manage tasks.
- Middleware for authentication.
- PostgreSQL as the database.

## Technologies Used

- Node.js
- Express
- Prisma
- PostgreSQL
- JWT for authentication
- Bcrypt for password hashing
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Penzslyr/TaskApi-express.git
   cd TaskApi-express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:

   ```plaintext
   DATABASE_URL=postgres://username:password@localhost:5432/taskdb
   JWT_SECRET="your_secret_key"
   ```

   Replace `username`, `password`, and `taskdb` with your PostgreSQL credentials and database name.

4. Set up the database using Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Application

To start the server in development mode, use:

```bash
npm run dev
```

The server will run on `http://localhost:5000`.

### API Endpoints

#### Authentication

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Log in an existing user.

#### Tasks

- **POST** `/tasks`: Create a new task (requires authentication).
- **GET** `/tasks`: Retrieve all tasks for the authenticated user (requires authentication).

### Example Requests

#### Register a User

```bash
curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

#### Log in a User

```bash
curl -X POST http://localhost:5000/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
```

#### Create a Task

```bash
curl -X POST http://localhost:5000/tasks \
-H "Authorization: Bearer <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{"title": "New Task", "description": "Task description"}'
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
