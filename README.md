# Node.js Fundamentals Study

This project is a RESTful API implementation using pure Node.js (no frameworks), developed to study and understand Node.js fundamentals.

## 🚀 Features

- Complete user CRUD operations
- Custom routing system
- JSON processing middleware
- In-memory database with file persistence
- Query params support for user search
- Streams for data manipulation

## 📁 Project Structure

```
src/
├── database/         # Database implementation
│   ├── database.js   # Database class
│   └── db.json      # Persistence file
├── middleware/
│   └── json.js      # JSON processing middleware
├── routes/
│   └── index.js     # Application routes definition
├── streams/
│   └── index.js     # Streams implementation
├── utils/
│   └── index.js     # Utility functions
└── server.js        # Main server file
```

## 🛠️ Technologies Used

- Node.js
- Native modules:
  - http
  - crypto
  - fs
  - streams

## 🚦 API Routes

### Users

- `GET /users` - List all users
  - Query params: `search` (search by name or email)
- `POST /users` - Create a new user
  - Body: `{ "name": "string", "email": "string" }`
- `PUT /users/:id` - Update a user
  - Body: `{ "name": "string", "email": "string" }`
- `DELETE /users/:id` - Remove a user

## ⚙️ How to Run

1. Clone the repository:
```bash
git clone https://github.com/mauricin-vm/study-nodejs-fundamentals.git
```

2. Navigate to project folder:
```bash
cd study-nodejs-fundamentals
```

3. Run the server in development mode:
```bash
npm run dev
```

The server will be running at `http://localhost:3333`

## 🔍 Implemented Features

- Native HTTP server without frameworks
- Routing system with URL parameters support
- Automatic JSON processing middleware
- In-memory database with JSON file persistence
- Stream implementation for data processing
- Query parameters handling for search filters

## 📝 License

This project is under the ISC license.