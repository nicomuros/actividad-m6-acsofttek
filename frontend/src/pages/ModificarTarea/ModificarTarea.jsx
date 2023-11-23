import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTareas } from '../../context/Hooks';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TareasForm from '../../components/TareasForm';

const ModificarTarea = () => {
  
  // Obtener la tarea a modificar, a partir del id que viene en la URL
  const { updateTarea, error, getTareaById } = useTareas();

  // Se usa el hook useNavigate para redirigir al usuario a la página de tareas
  const navigate = useNavigate();

  // Se obtiene el id de la tarea a modificar de la URL
  const { id } = useParams();

  // Se obtiene la tarea a modificar
  const tarea = getTareaById(id);

  // Se muestra un mensaje de error si ocurrió un error al modificar la tarea (por ejemplo, si el servidor está caído)
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [error]);
 
  // Se crea el formulario con formik y Yup
  const formik = useFormik({ 
    initialValues: { // Se inicializan los valores del formulario con los valores de la tarea a modificar
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      fechaFinalizacion: tarea.fechaFinalizacion,
    },
    validationSchema: Yup.object({ // Se definen las validaciones para cada campo del formulario
      titulo: Yup.string()
        .required('El título es requerido')
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(15, 'El título debe tener como máximo 15 caracteres'),
      descripcion: Yup.string() 
        .required('La descripción es requerida')
        .min(3, 'La descripción debe tener al menos 3 caracteres')
        .max(50, 'La descripción debe tener como máximo 50 caracteres'),
      fechaFinalizacion: Yup.string()
        .required('La fecha de finalización es requerida')
        .matches(
          /^\d{4}-\d{2}-\d{2}$/, // Expresión regular para validar el formato YYYY-MM-DD
          'La fecha de finalización debe tener el formato YYYY-MM-DD'
        ),
    }),
    onSubmit: (values) => { // Se modifica la tarea cuando el usuario haga submit
      const res = updateTarea(id, values); // Se modifica la tarea con los nuevos valores 
      if (res) { // Si la tarea se modificó correctamente, se muestra un mensaje de éxito
        Swal.fire({ 
          title: 'Tarea modificada',
          text: 'La tarea se modificó correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          navigate('/');
        });
      }
    },
  });

  return (
    <TareasForm formik={formik} titulo="Modificar tarea" />
  );
};

export default ModificarTarea;
