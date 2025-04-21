# Loan Sense Backend Deployment Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Local Development Setup
1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
node server.js
```

## Production Deployment

### Option 1: Deploy to Heroku
1. Create a Heroku account and install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create loan-sense-backend
```

4. Deploy to Heroku:
```bash
git push heroku main
```

### Option 2: Deploy to DigitalOcean
1. Create a DigitalOcean account
2. Create a new Droplet with Node.js
3. Clone your repository
4. Install dependencies
5. Use PM2 to run the server:
```bash
npm install -g pm2
pm2 start server.js
```

### Option 3: Deploy to AWS
1. Create an AWS account
2. Set up an EC2 instance
3. Install Node.js
4. Clone your repository
5. Install dependencies
6. Use PM2 to run the server:
```bash
npm install -g pm2
pm2 start server.js
```

## Environment Variables
Create a `.env` file with the following variables:
```
PORT=5001
NODE_ENV=production
```

## Production Considerations
- Use environment variables for configuration
- Implement proper error handling
- Set up logging
- Configure CORS properly for production
- Use HTTPS
- Implement rate limiting
- Set up proper security headers 