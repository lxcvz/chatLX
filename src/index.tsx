import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase'

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme';
import { Toaster } from 'react-hot-toast';
import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChakraProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <SidebarDrawerProvider>
          <App />
        </SidebarDrawerProvider>
      </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);