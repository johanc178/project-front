Guía rápida de Git (sugerida)

1. Ramas principales

- `main`: código listo para producción.
- `develop`: rama de integración de características.

2. Flujo recomendado

```bash
# crear y cambiar a develop (si no existe)
git checkout -b develop

# crear una rama de feature desde develop
git checkout -b feature/login-improvements develop

# trabajar, luego commitear cambios
git add .
git commit -m "feat: mejorar formulario de login"

# subir la rama
git push -u origin feature/login-improvements

# abrir PR hacia develop, revisar y mergear
```

3. Convenciones de commit (ejemplos en español)

- `feat: agregar validación de formulario`
- `fix: corregir eliminación de tareas`
- `chore: actualizar dependencias`
- `docs: actualizar README con instrucciones de ejecución`

Consejo: escribe mensajes claros y en presente, por ejemplo `feat: añadir formulario de tarea`.
