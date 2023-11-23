import { createContext, useState } from "react";
import { getTareasRequest, createTareaRequest, updateTareaRequest, deleteTareaRequest} from "../services/api/tareas.js";

// Creamos el contexto de las tareas.
export const TareasContext = createContext();

/**
 * Creamos un componente que va a ser el proveedor del contexto de las tareas.
 * Este componente va a ser el padre de todos los componentes que necesiten
 * consumir el contexto de las tareas.
 */
// eslint-disable-next-line react/prop-types
export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState(null); // Inicializamos el estado de las tareas en null.
  const [error, setError] = useState(null); // Este estado sirve para guardar el error en caso de que ocurra alguno.

  /**
   * Esta función se encarga de realizar una petición GET a la URL /api/tarea
   * y guardar las tareas en el estado de tareas. Si ocurre un error, lo guarda
   * en el estado de error. 
   */
  const getTareas = async () => {
    try {
      const res = await getTareasRequest();
      setTareas(res.data);
      setError(null);
    } catch (error) {
      setError(error);
    } 
  }

  /**
   * Esta función se encarga de crear una tarea. Para ello, realiza una petición
   * POST a la URL /api/tarea con la tarea que se pasa por parámetro. Una vez
   * que se crea la tarea, la agrega al arreglo de tareas. Si ocurre un error,
   * lo guarda en el estado de error. 
   * @param tarea La tarea que se va a crear.
   */
  const createTarea = async (tarea) => {
    try {
      const tareaCreada = await createTareaRequest(tarea);
      setTareas([...tareas, tareaCreada.data]);
      setError(null);
      return true;
    } catch (error) {
      if (error.response) setError(error.response.data);

      return false
    } 
  }

  /**
   * Esta función se encarga de actualizar una tarea. Para ello, realiza una
   * petición PUT a la URL /api/tarea/:id con la tarea que se pasa por
   * parámetro. Una vez que se actualiza la tarea, la actualiza en el arreglo de
   * tareas. Si ocurre un error, lo guarda en el estado de error. Siempre que se
   * llame a esta función, se va a poner el estado de loading en true y una vez
   * que se resuelva la petición, se va a poner en false.
   * @param tarea La tarea que se va a actualizar.
   */
  const updateTarea = async (id, tarea) => {
    try {
      const tareaActualizada = await updateTareaRequest(id, tarea);
      const index = tareas.findIndex((t) => t.id === tareaActualizada.data.id);
      const newTareas = [...tareas];
      newTareas[index] = tareaActualizada.data;
      setTareas(newTareas);
      setError(null);
    } catch (error) {
      if (error.response) setError(error.response.data);
    }
  }

  /**
   * Esta función se encarga de eliminar una tarea. Para ello, realiza una
   * petición DELETE a la URL /api/tarea/:id. Una vez que se elimina la tarea,
   * la elimina del arreglo de tareas. Si ocurre un error, lo guarda en el
   * estado de error. 
   * @param id El id de la tarea que se va a eliminar.
   */
  const deleteTarea = async (id) => {
    try {
      await deleteTareaRequest(id);
      const newTareas = tareas.filter((t) => t.id !== id);
      setTareas(newTareas);
      setError(null);
    } catch (error) {
      setError(error);
    }
  }

  const getTareaById = (id) => {
    return tareas.find((t) => t.id == id);
  }

  /**
   * Objeto que contiene los valores que se van a pasar al contexto de las
   * tareas. Este objeto contiene los estados y las funciones que se crearon
   * anteriormente.
   */
  const value = {
    tareas,
    error,
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea,
    getTareaById
  };

  /**
   * Aca se retorna el componente que va a ser el proveedor del contexto de las
   * tareas. Este componente va a ser el padre de todos los componentes que
   * necesiten consumir el contexto de las tareas.
   */
  return (
    <TareasContext.Provider value={value}>
      {children}
    </TareasContext.Provider>
  );
}