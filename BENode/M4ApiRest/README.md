# Laboratorio Módulo 4 - API REST

Backend de un portal de reservas de casas sobre el set de datos `airbnb`
(colección `listingsAndReviews`).

Estructura basada en el boilerplate del bootcamp
(`05-mongo-mongoose/05-boilerplate`): `core`, `common`, `dals` (repositorio
mock + MongoDB) y `pods` (api-model <-> mapper <-> model).

> Rama `feature/mongoose`: el repositorio MongoDB está implementado con
> [Mongoose](https://mongoosejs.com/) (schemas en `src/dals/*/*.context.ts`) en
> lugar del driver nativo. El resto (endpoints, mappers, tests) es igual que en
> `feature/opcional`.

## Arrancar

```bash
npm install
npm start
```

`npm start` crea el `.env` a partir de `.env.example` si no existe, levanta el
contenedor `airbnb-db` (mongo:7) con `docker compose` y arranca la API en el
puerto `3000`.

- `IS_API_MOCK=true` → usa los datos mock (`src/dals/mock-data.ts`, casas
  reales extraídas del backup).
- `IS_API_MOCK=false` → usa MongoDB (`MONGODB_URL`).

## Restaurar el backup

1. Clonar https://github.com/Lemoncode/mongodb-sample-dbs-backup
2. Ejecutar los console runners:

   ```bash
   npm run start:console-runners
   ```

3. Elegir `seed-data` e indicar:
   - Seed data path: ruta a la carpeta `airbnb` del repositorio clonado.
   - Docker container name: `airbnb-db`
   - Database name: `airbnb`

> Si ya habías restaurado antes, revisa que en `/opt/app` del contenedor no haya
> contenido de backups previos (`docker exec airbnb-db rm -rf /opt/app`).

4. Elegir `seed-users` para crear los usuarios (contraseña hasheada) en la
   colección `users`:
   - `admin@email.com` / `test` (rol `admin`)
   - `user@email.com` / `test` (rol `standard-user`)

## Endpoints

### Listado de casas

```
GET /api/houses?country=Spain&page=1&pageSize=10
```

- `country`: filtra por `address.country`. Si no se indica, devuelve todas.
- `page` y `pageSize`: paginación. Si no se indican, devuelve todas.

```json
[
  {
    "id": "65097600a74000a4a4a22696",
    "title": "Nice room in Barcelona Center",
    "image": "https://a0.muscache.com/im/pictures/...jpg?aki_policy=large",
    "price": 50
  }
]
```

### Detalle de una casa

```
GET /api/houses/:id
```

Devuelve título, imagen, descripción, dirección, número de habitaciones, camas,
baños y las últimas 5 reseñas (de la más reciente a la más antigua).
`404` si no existe.

```json
{
  "id": "65097600a74000a4a4a22686",
  "title": "Ribeira Charming Duplex",
  "image": "https://a0.muscache.com/im/pictures/...jpg?aki_policy=large",
  "description": "Fantastic duplex apartment with three bedrooms...",
  "address": "Porto, Porto, Portugal",
  "bedrooms": 3,
  "beds": 5,
  "bathrooms": 1,
  "reviews": [
    {
      "name": "Milo",
      "comment": "...",
      "date": "2019-01-20T05:00:00.000Z"
    }
  ]
}
```

### Añadir una review

```
POST /api/houses/:id/reviews
Content-Type: application/json

{
  "name": "German",
  "comment": "Muy buena casa"
}
```

La fecha se calcula en backend. Respuestas: `201` con la review creada, `400` si
falta `name` o `comment`, `404` si la casa no existe.

## Opcional (rama `feature/opcional`)

### Login

```
POST /api/security/login
Content-Type: application/json

{
  "email": "admin@email.com",
  "password": "test"
}
```

`204` y deja la cookie `authorization` (JWT, `httpOnly`) o `401` si las
credenciales no son válidas.

```
POST /api/security/logout
```

Borra la cookie `authorization`.

### Actualizar el detalle de una casa (solo admin)

```
PUT /api/houses/:id
Cookie: authorization=Bearer ...
Content-Type: application/json

{
  "title": "Ribeira Charming Duplex",
  "image": "https://a0.muscache.com/im/pictures/...jpg?aki_policy=large",
  "description": "Fantastic duplex apartment...",
  "address": "Porto, Porto, Portugal",
  "bedrooms": 3,
  "beds": 5,
  "bathrooms": 1
}
```

Actualiza solo los campos del detalle (título, imagen, descripción, dirección,
habitaciones, camas y baños). Respuestas: `204` actualizada, `401` sin sesión,
`403` si el usuario no es `admin`, `404` si la casa no existe.

## Tests

```bash
npm test
```

- Unit tests de mappers (`src/pods/house/house.mappers.spec.ts`), helpers
  (`src/common/helpers/*.spec.ts`, `src/dals/house/house.helpers.spec.ts`) y
  middlewares de seguridad (`src/core/security/security.middlewares.spec.ts`).
- Tests de integración con `supertest` + `mongodb-memory-server`
  (`src/pods/house/house.api.spec.ts`, `src/pods/security/security.api.spec.ts`).
  La primera ejecución descarga el binario de MongoDB.
