/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useTareas } from '../../context/Hooks.js';
import { Button, Col, Row } from 'react-bootstrap';
import TablaTareas from '../../components/TablaTareas.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Tareas.module.css';

const Tareas = () => {
  // Se obtienen las tareas y el error del contexto mediante el hook useTareas
  const { tareas, error, getTareas } = useTareas();

  // Se crea un estado para saber si se está cargando la información
  const [isLoading, setIsLoading] = useState(true);

  // Se usa el hook useEffect para obtener las tareas cuando el componente se monte
  useEffect(() => {
    if (isLoading) {
      // Si isLoading es true, se obtienen las tareas
      getTareas().then(() => {
        // Cuando se resuelva la promesa, se cambia el estado de isLoading
        setIsLoading(false); // a false para que no vuelva a entrar a este if
      });
    }
  }, [getTareas, isLoading]);

  // Si alguna solicitud falla, se actualiza el estado de "error" en el contexto. Entonces
  // se muestra un mensaje de error con el error que se obtuvo (useEffect se ejecuta cada vez que
  // el estado de error cambie)
  useEffect(() => {
    if (error) {
      Swal.fire({
        // Se muestra un mensaje de error usando la librería SweetAlert2
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [error]);

  // Si la solicitud está en curso, se muestra un mensaje de carga
  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className={styles.main}>
      <div className={`container ${styles.container}`}>
        <Row className='justify-content-center align-items-center'>
          <Col xs={12} lg={10} xl={8} className={styles.box}>
            <div className={styles.header}>
              <h1 className={styles.title}>Lista de Tareas</h1>
              <Link to='/crear'>
                <Button variant='primary'>Crear Tarea</Button>
              </Link>
            </div>
            {tareas && tareas.length > 0 ? (
              <TablaTareas tareas={tareas} />
            ) : (
              <p>Aún no se han agregado tareas</p>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Tareas;
