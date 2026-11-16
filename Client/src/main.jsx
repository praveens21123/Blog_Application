import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import {BrowserRouter} from "react-router-dom"
import AuthContext from './context/AuthContext.jsx'
import { ToastContainer } from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ToastContainer> */}
    <BrowserRouter>
      
      <AuthContext>
        <App />
         <ToastContainer />
      </AuthContext>
      
    </BrowserRouter>
    {/* </ToastContainer> */}
  </StrictMode>,
)
