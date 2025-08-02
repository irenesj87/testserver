# Servidor de Prueba para Excursiones

Este proyecto es un servidor backend simple construido con Node.js y Express. Proporciona una API REST para gestionar y consultar una lista de excursiones, incluyendo funcionalidades de autenticación de usuarios, búsqueda y filtrado.
 
## ✨ Características

*   **Gestión de Excursiones**: Obtiene una lista de excursiones.
*   **Búsqueda**: Busca excursiones por nombre.
*   **Filtrado Dinámico**: Filtra excursiones por área, dificultad y tiempo.
*   **Autenticación de Usuarios**: Endpoints para registro, login y validación de tokens (aunque los archivos de registro y login no se proporcionaron, su existencia se infiere del resto del código).
*   **Datos en Memoria**: Utiliza arrays de JavaScript como base de datos en memoria para facilitar las pruebas.

## 🚀 Empezando

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

## 📚 API Endpoints

A continuación se detallan los endpoints disponibles en la API.

### Excursiones

#### `GET /excursions`

Devuelve una lista de excursiones. Puede ser filtrada por múltiples parámetros.

*   **Parámetros de Query:**
    *   `q` (string): Texto para buscar en el nombre de la excursión.
    *   `area` (string | string[]): Filtra por una o más áreas. Se puede pasar como `area=Este` o `area=Este,Centro` o `area=Este&area=Centro`.
    *   `difficulty` (string | string[]): Filtra por una o más dificultades.
    *   `time` (string | string[]): Filtra por uno o más tiempos.

*   **Ejemplo de Petición:**
    ```
    http://localhost:3001/excursions?q=Picos&difficulty=Alta
    ```

### Filtros

#### `GET /filters`

Devuelve una lista de valores únicos para un tipo de filtro específico, útil para construir los controles de filtrado en el frontend.

*   **Parámetros de Query:**
    *   `type` (string): El tipo de filtro a obtener. Valores posibles: `area`, `difficulty`, `time`. **(Requerido)**

*   **Ejemplo de Petición:**
    ```
    http://localhost:3001/filters?type=difficulty
    ```

### Token

#### `GET /token/:token`

Verifica si un token proporcionado es válido y, en caso afirmativo, devuelve los datos del usuario asociado (excluyendo la contraseña).

*   **Parámetros de URL:**
    *   `:token` (string): El token de autenticación a validar.

*   **Respuestas:**
    *   `200 OK`: Si el token es válido. El cuerpo de la respuesta contiene el objeto del usuario.
    *   `404 Not Found`: Si el token no es válido o no se encuentra.
