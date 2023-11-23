import axios from "axios";

/**
 * Si existe la variable de entorno VITE_BACKEND_URL, se usa como base de la URL.
 * De lo contrario, se usa la URL por defecto http://localhost:8080. Esto permite configurar la ruta
 * del backend sin tener que modificar el código de la aplicación. Por ejemplo, en el archivo
 * docker-compose.yml se puede configurar la ruta del backend.
 */
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

/**
 * cliente representa una instancia de axios con la configuración que se va a usar para hacer las
 * peticiones al servidor. En este caso, solo se configura la URL base.
 */
const cliente = axios.create({
    baseURL,
});

// Se exporta el cliente para poder usarlo en otros archivos.
export default cliente;
