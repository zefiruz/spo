import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './reset.css'
import './index.css'
import App from './App.jsx'
import AppProvider from './context/AppProvider'
import GlobalModalContainer from './components/Modals/GlobalModalContainer'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter basename="/spo">
        <App />
        <GlobalModalContainer />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>,
)
