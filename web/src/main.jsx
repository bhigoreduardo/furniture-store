import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app'
import DefaultProvider from './app/providers/default'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DefaultProvider>
      <App />
    </DefaultProvider>
  </React.StrictMode>
)
