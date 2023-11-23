import { useFormik } from "formik"
import * as Yup from "yup"
import { useTareas } from "../../context/Hooks";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TareasForm from "../../components/TareasForm";


const NuevaTarea = () => {

  // Se obtiene la función para crear una tarea y el error del contexto mediante el hook useTareas
  const { createTarea, error } = useTareas();

  // Se usa el hook useNavigate para redireccionar al usuario a la lista de tareas cuando se cree una tarea
  const navigate = useNavigate();

  // Se usa el hook useEffect para mostrar un mensaje de error cuando la solicitud falle
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [error]);

  // Se crea el formulario usando formik y Yup
  const formik = useFormik({
    initialValues: { // Se inicializan los valores del formulario
      titulo: "",
      descripcion: "",
      fechaFinalizacion: "",
    },
    validationSchema: Yup.object({ // Se crea el esquema de validación con Yup
      titulo: Yup.string()
        .required("El título es requerido")
        .min(3, "El título debe tener al menos 2 caracteres")
        .max(15, "El título debe tener como máximo 15 caracteres"),
      descripcion: Yup.string()
        .required("La descripción es requerida")
        .min(3, "La descripción debe tener al menos 3 caracteres")
        .max(50, "La descripción debe tener como máximo 50 caracteres"),
      fechaFinalizacion: Yup.string()
        .required("La fecha de finalización es requerida")
        .matches(
          /^\d{4}-\d{2}-\d{2}$/, // Expresión regular para validar el formato YYYY-MM-DD
          "La fecha de finalización debe tener el formato YYYY-MM-DD"
        ),

    }), 
    onSubmit: (values) => { // Se crea la tarea cuando el usuario haga submit
      const res = createTarea(values) // Se crea la tarea
        if (res){ // Si la tarea se creó correctamente, se muestra un mensaje de éxito
          Swal.fire({
            title: "Tarea creada",
            text: "La tarea se creó correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
        }).then(() => { // Cuando el usuario haga click en el botón de aceptar, se redirecciona a la lista de tareas
          navigate("/");
        }
        );
      }
    },
  })


  return (
    <TareasForm formik={formik} titulo="Nueva tarea" />
  )
}

export default NuevaTarea