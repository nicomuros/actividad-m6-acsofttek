import { useContext } from "react";
import { TareasContext } from "./TareasContext";

/**
 * Creamos un hook para consumir el contexto de las tareas. Este hook nos va a
 * devolver el valor del contexto de las tareas. Si no se encuentra dentro del
 * proveedor de tareas, el hook va a lanzar un error.
 */
export const useTareas = () => {
  const context = useContext(TareasContext);
  if (!context) {
    throw new Error("useTareas debe estar dentro del proveedor TareasContext");
  }
  return context;
}
