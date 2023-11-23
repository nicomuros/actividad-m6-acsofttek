import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className='text-center'>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>Página no encontrada</p>
          <p className={styles.description}>
            Lo sentimos, la página que buscas no existe.
          </p>
          <Link to='/' className={`btn btn-primary ${styles.button}`}>
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;