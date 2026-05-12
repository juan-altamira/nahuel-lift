# Dashboard de visitas

La ruta `/visitas` muestra un resumen grande y minimalista de visitas, visitantes, sesiones y ubicaciones.

## Variables

- `BLOB_READ_WRITE_TOKEN`: token del store de Vercel Blob donde se guarda el resumen agregado.
- `VERCEL_DRAIN_SECRET`: secreto de firma configurado en el Web Analytics Drain.
- `ANALYTICS_DASHBOARD_TOKEN`: clave opcional para proteger la lectura del endpoint.

## Vercel

1. Activar Vercel Web Analytics para el proyecto.
2. Crear un Vercel Blob store y exponer `BLOB_READ_WRITE_TOKEN` en Production.
3. Crear un Web Analytics Drain que apunte a:

```txt
https://tu-dominio.com/api/analytics/summary.json
```

4. Configurar el mismo signing secret del drain como `VERCEL_DRAIN_SECRET`.
5. Abrir el tablero en una ventana aparte:

```txt
https://tu-dominio.com/visitas
```

Si `ANALYTICS_DASHBOARD_TOKEN` está configurado, usar:

```txt
https://tu-dominio.com/visitas?key=tu-clave
```
