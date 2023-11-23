import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tareas from './pages/Tareas/Tareas.jsx';
import NuevaTarea from './pages//NuevaTarea/NuevaTarea.jsx';
import ModificarTarea from './pages/ModificarTarea/ModificarTarea.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import './App.css';

/**
 * Este componente es el encargado de manejar las rutas de la aplicación
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Tareas />} />{' '}
        {/* Ruta para listar las tareas */}
        <Route path='/crear' element={<NuevaTarea />} />{' '}
        {/* Ruta para crear una tarea */}
        <Route path='/modificar/:id' element={<ModificarTarea />} />{' '}
        {/* Ruta para modificar una tarea */}
        <Route path='*' element={<NotFound />} />{' '}
        {/* Ruta para cuando no se encuentre la ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
