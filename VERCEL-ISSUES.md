# Vercel Deployment Issues

## Errores y Soluciones

| # | Fecha | Error | Solución | Estado |
|---|-------|-------|----------|--------|
| 1 | 2026-03-18 | Node.js "18.x" inválido | Agregar `"nodeVersion": "20"` en vercel.json | ✅ Resuelto |

## Configuración Actual

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "nodeVersion": "20"
}
```

## Notas

- Vercel requiere Node.js 20.x o superior
- Usar 20.x es más estable que 24.x
