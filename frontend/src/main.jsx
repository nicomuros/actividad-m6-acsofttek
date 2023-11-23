import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TareasProvider } from './context/TareasContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * Se crea el contexto y se renderiza el componente App
 * dentro de él para que todos los componentes tengan acceso
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TareasProvider>
      <App />
    </TareasProvider>
  </React.StrictMode>,
)
