package com.softtek.m6.repositorio;

import com.softtek.m6.modelos.entidades.Tarea;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Configuración de interfaz que extiende de JpaRepository, provee  una implementación concreta con métodos ya creados
 * que permiten comunicarse con la base de datos facilmente.
 */
public interface TareaRepository extends JpaRepository<Tarea, Integer> {
}
