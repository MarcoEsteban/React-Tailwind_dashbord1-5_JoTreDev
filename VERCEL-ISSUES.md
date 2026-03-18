# Vercel Deployment Issues

Documentación de errores y soluciones para el deploy en Vercel.

---

## Error #001: Versión de Node.js Inválida

**Fecha:** 2026-03-18  
**Estado:** ✅ Resuelto

### Descripción del Error

```
Error: Found invalid or discontinued Node.js Version: "18.x". 
Please set Node.js Version to 24.x in your Project Settings to use Node.js 24.
```

Vercel no reconoce la versión de Node.js configurada en el proyecto.

### Causa

El proyecto especificaba `"engines": { "node": "18.x" }` en package.json, pero Vercel no acepta esa sintaxis.

### Solución

Agregar configuración explícita en `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "nodeVersion": "20"
}
```

### Commits Relacionados

- `9c18d39` - fix: node version for vercel

---

## Error #002: (Pendiente)

**Fecha:** 2026-03-18  
**Estado:** 🔄 En proceso

### Descripción del Error

```
Cloning github.com/MarcoEsteban/React-Tailwind_dashbord1-5_JoTreDev 
(Branch: master, Commit: 7dda1d8)
Skipping build cache, deployment was triggered without cache.
Cloning completed: 253.000ms
[ERROR COMPLETO PENDIENTE]
```

### Causa

Pendiente de identificar.

### Solución

Pendiente.

---

## Configuración Actual de Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "nodeVersion": "20"
}
```

## Notas Importantes

- Vercel requiere Node.js 20.x o superior
- La versión 20.x es LTS y más estable
- Evitar usar `"18.x"` en package.json engines
