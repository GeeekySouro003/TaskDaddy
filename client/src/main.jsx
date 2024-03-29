import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import App from './App.jsx';
import './index.css';
import store from './Store/ReduxStore.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<App />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
