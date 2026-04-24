# BookStore

A React + Node.js/Express Book Store application with a modern UI and REST API backend.

## Project Structure

- `client/` - React frontend
  - `src/` - application source code
  - `src/components/` - reusable UI components
  - `src/pages/` - page views
  - `src/context/` - shared state management
  - `src/services/api.jsx` - backend API requests
- `server/` - Node.js/Express backend
  - `controllers/` - request handlers
  - `models/` - data models
  - `routes/` - API routes
  - `database/` - database connection

## Features

- Browse books on the Explore page
- View book details with a dedicated details page
- Add, edit, and delete books from the Manage Books page
- Shared frontend state for data syncing
- Responsive, modern UI design

## Environment Setup

### Backend Environment Variables

1. Copy the example environment file:

   ```bash
   cd server
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   - `PORT`: Server port (default: 3500)
   - `MONGO_URI`: MongoDB connection string

### Frontend Environment Variables

1. Copy the example environment file:

   ```bash
   cd client
   cp .env.example .env
   ```

2. Update the `.env` file with your actual values:
   - `VITE_API_URL`: Backend API URL (default: http://localhost:3500/api)

## Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## API Endpoints

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Notes

- The frontend uses React functional components and hooks.
- The backend uses Express and connects to the database via the server API.
- The app is styled using CSS with a design system for spacing, typography, and responsive layout.

## License

This project is provided as-is.
