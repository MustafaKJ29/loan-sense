# Loan Sense Backend

Backend server for the Loan Sense application. This server provides APIs for loan application processing, risk assessment, and loan management.

## Features

- Loan application submission and processing
- Risk assessment calculation
- Loan status management
- File upload handling
- User authentication and authorization

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- POST `/api/loan/assess` - Submit new loan application
- GET `/api/loans` - Get all loan applications with filtering
- GET `/api/loans/user/:userId` - Get user's loan applications
- PUT `/api/loan/:id/status` - Update loan status

## Environment Variables

Create a `.env` file with:
```
PORT=5001
MONGODB_URI=your_mongodb_uri
```

## Deployment

The server is configured for deployment on Heroku. Simply push to Heroku master to deploy. 