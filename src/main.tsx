import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'react-auth-kit/AuthProvider'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

  <Provider store={store}>
    
      <BrowserRouter>
      <App />
      </BrowserRouter>

    
  </Provider>
      
  </React.StrictMode>
)
