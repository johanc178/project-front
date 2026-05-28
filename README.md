# Gestor de Tareas — Prueba Técnica

Descripción breve

Aplicación sencilla para gestionar tareas de un equipo: inicio de sesión simulado,
tablero con CRUD de tareas, filtrado por estado y persistencia en un mock API.

Requisitos

- Node.js 18+ y npm

Instalación y ejecución (local)

1. Instala dependencias:

```bash
npm install
```

2. Levanta la API mock (json-server):

```bash
npm run json:server
# API: http://localhost:4000
```

3. Inicia la aplicación (Vite):

```bash
npm run dev
# Abre la URL que indique Vite (por defecto http://localhost:5173)
```

Puntos a considerar

- Inicio de sesión simulado en `/login`. Los datos de la sesión se guardan en LocalStorage bajo la clave `sessionUser`.
- El tablero (`/tablero`) consume `http://localhost:4000/tasks` y soporta creación, edición, actualización de estado y eliminación.
- Antes de eliminar una tarea se solicita confirmación; al finalizar la acción se muestra una alerta de resultado.
- Filtrado en cliente por estado (Pendiente / En Progreso / Completada).
- La app está pensada para ser responsiva y fácil de modificar.

Flujo Git recomendado (GitFlow resumido)

- Rama principal: `main` (código listo para producción).
- Rama de integración: `develop`.
- Crear ramas de características desde `develop`: `feature/nombre-descriptivo`.
- Mensajes de commit claros y en español: `feat: añadir formulario de tareas`, `fix: corregir validación de login`.

Ejemplo rápido para crear la rama `develop` y una feature:

```bash
# crear y cambiar a develop (si no existe)
git checkout -b develop

# crear una rama de feature desde develop
git checkout -b feature/mi-cambio develop

# trabajar, commitear y subir
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/mi-cambio
```

Incluye en los commits mensajes descriptivos para facilitar la revisión.

