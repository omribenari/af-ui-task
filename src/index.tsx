import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          colors: {
            // override dark colors to change them for all components
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d',
              '#1a1c23', // main background color
              '#0c0d21',
              '#01010a',
            ],
          },
        }}
      >
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
