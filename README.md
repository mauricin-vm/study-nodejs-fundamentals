# Node.js Fundamentals Study

This project is a Node.js application that implements a RESTful API for task and user management, demonstrating fundamental Node.js concepts such as streams, native modules, and file handling.

## 🚀 Technologies

- Node.js
- CSV Parse (for data import)
- Node.js native modules (http, fs, crypto)

## 📋 Features

### Task Management

- **List Tasks**: GET `/tasks`
  - Supports filtering by title/description via `search` query parameter
  - Returns all registered tasks

- **Create Task**: POST `/tasks`
  - Required fields: title, description
  - Automatically generates unique ID
  - Records creation and update dates

- **Update Task**: PUT `/tasks/:id`
  - Allows updating title and/or description
  - Automatically updates modification date

- **Toggle Task Completion**: PATCH `/tasks/:id`
  - Toggles task completion status
  - Updates modification date

- **Delete Task**: DELETE `/tasks/:id`
  - Removes the task from the system

### User Management

- **List Users**: GET `/users`
  - Supports filtering by name/email via `search` query parameter
  - Returns all registered users

- **Create User**: POST `/users`
  - Required fields: name, email
  - Automatically generates unique ID

- **Update User**: PUT `/users/:id`
  - Allows updating name and/or email

- **Delete User**: DELETE `/users/:id`
  - Removes the user from the system

### CSV Task Import

The project includes functionality for bulk task import from a CSV file.

- Expected CSV format:
  - First line: header (title,description)
  - Following lines: task data
- Stream processing for efficiency
- Artificial 2-second delay between imports for demonstration

## 🛠️ Project Structure

```
src/
├── database/         # Persistence layer
│   ├── database.js   # Database manipulation class
│   └── db.json      # Storage file
├── middleware/
│   └── json.js      # JSON parsing middleware
├── routes/
│   └── index.js     # Route definitions
├── streams/
│   ├── import-tasks.js  # CSV import script
│   └── tasks.csv       # Example file
├── utils/
│   └── index.js     # Utility functions
└── server.js        # Main server file
```

## 🚦 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start on port 3333.

3. To import tasks from CSV file:
   ```bash
   npm run import
   ```

## 📝 Implementation Notes

- Uses only Node.js native modules for HTTP server
- Implements custom routing system with query parameter support
- JSON file persistence (db.json)
- Stream processing for efficient data import
- Proper error handling and validations
- Standardized HTTP responses with appropriate status codes

## 🔍 Usage Examples

### Create a New Task

```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New Task", "description": "Task description"}'
```

### List Tasks with Filter

```bash
curl "http://localhost:3333/tasks?search=project"
```

### Toggle Task Completion

```bash
curl -X PATCH http://localhost:3333/tasks/:id
```

## 📚 Demonstrated Learning Concepts

- Node.js native module handling
- HTTP server implementation without frameworks
- Stream processing
- File handling
- CSV parsing
- Route management
- Middleware pattern
- Asynchronous request handling