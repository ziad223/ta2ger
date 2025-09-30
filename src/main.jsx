import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import '../src/i18n/i18';
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
    <App />
  </Provider>,
)
