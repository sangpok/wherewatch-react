import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalReset = createGlobalStyle`
  ${reset}

  * {
    font-family: 'Roboto', sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    box-sizing: border-box !important;
    color: #282828;
  }

  body {
    background: #525252;
  }

  ::-webkit-scrollbar { width: 16px; } 
  ::-webkit-scrollbar-track { background-color: transparent; }
  ::-webkit-scrollbar-thumb {
      background: #606060;
      border: 4px solid transparent;
      border-radius: 8px;
      background-clip: content-box;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalReset />
    <App />
  </>
);

// reportWebVitals();
