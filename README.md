# ⚙️ Servidor de prueba para "Excursiones Juntos" 

Este proyecto es un servidor backend simple construido con Node.js y Express. Proporciona una API REST para gestionar datos de excursiones y usuarios, incluyendo funcionalidades de autenticación, búsqueda y filtrado.

## ✨ Características Principales

-   **Gestión de Excursiones**: Obtiene una lista completa de excursiones.
-   **Búsqueda y Filtrado**: Permite buscar excursiones por nombre y aplicar filtros dinámicos por área, dificultad y tiempo.
-   **Autenticación de Usuarios**: Endpoints para registro, login y validación de tokens JWT.
-   **Gestión de Usuarios**: Permite a los usuarios unirse a excursiones y actualizar su perfil.
-   **Base de Datos en Memoria**: Utiliza arrays de JavaScript para simular una base de datos, ideal para desarrollo y pruebas sin configuración adicional.

## 🛠️ Tecnologías Utilizadas

-   **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
-   **Express**: Framework minimalista para construir la API REST.
-   **JSON Web Token (`jsonwebtoken`)**: Para la creación y validación de tokens de autenticación.
-   **CORS**: Middleware para habilitar el Cross-Origin Resource Sharing y permitir peticiones desde el frontend.

## 🚀 Puesta en Marcha

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local.

### ✅ Requisitos Previos
 
- **Node.js (v16 o superior):** Es el entorno de ejecución para JavaScript. `npm` (Node Package Manager) se instala automáticamente con Node.js.

  - **Recomendado:** Descarga el instalador "LTS" desde la página oficial de Node.js.

- **Git:** Es el sistema de control de versiones utilizado para clonar los repositorios.

  - **Recomendado:** Descárgalo desde la página oficial de Git.

- **Nodemon (Opcional pero recomendado):** Herramienta que reinicia el servidor automáticamente al detectar cambios en los archivos, agilizando el desarrollo.
  ```bash
  npm install -g nodemon
  ```

Una vez instalados, puedes verificar que todo está correcto abriendo una terminal y ejecutando los siguientes comandos. Deberían mostrarte sus respectivas versiones:

```bash
node -v
npm -v
git --version
nodemon -v
```

### Instalación y Ejecución

1.  Clona el repositorio o descarga el código fuente.
2.  Navega al directorio `testserver` en tu terminal.
3.  Instala las dependencias del proyecto.
    ```bash
    npm install
    ```
4.  Inicia el servidor.
    ```bash
    npm start
    ```

El servidor estará escuchando en `http://localhost:3001`.

## 🔌 Endpoints Principales

-   `POST /register`: Registra un nuevo usuario.
-   `POST /login`: Inicia sesión y retorna un token JWT.
-   `GET /token/verify`: Valida un token existente (ruta protegida).
-   `DELETE /logout`: Invalida la sesión del usuario (simulado).
-   `GET /excursiones`: Retorna todas las excursiones, con filtros opcionales (`area`, `dificultad`, `tiempo`).
-   `GET /excursiones/search?q={termino}`: Busca excursiones por nombre.
-   `POST /excursiones/:id/join`: Permite a un usuario unirse a una excursión (ruta protegida).
-   `PUT /user`: Actualiza la información del perfil de un usuario (ruta protegida).
