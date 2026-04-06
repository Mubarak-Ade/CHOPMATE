# ChopMate Backend

Starter backend for a MERN stack application using Node.js, Express, and MongoDB.

## Included

- Express server setup
- MongoDB connection with Mongoose
- Security and logging middleware
- Centralized error handling
- Environment variable support
- Health check route

## Packages

### Runtime

- express
- mongoose
- dotenv
- cors
- helmet
- morgan

### Development

- nodemon

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Update `MONGO_URI` in `.env` if needed.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` starts the server with nodemon
- `npm start` starts the server with Node.js

## API Routes

- `GET /` returns a basic API message
- `GET /api/health` returns API health information

## Suggested Next Steps

- Add models, controllers, and feature routes
- Add authentication and authorization
- Add validation and testing
