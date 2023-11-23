package com.softtek.m6.modelos.mapper;

import com.softtek.m6.modelos.dto.TareaRequestDTO;
import com.softtek.m6.modelos.dto.TareaResponseDTO;
import com.softtek.m6.modelos.entidades.Tarea;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Clase TareaMapper: Utilizada para convertir entre objetos Tarea, TareaRequestDTO y TareaResponseDTO.
 */
@Component // Se etiqueta como componente para que entre al pool de beans de Spring
public class TareaMapper {

    /**
     * Convierte un objeto TareaRequestDTO en un objeto Tarea.
     * @param requestDTO El objeto TareaRequestDTO a convertir.
     * @return El objeto Tarea resultante.
     */
    public Tarea DtoATarea(TareaRequestDTO requestDTO){
        Tarea tarea = new Tarea();

        tarea.setTitulo(requestDTO.getTitulo());
        tarea.setDescripcion(requestDTO.getDescripcion());
        tarea.setFechaFinalizacion(requestDTO.getFechaFinalizacion());
        tarea.setTerminada(requestDTO.getTerminada());

        return tarea;
    }

    /**
     * Convierte un objeto Tarea en un objeto TareaResponseDTO.
     * @param tarea El objeto Tarea a convertir.
     * @return El objeto TareaResponseDTO resultante.
     */
    public TareaResponseDTO tareaADto(Tarea tarea){
        TareaResponseDTO tareaResponseDTO = new TareaResponseDTO();
        tareaResponseDTO.setId(tarea.getId());
        tareaResponseDTO.setTitulo(tarea.getTitulo());
        tareaResponseDTO.setDescripcion(tarea.getDescripcion());
        tareaResponseDTO.setFechaFinalizacion(tarea.getFechaFinalizacion());
        tareaResponseDTO.setTerminada(tarea.getTerminada());

        return tareaResponseDTO;
    }

    /**
     * Convierte una lista de objetos Tarea en una lista de objetos TareaResponseDTO.
     * @param listaDeTareas La lista de objetos Tarea a convertir.
     * @return La lista de objetos TareaResponseDTO resultante.
     */
    public List<TareaResponseDTO> listaTareaAListaDto(List<Tarea> listaDeTareas){
        List<TareaResponseDTO> listaDTO;

        listaDTO = listaDeTareas
                .stream()
                .map(this::tareaADto)
                .toList();

        return listaDTO;
    }
}
