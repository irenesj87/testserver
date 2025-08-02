# Servidor de Prueba para Excursiones

Este proyecto es un servidor backend simple construido con Node.js y Express. Proporciona una API REST para gestionar y consultar una lista de excursiones, incluyendo funcionalidades de autenticación de usuarios, búsqueda y filtrado.

## Características

- **Gestión de Excursiones**: Obtiene una lista de excursiones.
- **Búsqueda**: Busca excursiones por nombre.
- **Filtrado Dinámico**: Filtra excursiones por área, dificultad y tiempo.
- **Autenticación de Usuarios**: Endpoints para registro, login y validación de tokens.
- **Datos en Memoria**: Utiliza arrays de JavaScript como base de datos en memoria para facilitar las pruebas.

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### Requisitos previos

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

### Instalación

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
