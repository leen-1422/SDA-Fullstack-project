import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'react-auth-kit/AuthProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={false}>
    <BrowserRouter>
    <App />

    </BrowserRouter>

    </AuthProvider>
  
    
  </Provider>
)
