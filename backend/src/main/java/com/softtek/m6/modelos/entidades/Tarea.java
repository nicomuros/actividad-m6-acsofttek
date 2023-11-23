package com.softtek.m6.modelos.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity // Se marca como entidad para que JPA trabaje con ella
@Data // Getters, setters, hashcode, equals, toString
@AllArgsConstructor // Constructor de todos los argumentos
@NoArgsConstructor // Constructor sin argumentos
public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String titulo;
    private String descripcion;
    private LocalDate fechaCreacion; // Se almacena la fecha en la que la tarea fue creada
    private LocalDate fechaModificacion; // Se almacena la fecha de la última modificación
    private LocalDate fechaFinalizacion; // Se almacena la fecha en la que el usuario elije cuando termina la tarea
    private Boolean terminada = false; // true si la tarea se marcó como terminada
    private Boolean disponible = true; // true si la tarea no se marcó como eliminada
}
