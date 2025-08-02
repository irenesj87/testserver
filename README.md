# Servidor de Prueba para Excursiones

Este proyecto es un servidor backend simple construido con Node.js y Express. Proporciona una API REST para gestionar y consultar una lista de excursiones, incluyendo funcionalidades de autenticación de usuarios, búsqueda y filtrado.
 
## ✨ Características

*   **Gestión de Excursiones**: Obtiene una lista de excursiones.
*   **Búsqueda**: Busca excursiones por nombre.
*   **Filtrado Dinámico**: Filtra excursiones por área, dificultad y tiempo.
*   **Autenticación de Usuarios**: Endpoints para registro, login y validación de tokens.
*   **Datos en Memoria**: Utiliza arrays de JavaScript como base de datos en memoria para facilitar las pruebas.

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### ✅ Prerrequisitos

Necesitarás tener instalado Node.js en tu sistema. También se recomienda `nodemon` para el desarrollo, ya que reinicia el servidor automáticamente al detectar cambios en los archivos.

```bash
npm install -g nodemon
```

### ⚙️ Instalación

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

