import React from 'react';
import ChatInterface from './components/ChatInterface';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ChatInterface />
    </>
  );
}

export default App;
