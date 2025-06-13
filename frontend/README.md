# Event Management Platform

## Overview
The Event Management Platform is a full-stack web application that allows users to create, manage, and attend events. The platform supports real-time updates using WebSockets, user authentication, and event interaction features.

## Features
- User authentication (login/register) using JWT
- Event creation, editing, and deletion
- Attendee management with real-time updates
- Secure API with Express.js and MongoDB
- Responsive UI built with React and Tailwind CSS
- WebSocket integration for real-time event updates

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Real-time Communication:** Socket.io
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (v14+)
- MongoDB (local or cloud instance)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform
   ```
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## Usage
- **Register/Login:** Users can sign up or log in to the platform.
- **Create Events:** Logged-in users can create events.
- **View Events:** Users can browse events and see details.
- **Attend Events:** Users can join events, and attendance updates in real-time.

## API Endpoints
### Authentication
- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in to the platform

### Events
- `POST /api/events` – Create an event (Protected route)
- `GET /api/events` – Fetch all events
- `GET /api/events/:id` – Fetch event details
- `POST /api/events/:id/attend` – Attend an event (Protected route)

## WebSocket Events
- `joinEvent` – Join a WebSocket room for event updates
- `updateAttendees` – Receive real-time attendee updates

- **Frontend:** Deploy on Vercel with `npm run build`
- **Backend:** Deploy on Render or Railway with MongoDB connection


## License
This project is licensed under the MIT License and created by Deepanshu Chauhan.

## Contact
For inquiries, reach out via GitHub Issues or email at `your-email@example.com`.

