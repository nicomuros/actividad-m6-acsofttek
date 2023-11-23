/* eslint-disable react/prop-types */

import { Button, Col, Row } from 'react-bootstrap';
import styles from './TareasForm.module.css';
import { useNavigate } from 'react-router-dom';

const TareasForm = ({ formik, titulo }) => {

  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className="container">
        <Row className='justify-content-center align-items-center'>
          <Col xs={5}>
            <h1 className={styles.title}>{titulo}</h1>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input
                  type="text"
                  className={`form-control ${styles.input}`}
                  id="titulo"
                  placeholder="Ingrese el título"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.titulo}
                />
                {(formik.touched.titulo && formik.errors.titulo) && (
                  <div className={`alert alert-danger ${styles.error}`}>
                    {formik.errors.titulo}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  className={`form-control ${styles.input}`}
                  id="descripcion"
                  placeholder="Ingrese la descripción"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.descripcion}
                />
                {(formik.touched.descripcion && formik.errors.descripcion) && (
                  <div className={`alert alert-danger ${styles.error}`}>
                    {formik.errors.descripcion}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="fechaFinalizacion">Fecha de finalización</label>
                <input
                  type="date"
                  className={`form-control ${styles.input}`}
                  id="fechaFinalizacion"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fechaFinalizacion}
                />
                {(formik.touched.fechaFinalizacion && formik.errors.fechaFinalizacion) && (
                  <div className={`alert alert-danger ${styles.error}`}>
                    {formik.errors.fechaFinalizacion}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <Button className={`btn btn-primary ${styles.button}`} onClick={() => navigate("/")}>
                  Volver
                </Button>
                <Button type="submit" className={`btn btn-success ${styles.button}`}>
                  {titulo}
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TareasForm;