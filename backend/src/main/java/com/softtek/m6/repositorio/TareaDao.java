package com.softtek.m6.repositorio;

import com.softtek.m6.modelos.entidades.Tarea;

import java.util.List;
import java.util.Optional;

/**
 * Esta interfaz sirve como una abstracción de las operaciones de acceso a datos y no depende de una implementación
 * concreta de ella. Esto significa que si en el futuro se decide cambiar JpaRepository por otra implementación
 * (por ejemplo JDBC) se pueda hacer sin mayores dificultades.
 */
public interface TareaDao {

    /**
     * Método para crear una entidad tipo Tarea en la base de datos.
     *
     * @param tarea entidad a ser cargada en la base de datos
     */
    void crearTarea(Tarea tarea);

    /**
     * Método para listar todas las tareas que existen en el repositorio
     * @return Lista de objetos tipo Tarea
     */
    List<Tarea> obtenerTareas();

    /**
     * Método para obtener una única tarea desde el repositorio, en base a su ID
     * @param id Id de la tarea solicitada
     * @return Objeto tipo Tarea
     */

    Optional<Tarea> obtenerTareaPorId(Integer id);

    /**
     * Método para actualizar tarea
     * @param tarea Tarea con los datos modificados
     */
    void actualizarTarea(Tarea tarea);
}
