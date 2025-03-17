import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  }
});

// Configure CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend origin
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Tax-related prompts and responses
const taxPrompts = [
  "What are the current tax deduction limits for business expenses?",
  "How do I calculate depreciation for business assets?",
  "What are the tax implications of remote work employees?",
  "How do I handle international tax compliance?",
  "What are the recent changes in corporate tax laws?"
];

interface TaxResponse {
  prompt: string;
  response: string;
}

// Endpoint to get tax-related prompts
app.get('/api/prompts', (req, res) => {
  res.json({ prompts: taxPrompts });
});

// Endpoint to handle tax-related questions
app.post('/api/query', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Create a context-aware prompt for tax-related queries
    const enhancedPrompt = `As a tax expert at Deloitte, please provide detailed guidance on the following tax-related question: ${prompt}\n\nPlease ensure the response is accurate, professional, and follows US tax regulations.`;
    
    // Generate response
    const result = await model.generateContent(enhancedPrompt);
    
    // Check if response is blocked
    if (result.response.promptFeedback?.blockReason) {
      throw new Error('Response was blocked due to safety concerns');
    }
    
    const response = await result.response.text();
    res.json({ response });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 