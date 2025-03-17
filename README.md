# Deloitte Auditor Enterprise Chat UI

A web interface for tax-related queries using prompt engineering. This application provides a clean interface for auditors to ask tax-related questions and receive appropriate responses.

## Features

- Modern, responsive UI with Deloitte branding
- Tax-specific prompt engineering
- Real-time response generation
- Clean and professional interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

## Running the Application

From the root directory, run:

```bash
npm start
```

This will start both the backend server (on port 5000) and the frontend development server (on port 3000).

- Backend API: http://localhost:5000
- Frontend UI: http://localhost:3000

## Development

- Backend: Express.js with TypeScript
- Frontend: React with TypeScript and styled-components
- API Endpoints:
  - GET `/api/prompts`: Get available tax-related prompts
  - POST `/api/query`: Submit a tax-related question

## Note

This is a development version. In production:

- The prompt engineering should be connected to a proper GPT model
- Proper authentication should be implemented
- Environment variables should be properly configured
- API endpoints should be secured
