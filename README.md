# Student Task Management System

## 📌 Project Overview

The **Student Task Management System** is a backend application developed using Node.js, Express.js, and MongoDB. It helps manage student tasks by allowing users to create, view, update, delete, and track tasks based on their status and priority.

The project provides REST APIs for task management, user authentication, and dashboard statistics. Swagger UI is used for API documentation and testing.

## 🚀 Features

- **Task Management:** Create, retrieve, update, and delete tasks.
- **Task Status:** Track tasks as Pending, In Progress, or Completed.
- **Priority Management:** Assign Low, Medium, or High priority.
- **Search and Filtering:** Search tasks by title and filter by status or priority.
- **Sorting and Pagination:** Organize task results and retrieve them page by page.
- **User Authentication:** Register users and log in securely.
- **Password Hashing:** Protect user passwords using bcrypt.
- **JWT Authentication:** Support token-based authentication.
- **Dashboard Statistics:** View total tasks and counts by status.
- **API Documentation:** Explore and test APIs through Swagger UI.
- **Cloud Database:** Store data using MongoDB Atlas.
- **Deployment:** Host the backend API on Render.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| JSON Web Token (JWT) | Token-based authentication |
| Swagger UI | API documentation and testing |
| Postman | API testing |
| Git and GitHub | Version control and source code management |
| Render | Backend deployment |

## 🌐 Project Links

- **GitHub Repository:** https://github.com/PrithihaaD/Student-Task-Management-System-Final
- **Live Backend API:** https://student-task-management-system-final-1.onrender.com
- **Swagger API Documentation:** https://student-task-management-system-final-1.onrender.com/api-docs/

## 📚 API Endpoints

### Task Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

The task retrieval endpoint supports filtering, searching, sorting, and pagination.

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/register-many` | Register multiple users |
| POST | `/api/auth/login` | Log in a user |

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | Retrieve task statistics |

For request formats and response examples, refer to the [Swagger API Documentation](https://student-task-management-system-final-1.onrender.com/api-docs/).

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas account or a MongoDB database
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/PrithihaaD/Student-Task-Management-System-Final.git
```

### Step 2: Navigate to the Project Directory

```bash
cd Student-Task-Management-System-Final
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the project root directory and configure the required variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the example values with the actual configuration required by the application. Never upload real secrets or database credentials to GitHub.

### Step 5: Start the Server

```bash
npm start
```

If the project does not define a `start` script, use the appropriate command configured in `package.json`, such as:

```bash
node server.js
```

The server will start on the configured port when the database connection succeeds.

## 🧪 API Testing

The APIs can be tested using:

- **Swagger UI:** Open the deployed Swagger documentation URL to explore endpoints and execute requests.
- **Postman:** Send HTTP requests and inspect response status codes and JSON responses.

## 🔒 Security

- Passwords are hashed before storage.
- Environment variables are used for sensitive configuration.
- JWT is used for token-based authentication.
- Database credentials and secret keys should not be committed to the repository.

## 🎯 Project Objective

The objective of this project is to develop a structured backend application that demonstrates REST API development, database integration, CRUD operations, authentication, API documentation, testing, and cloud deployment.

## 👩‍💻 Author

Developed as a Student Task Management System project using Node.js, Express.js, and MongoDB.
