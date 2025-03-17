import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  border: 1px solid #1b2b85;
  border-radius: 8px;
`;

const Header = styled.div`
  background-color: #1b2b85;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
  font-size: 2rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: normal;
`;

const ChatArea = styled.div`
  background-color: white;
`;

const PromptArea = styled.div`
  padding: 2rem;
`;

const PromptTitle = styled.div`
  color: #1b2b85;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 1rem 4rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: normal;
  font-size: 1.5rem;
  background-color: ${props => props.primary ? '#1b2b85' : '#6a1b9a'};
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
  justify-content: center;
  
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SendIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ResponseArea = styled.div`
  padding: 2rem;
  background-color: #e8e8e8;
  min-height: 200px;
`;

const ResponseTitle = styled.div`
  color: #1b2b85;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #f8d7da;
`;

const ChatInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:5001';

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.details || 'Failed to get response from server');
      }
      
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setError('Unable to connect to the server. Please make sure the server is running.');
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
      setResponse('');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setPrompt('');
    setResponse('');
    setError(null);
  };

  return (
    <Container>
      <Header>
        <Logo>Deloitte Auditor Enterprise Chat UI</Logo>
        <img src="/images/deloitte-logo.png" alt="Deloitte" height="40" />
      </Header>
      
      <ChatArea>
        <PromptArea>
          <PromptTitle>Tax Prompt</PromptTitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <TextArea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your tax-related question here..."
          />
          <ButtonContainer>
            <Button primary onClick={handleSubmit} disabled={loading}>
              <SendIcon>
                <img src="/images/my-logo.png" alt="Send" />
              </SendIcon>
              {loading ? 'Processing...' : 'Send'}
            </Button>
            <Button onClick={handleClear}>Cancel</Button>
          </ButtonContainer>
        </PromptArea>
        
        <ResponseArea>
          <ResponseTitle>Response</ResponseTitle>
          <div>{response}</div>
        </ResponseArea>
      </ChatArea>
    </Container>
  );
};

export default ChatInterface; 