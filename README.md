# Deloitte Auditor Enterprise Chat UI

A web interface for tax-related queries using prompt engineering and Gemini API integration. This application provides a clean interface for auditors to ask tax-related questions and receive appropriate responses.

## Features

- Modern, responsive UI with Deloitte branding
- Tax-specific prompt engineering using Gemini API
- Real-time response generation
- Clean and professional interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud API key for Gemini API

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/parth2398/assignment-2.git
   cd assignment-2
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

## Running the Application

From the root directory, run:

```bash
npm start
```

This will start both the backend server (on port 5001) and the frontend development server (on port 3000).

- Backend API: http://localhost:5001
- Frontend UI: http://localhost:3000

## Development

- Backend: Express.js with TypeScript
- Frontend: React with TypeScript and styled-components
- API Integration: Google Gemini API
- API Endpoints:
  - GET `/api/prompts`: Get available tax-related prompts
  - POST `/api/query`: Submit a tax-related question

## Note

This is a development version. In production:

- Proper authentication should be implemented
- Environment variables should be properly configured
- API endpoints should be secured
- Error handling should be enhanced
