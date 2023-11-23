/* eslint-disable react/prop-types */
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTareas } from '../context/Hooks';
import Swal from 'sweetalert2';

const TablaTareas = () => {

  const { tareas, updateTarea, getTareaById, deleteTarea, error } = useTareas();

  const handleModificarEstado = (id) => {
    const tarea = getTareaById(id);
    tarea.terminada = !tarea.terminada;
    updateTarea(id, tarea);
  }

  const handleEliminarTarea = (id) => {
    // Sweet alert para confirmar la eliminación de la tarea
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma la eliminación, se llama a la función deleteTarea
        deleteTarea(id);
        if (error){
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al eliminar la tarea: ' + error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        } else {
          Swal.fire({
            title: 'Tarea eliminada',
            text: 'La tarea se eliminó correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
      }
    });
  }
  return (
    <div className="table-responsive">
    <Table className='table-hover'>
      <thead>
        <tr>
          <th scope='col'>Título</th>
          <th scope='col'>Descripción</th>
          <th scope='col'>Estado</th>
          <th scope='col'>Finalización</th>
          <th scope='col'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tareas.map((tarea) => (
          <tr key={tarea.id}>
            <td> <span>{tarea.titulo}</span> </td>
            <td> <span>{tarea.descripcion}</span> </td>
            <td>
              {tarea.terminada === true ? (
                <h6> <span className='badge bg-success'>Terminada</span> </h6>
              ) : (
                <h6> <span className='badge bg-secondary'>Pendiente</span> </h6>
              )}
            </td>
            <td> <span>{tarea.fechaFinalizacion}</span> </td>
            <td>
              {tarea.terminada === true ? (
                <OverlayTrigger placement='top' overlay={ <Tooltip id='tooltip-terminada'> Marcar como pendiente </Tooltip> }>
                  <div className='d-inline-block me-2' style={{ cursor: 'pointer' }} onClick={() => handleModificarEstado(tarea.id)}>
                    <RxCross1 size={18} />
                  </div>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger placement='top' overlay={ <Tooltip id='tooltip-sin-terminar'> Marcar como terminada </Tooltip> }>
                  <div className='d-inline-block me-2' style={{ cursor: 'pointer' }} onClick={() => handleModificarEstado(tarea.id)}>
                    <MdDone size={18} />
                  </div>
                </OverlayTrigger>
              )}
              <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-editar'>Editar</Tooltip>} >
                <Link to={`/modificar/${tarea.id}`} className='d-inline-block me-2' style={{ cursor: 'pointer'}}>
                  <FaEdit size={18} />
                </Link>
              </OverlayTrigger>
              <OverlayTrigger placement='top' overlay={<Tooltip id='tooltip-eliminar'>Eliminar</Tooltip>} >
                <div className='d-inline-block' style={{ cursor: 'pointer', color: "red" }} onClick={() => handleEliminarTarea(tarea.id)}>
                  <FaTrash size={14} />
                </div>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default TablaTareas;
