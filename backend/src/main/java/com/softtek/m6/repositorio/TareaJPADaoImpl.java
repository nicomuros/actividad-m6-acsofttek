package com.softtek.m6.repositorio;

import com.softtek.m6.modelos.entidades.Tarea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Implementación concreta de TareaDao, utiliza JPA para gestionar las transacciones con la base de datos.
 */
@Repository
public class TareaJPADaoImpl implements TareaDao{


    private final TareaRepository tareaRepository;

    @Autowired
    public TareaJPADaoImpl(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    @Override
    public void crearTarea(Tarea tarea) {
        tareaRepository.save(tarea);
    }

    @Override
    public List<Tarea> obtenerTareas() {
        return tareaRepository.findAll();
    }

    @Override
    public Optional<Tarea> obtenerTareaPorId(Integer id){
        return tareaRepository.findById(id);
    }

    @Override
    public void actualizarTarea(Tarea tarea) {
        tareaRepository.save(tarea);
    }


}
