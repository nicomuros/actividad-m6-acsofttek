package com.softtek.m6.servicio;

import com.softtek.m6.excepciones.DatosInvalidosException;
import com.softtek.m6.modelos.dto.TareaRequestDTO;
import com.softtek.m6.modelos.dto.TareaResponseDTO;
import com.softtek.m6.modelos.entidades.Tarea;
import com.softtek.m6.modelos.mapper.TareaMapper;
import com.softtek.m6.repositorio.TareaDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class TareaServicio {
    TareaDao tareaDao;

    TareaMapper tareaMapper;

    @Autowired
    public TareaServicio(TareaDao tareaDao, TareaMapper tareaMapper){
        this.tareaDao = tareaDao;
        this.tareaMapper = tareaMapper;
    }

    /**
     * Método para gestionar la creación de la tarea. Se encarga de realizar las validaciones necesarias, crear la entidad
     * Tarea y solicitarle al Dao que la agregue a la base de datos. Para que una tarea sea considerada como válida debe
     * cumplir con:
     * <ul>
     *     <li>El <b>título</b> no debe ser nulo y debe contener entre 3 y 15 caracteres.</li>
     *     <li>La <b>descripción</b> no debe ser nula y debe contener entre 3 y 50 caracteres.</li>
     *     <li>La <b>fecha de finalización</b> no debe ser nula ni debe ser previa a la fecha de creación.</li>
     * </ul>
     *
     * @param tareaRequestDTO DTO con los datos de la entidad tarea a ser cargada
     */
    public TareaResponseDTO crearTarea(TareaRequestDTO tareaRequestDTO){

        // Validar datos
        validarNuevaTarea(tareaRequestDTO);

        // Conversión de DTO a Tarea
        Tarea tarea = tareaMapper.DtoATarea(tareaRequestDTO);

        // Se agrega la fecha de creación
        tarea.setFechaCreacion(LocalDate.now());

        // Se configura como disponible al crearse la tarea
        tarea.setDisponible(true);
        tarea.setTerminada(false);

        // Se agrega al repositorio
        tareaDao.crearTarea(tarea);

        // Se retorna la tarea creada
        return tareaMapper.tareaADto(tarea);
    }

    /**
     * Este método se encarga de solicitar al repositorio la lista de tareas completa. Luego filtra aquellas que estén
     * marcadas como disponibles (es decir, que no hayan sido marcadas para eliminar) a traves de la API STREAM. Por
     * último, convierte la lista de entidades Tarea en una lista de ResponseDTO y las devuelve.
     *
     * @return Lista de todas las tareas marcadas como disponibles en formato de Lista de objetos ResponseDTO.
     */
    public List<TareaResponseDTO> listarTareas(){

        // Se solicita la lista de tareas
        List<Tarea> listaDeTareas = tareaDao.obtenerTareas()
                .stream() // Se convierte en un flujo
                .filter(Tarea::getDisponible) // Se filtran solo aquellas que estén disponibles
                .toList(); // Se convierte a lista nuevamente
        return tareaMapper.listaTareaAListaDto(listaDeTareas); // Se retorna la lista de tareas como DTOs
    }

    /**
     * Método para modificar campos de entidades tipo Tarea. Es capaz de manejar cambios en campos individiuales, esto
     * lo logra de la siguiente forma:
     * <ol>
     *     <li> Verifica si el campo es nulo. En caso de que lo sea, significa que no se envió desde el cliente una
     *     solicitud de modificación de dicho campo (por ejemplo, si solo se quiere modificar el título, el objeto
     *     <b>TareaRequestDTO</b> va a contener valores nulos para el resto de los campos, por lo que no se van a
     *     modificar. </li>
     *     <li>Si el campo no es nulo, verifica que hayan modificaciones respecto al estado anterior de la Tarea. Si
     *     no hubieran modificaciones, tampoco se procede a actualizar el estado de la Tarea. </li>
     *     <li>Se valida (en caso de ser necesario) que el campo cumpla con los requisitos para poder cargarse a la base
     *     de datos.</li>
     *     <li>Si hubiera algún cambio, se actualiza la fecha de modificación y se solicita al repositorio la
     *     actualizacion.</li>
     * </or>
     *
     * @param id El ID de la tarea a modificar.
     * @param tareaRequestDTO DTO con los campos que deban ser modificados.
     */
    public TareaResponseDTO modificarTarea(Integer id, TareaRequestDTO tareaRequestDTO){

        // Se recupera la tarea del repositorio. Si no existe, se lanza un error
        Tarea tarea = tareaDao.obtenerTareaPorId(id)
                .orElseThrow(() -> new DatosInvalidosException("No se encontró una tarea con el id: " + id + "."));

        // Variable para control de cambios
        boolean cambio = false;

        // Se verifica si es necesario actualizar el campo Titulo
        if (tareaRequestDTO.getTitulo() != null
                && !tareaRequestDTO.getTitulo().equals(tarea.getTitulo())){

            // Se valida el título
            validarTitulo(tareaRequestDTO.getTitulo());

            // Se actualiza el título en la entidad Tarea
            tarea.setTitulo(tareaRequestDTO.getTitulo());

            // Se notifica que se cambió un estado
            cambio = true;
        }

        // Se verifica si es necesario actualizar el campo Descripcion
        if (tareaRequestDTO.getDescripcion() != null
                && !tareaRequestDTO.getDescripcion().equals(tarea.getDescripcion())){

            // Se valida la descripción
            validarDescripcion(tareaRequestDTO.getDescripcion());

            // Se actualiza la descripción en la entidad Tarea
            tarea.setDescripcion(tareaRequestDTO.getDescripcion());

            // Se notifica que cambió un estado
            cambio = true;
        }

        // Se verifica si es necesario actualizar el campo Fecha de finalización
        if (tareaRequestDTO.getFechaFinalizacion() != null
                && !tareaRequestDTO.getFechaFinalizacion().equals(tarea.getFechaFinalizacion())){

            // Se valida la nueva fecha
            validarFechaFinalizacion(tareaRequestDTO.getFechaFinalizacion());

            // Se actualiza la fecha de modificación en la entidad Tarea
            tarea.setFechaFinalizacion(tareaRequestDTO.getFechaFinalizacion());

            // Se notifica que cambió un estado
            cambio = true;
        }

        // Se verifica si es necesario actualizar si está terminada la tarea
        if (tareaRequestDTO.getTerminada() != null &&
                !tareaRequestDTO.getTerminada().equals(tarea.getTerminada())){

            // Se actualiza el estado de la tarea
            tarea.setTerminada(tareaRequestDTO.getTerminada());

            // Se notifica que cambió un estado
            cambio = true;
        }

        // Si no hubieron modificaciones, se lanza un error
        if (!cambio) throw new DatosInvalidosException("No se proporcionaron datos modificados.");

        // Si hubieron modificaciones, se actualiza la fecha de modificación
        tarea.setFechaModificacion(LocalDate.now());

        // Se solicita actualizar la tarea.
        tareaDao.actualizarTarea(tarea);

        // Se retorna la tarea modificada
        return tareaMapper.tareaADto(tarea);
    }

    public void eliminarTarea(Integer id){
        // Se recupera la tarea del repositorio. Si no existe, se lanza un error
        Tarea tarea = tareaDao.obtenerTareaPorId(id)
                .orElseThrow(() -> new DatosInvalidosException("No se encontró una tarea con el id: " + id + "."));

        // Se cambia el estado de disponibilidad de la tarea a false, ya no se va a recuperar en los listados
        tarea.setDisponible(false);

        // Se actualiza la fecha de modificación
        tarea.setFechaModificacion(LocalDate.now());

        // Se solicita actualizar el estado de la Tarea
        tareaDao.actualizarTarea(tarea);
    }

    /**
     * Este método se encarga de validar el DTO de una solicitud de nueva tarea. Realiza las siguientes validaciones:
     * <ul>
     *     <li>El <b>título</b> no debe ser nulo y debe contener entre 3 y 15 caracteres.</li>
     *     <li>La <b>descripción</b> no debe ser nula y debe contener entre 3 y 50 caracteres.</li>
     *     <li>La <b>fecha de finalización</b> no debe ser nula ni debe ser previa a la fecha de creación.</li>
     * </ul>
     *
     * @param tareaRequestDTO DTO con los datos a ser validados.
     */
    private void validarNuevaTarea(TareaRequestDTO tareaRequestDTO){

        // Verificación de que no sea nulo ni blanco
        if (tareaRequestDTO.getTitulo().isBlank())
            throw new DatosInvalidosException("No se proporcionó un título.");

        // Verificación de que no sea nulo ni blanco
        if (tareaRequestDTO.getDescripcion().isBlank())
            throw new DatosInvalidosException("No se proporcionó una descripción.");

        // Verificación de que no sea nulo
        if (tareaRequestDTO.getFechaFinalizacion() == null)
            throw new DatosInvalidosException("No se proporcionó una fecha de finalización.");

        // Se valida el título. Debe contener entre 3 y 15 caracteres
        validarTitulo(tareaRequestDTO.getTitulo());

        // Se valida la descripción. Debe contener entre 3 y 50 caracteres
        validarDescripcion(tareaRequestDTO.getDescripcion());

        // Se valida la fecha de finalización. NO debe ser anterior a la fecha actual del servidor
        validarFechaFinalizacion(tareaRequestDTO.getFechaFinalizacion());
    }

    private void validarTitulo(String titulo){
        if (titulo.length() < 3 || titulo.length() > 15){
            throw new DatosInvalidosException("El título debe contener entre 3 y 15 caracteres.");
        }
    }

    private void validarDescripcion(String descripcion){
        if (descripcion.length() < 3 || descripcion.length() > 50){
            throw new DatosInvalidosException("La deescripción debe contener entre 3 y 50 caracteres.");
        }
    }

    private void validarFechaFinalizacion(LocalDate fechaFinalizacion){
        if (fechaFinalizacion.isBefore(LocalDate.now())){
            throw new DatosInvalidosException("La fecha de finalización es anterior a la fecha del servidor.");
        }
    }

}
