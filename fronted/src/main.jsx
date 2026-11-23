import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import PlayerContextProvider from '../src/context/PlayerContext.jsx'
import { UserProvider } from './context/User.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <PlayerContextProvider>
      <UserProvider>
        
           <App />
      
      </UserProvider>

    </PlayerContextProvider>
   
    </BrowserRouter>

 
)
