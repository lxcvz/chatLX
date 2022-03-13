import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase'

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);