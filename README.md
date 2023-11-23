
# Todo-App Full Stack con Springboot 3, React, MySQL, Docker-Compose, AWS y Kubernetes.

Este proyecto fue realizado como presentación para la **Academia Java + Springboot**, dictada por **Softtek** en conjunto con la **Universidad Siglo-XII**.

- [Descripción](#descripción)
- [Como usar el proyecto](#como-usar-el-proyecto)
    - [Dependencias](#dependencias)
    - [Instalación](#instalación)
      - [Usando Docker Compose](#usando-docker-compose)
      - [Usando Maven y npm directamente](#usando-maven-y-npm-directamente)
- [Arquitectura de la aplicación](#arquitectura-de-la-aplicación)
    - [Backend](#backend)
      - [Estructura N-Tier](#estructura-n-tier)
      - [Endpoints](#endpoints)
    - [Frontend](#frontend)
      - [Estructura de Carpetas](#estructura-de-carpetas)
      - [Patrones y Buenas Prácticas](#patrones-y-buenas-prácticas)
        
![Demo](https://github.com/nicomuros/actividad-m5-acsofttek/blob/main/capturas/funcionamiento.gif?raw=true)

## Descripción

Esta aplicación está construida usando SpringBoot 3, React (Vite), MySQL y proporciona las funcionalidades básicas necesarias para poder gestionar tareas:
* Los usuarios pueden **crear** nuevas tareas.
* Los usuarios pueden **leer** la lista completa de tareas.
* Los usuarios pueden marcar tareas como **terminadas**.
* Los usuarios pueden modificar el **título**, la **descripción** o la **fecha de finalización** de una tarea.
* Los usuarios pueden **eliminar** tareas.


## Como usar el proyecto

## Instalación
Para poder usar el proyecto, siga los siguientes pasos:
* Clonar el repositorio desde GitHub al sistema local. Puedes hacerlo utilizando Git y ejecutando el siguiente comando en tu terminal:

`git clone https://github.com/nicomuros/actividad-m5-acsofttek.git`

* Navegar al directorio de la aplicación:

`cd actividad-m5-acsofttek`

* Debido a la configuración de la aplicación, debe asegurarse que los puertos `3306` `8080` y  `5173` estén disponibles.

### Usando Kubernetes

Para poder ejecutar el proyecto es necesario tener instaladas y configuradas las siguientes dependencias:

* **[miniKube](https://minikube.sigs.k8s.io/docs/start/)**
* **[kubectl](https://kubernetes.io/es/docs/tasks/tools/install-kubectl/)**

1. Iniciar minikube con el siguiente comando: `minikube start`
2. Habilitar ingress en minikube para poder acceder a la aplicación desde el navegador: `minikube addons enable ingress`
3. Cargar los secrets a kubernate: `kubectl apply -f ./kubernetes/db-secrets.yaml`
4. Cargar el configMap a kubernate: `kubectl apply -f ./kubernetes/configMap.yaml`
5. Cargar el deployment y el servicio de la base de datos: `kubectl apply -f ./kubernetes/mysql.yaml`
6. Cargar el deployment y el servicio del backend: `kubectl apply -f ./kubernetes/backend.yaml`
7. Cargar el deployment y el servicio del frontend: `kubectl apply -f ./kubernetes/frontend.yaml`
8. Cargar el ingress: `kubectl apply -f ./kubernetes/ingress
9. Obtener la IP de minikube: `minikube ip`
10. Acceder a la aplicación desde el navegador con la IP obtenida en el paso anterior.

### Usando Docker Compose

El proyecto cuenta con un archivo `docker-compose.yml`, con el cual se podrá levantar el proyecto en un contenedor. Para ello es necesario tener instalado Docker y Docker Compose en el sistema.

* Ejecutar el siguiente comando, el cual iniciará y orquestará los contenedores definidos en el archivo `docker-compose.yml`:

`docker-compose up -d`

### Usando Maven y npm directamente

Para poder ejecutar el proyecto es necesario tener instaladas y configuradas las siguientes dependencias:
* **[Maven 3.9+](https://maven.apache.org/download.cgi)**
* **[JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)**
* **[MySQL 8.0.33](https://downloads.mysql.com/archives/installer/)**
* **[Git](https://git-scm.com/downloads)**
* **[Node 19](https://nodejs.org/en/download)**

* Es importante tener configuradas las variables de entorno `JAVA_HOME` y `MAVEN_HOME` para ejecutar correctamente el empaquetado y la iniciación de la aplicación.

* Iniciar MySQL y crear una base de datos llamada `softtek`. Asegurarse que esté escuchando el puerto **3306**. Las credenciales que posee de forma nativa la aplicación son `username: muros` `password: password`.

* Utilizar Maven para compilar y construir la aplicación. Esto compilará el proyecto y creará un archivo JAR ejecutable en la carpeta "target". Para ello, primero deberás desplazarte a la ruta `/backend`, y ejecutar el siguiente comando:

`mvn clean package`

* Ejecuta la aplicación JAR con el siguiente comando, reemplazando "nombre-del-archivo.jar" con el nombre real del archivo JAR generado:

`java -jar target/actividad-m5-1.0.jar`

* En el directorio del frontend (`./frontend`), ejecuta los siguientes comandos:

`npm install`
`npm run dev`

Asegúrate de tener Node.js y npm instalados en tu sistema. Este proceso instalará las dependencias y ejecutará la aplicación del lado del cliente. Además, recuerda que al seguir esta ruta, es esencial que la base de datos MySQL esté configurada y en ejecución para garantizar el funcionamiento adecuado de la aplicación.

## Arquitectura de la aplicación.

### Backend

#### Estructura N-Tier
La estructura N-Tier o el diseño en capas se dividen las funcionalidades de la aplicación en varias capas o niveles claramente definidos, cada una con un propósito específico.

* **Capa de Controlador (`/controlador`):** La capa de controlador se encarga de recibir los datos proporcionados por el cliente, llamar a los servicios correspondientes de la capa de servicio para realizar las operaciones necesarias y devolver las respuestas adecuadas al cliente.
* **Capa de Servicio (`/servicio`):** Coordina la interacción entre la capa de controlador y la capa de acceso a datos. Además, se encarga de realizar validaciones y de preparar los datos antes de ser enviados a la capa de acceso a datos.

* **Capa de Acceso a Datos (`/repositorio`):** La capa de acceso a datos incluye clases y componentes que se conectan a la base de datos, realizan consultas y operaciones CRUD (Crear, Leer, Actualizar, Eliminar).

* **Capa de Modelo (`/modelo`):** Esta capa es responsable de representar los datos y la estructura de la aplicación. Se subdivide en tres paquetes principales: `/dto`, que contiene objetos de transferencia de datos; `/entidades`, que almacena las entidades que representan los elementos fundamentales del dominio de la aplicación; y `/mapper`, donde se gestionan las conversiones entre los objetos DTO y las entidades del modelo.

* **Capa de Excepciones (`/excepciones`):** Aquí se encuentran las excepciones personalizadas de la aplicación. Heredan directamente de `RuntimeExcepcion`.

#### Endpoints
##### Crear tarea

_Request:_ `POST http://localhost:8080/api/tarea`
```json
{
	"titulo":  "Trabajo",
	"descripcion":  "Revisar los informes",
	"fechaFinalizacion":  "2024-11-05"
}
```
_Response:_ `STATUS 200 OK`
```json
{
	"id":  1,
	"titulo":  "Trabajo",
	"descripcion":  "Revisar los informes",
	"fechaFinalizacion":  "2024-11-05",
	"terminada":  false
}
```
##### Lista completa de tareas

_Request:_  `GET http://localhost:8080/api/tarea`

_Response:_ `STATUS 200 OK`
```json
[
	{
		"id":  1,
		"titulo":  "Trabajo",
		"descripcion":  "Revisar los informes",
		"fechaFinalizacion":  "2024-11-05",
		"terminada":  false
	}
]
```
##### Modificar tarea
El endpoint acepta modificaciones parciales de las tareas, es decir, se puede enviar una solicitud de modificación con cambios en todos los campos o por separado. Es necesario incluir el ID de la tarea a modificar en la URL de la solicitud:

_Request:_ `PUT http://localhost:8080/api/tarea/{id}`
```json
{
	"terminada":  "true"
}
```
_Response:_ `STATUS 200 OK`
```json
[
	{
		"id":  1,
		"titulo":  "Trabajo",
		"descripcion":  "Revisar los informes",
		"fechaFinalizacion":  "2024-11-05",
		"terminada":  true
	}
]
```
##### Eliminar tarea:
Cuando se envía una solicitud para dar de baja una tarea, la misma no se elimina de la base de datos, sino que cambia su estado `disponible` de `true` a `false`, es decir, se realiza un borrado lógico y no físico de los datos. Para eliminar la tarea, es necesario proveer el ID de la misma en la URL de la solicitud.

_Request:_ `DELETE http://localhost:8080/api/tarea/{id}`

_Response:_ `STATUS 200 OK`

### Frontend
El frontend de la aplicación está desarrollado utilizando React y Vite. A continuación, se proporciona una descripción detallada de la estructura y patrones utilizados en el lado del cliente:

#### Estructura de Carpetas

La estructura del proyecto frontend sigue una organización lógica para facilitar el mantenimiento y la escalabilidad del código.

-   **`src/components`:** Contiene componentes React reutilizables utilizados en diferentes partes de la aplicación. Por ejemplo, `TareasForm` se utiliza para el formulario de creación y edición de tareas.

-   **`src/pages`:** Cada página de la aplicación tiene su propia carpeta dentro de este directorio. Por ejemplo, `Tareas` maneja la lógica y la interfaz de usuario relacionada con la gestión de tareas.

-   **`src/services`:** Contiene servicios que se encargan de la comunicación con la API del backend. El archivo `tareas.js` proporciona funciones para realizar operaciones CRUD en las tareas.

-   **`src/context`:** Aquí se define el contexto que maneja el estado global de la aplicación.

-   **`src/App.jsx`:** El componente principal de la aplicación que define las rutas y las páginas principales.


#### Patrones y Buenas Prácticas

##### Hooks

Se utilizan hooks de estado, como `useState` y `useEffect`, para gestionar el estado local de los componentes y manejar efectos secundarios, como la carga de datos desde el backend. Además, se desarrolló un hook personalizado `useTareas` que facilita la interacción con el contexto.

##### React Router

La navegación entre páginas se gestiona utilizando React Router, que proporciona una interfaz de navegación declarativa basada en componentes.

##### React Context
La gestión del estado de las tareas se maneja de forma global mediante la creación de un contexto `TareasContext`. El proveedor del mismo se ubica en el archivo `main.jsx`

##### Estilos con Bootstrap y React-Bootstrap

Para el diseño y los estilos, se utiliza Bootstrap, un framework de estilos que permite el desarrollo rápido de componentes relacionados con la interfaz.

##### Solicitudes a la API RESTful mediante Axios
La comunicación con la API RESTful del backend se realiza de manera eficaz utilizando Axios. Esta biblioteca simplifica la realización de solicitudes HTTP
