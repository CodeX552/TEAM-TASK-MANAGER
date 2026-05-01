# Team Task Manager

A full-stack role-based task management application for teams, built with React, Express, and MongoDB.

## Live Deployment

- Frontend: https://frontend-production-245c.up.railway.app
- Backend API: https://backend-production-4a47.up.railway.app
- API Health: https://backend-production-4a47.up.railway.app/api/health

## Project Overview

Team Task Manager helps teams plan projects, assign tasks, and track progress through a simple dashboard.

It supports:

- Authentication using JWT
- Role-based permissions (`admin` and `member`)
- Project creation and membership management
- Task assignment and status updates
- Dashboard statistics (total, completed, pending, overdue)

## Tech Stack

### Frontend

- React 19
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Express Validator

### DevOps

- Railway (frontend, backend, database)
- GitHub (source control)

## Repository Structure

```text
team-task-manager/
	backend/
		src/
			config/
			controllers/
			middleware/
			models/
			routes/
			validators/
			app.js
			server.js
			seed.js
	frontend/
		src/
			api/
			components/
			context/
			pages/
			App.jsx
			main.jsx
```

## Features

### Authentication

- Sign up and login
- JWT token-based auth
- Token stored in localStorage and attached to API requests

### Role-Based Access

- `admin`:
  - Create/update/delete projects
  - Create/delete tasks
  - View all users
  - View all tasks and projects
- `member`:
  - View own/assigned data
  - Update status of tasks assigned to them

### Projects

- Create project with name, description, and members
- Auto-includes creator as member
- Admin can edit/delete projects

### Tasks

- Create task with assignee, due date, and project
- Track status: `todo`, `in_progress`, `completed`
- Overdue tasks are marked automatically

### Dashboard

- Total tasks
- Completed tasks
- Pending tasks
- Overdue tasks

## API Endpoints

Base URL:

- Local: `http://localhost:5000/api`
- Production: `https://backend-production-4a47.up.railway.app/api`

### Auth

- `POST /auth/signup`
- `POST /auth/login`

### Projects (Authenticated)

- `GET /projects` (admin: all, member: own projects)
- `POST /projects` (admin only)
- `PUT /projects/:id` (admin only)
- `DELETE /projects/:id` (admin only)

### Tasks (Authenticated)

- `GET /tasks` (admin: all, member: assigned)
- `GET /tasks/dashboard/stats`
- `POST /tasks` (admin only)
- `PUT /tasks/:id` (admin can update all fields, member can update only own task status)
- `DELETE /tasks/:id` (admin only)

### Users (Authenticated)

- `GET /users` (admin only)

### Health

- `GET /health` is mounted as `GET /api/health`

## Local Development Setup

## 1) Clone repository

```bash
git clone https://github.com/CodeX552/TEAM-TASK-MANAGER.git
cd TEAM-TASK-MANAGER
```

## 2) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

## 3) Configure environment variables

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/demo
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env` (optional for local):

```env
VITE_API_URL=http://localhost:5000/api
```

## 4) Seed demo data (optional)

```bash
cd backend
npm run seed
```

Seeded demo credentials:

- Admin: `admin@demo.com` / `Admin@123`
- Member: `member@demo.com` / `Member@123`

## 5) Run backend

```bash
cd backend
npm run dev
```

## 6) Run frontend

```bash
cd frontend
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Environment Variables

### Backend

- `PORT` - API port
- `MONGODB_URI` - Mongo connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRES_IN` - Token duration (example: `7d`)
- `CLIENT_URL` - Allowed CORS origin for frontend

### Frontend

- `VITE_API_URL` - Backend API base URL (include `/api`)

## Railway Deployment Notes

This project is deployed on Railway with three services:

- `MongoDB` (managed database)
- `backend` (Node/Express API)
- `frontend` (Vite build served in production)

Important deployment settings used:

- Frontend env: `VITE_API_URL=https://backend-production-4a47.up.railway.app/api`
- Backend env: `CLIENT_URL=https://frontend-production-245c.up.railway.app`
- Backend env: `MONGODB_URI` referenced from Railway MongoDB service variables

## Scripts

### Backend (`backend/package.json`)

- `npm run dev` - Run backend with nodemon
- `npm start` - Run backend in production mode
- `npm run seed` - Seed demo data

### Frontend (`frontend/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Security Notes

- Do not commit real production secrets to GitHub.
- Rotate `JWT_SECRET` for production use.
- Restrict `CLIENT_URL` to your real frontend domain.

## Common Troubleshooting

- If login fails with 401: verify JWT token is present and valid.
- If CORS error appears: check backend `CLIENT_URL` value.
- If API calls fail from frontend: verify `VITE_API_URL` includes `/api`.
- If database connection fails: verify `MONGODB_URI` is set correctly.

## Future Improvements

- Add refresh tokens and secure cookie auth
- Add file attachments and comments in tasks
- Add unit/integration tests
- Add CI/CD workflow with GitHub Actions

## License

This project is for learning and portfolio/demo use.
