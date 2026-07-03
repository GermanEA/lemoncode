# Laboratorio MongoDB — Airbnb Dataset

**Pregunta: ¿Qué posibles problemas potenciales ves en cómo está almacenada la información?**

```
- Los campos numéricos price, bathrooms, extra_people y guests_included están
  almacenados como Decimal128 en lugar de doubles estándar. Esto requiere conversión
  explícita con $toDouble en las agregaciones para calcular promedios, sumas, etc.

- Los campos minimum_nights y maximum_nights están almacenados como strings ("2",
  "1125") en lugar de números, lo que impide hacer comparaciones numéricas directas
  sobre ellos.

- Campos opcionales que no tienen valor se almacenan como string vacío ("") en lugar
  de null o simplemente no existir (neighborhood_overview, notes, transit...). Esto
  complica los filtros de "tiene valor / no tiene valor".

- El _id es un string en lugar de ObjectId, lo que es inusual en MongoDB y puede
  causar problemas de integración con otros sistemas o drivers que esperan ObjectId.

- Los amenities son un array de strings sin normalización: "Wifi", "WIFI" o "WiFi"
  podrían coexistir como valores distintos en distintos documentos, dificultando
  filtros exactos.

- Las reviews están embebidas en el documento del alojamiento. Si un alojamiento
  acumula muchas reviews, el documento puede crecer mucho y acercarse al límite de
  16 MB de MongoDB. Además, no se pueden paginar fácilmente sin agregaciones.

- Los datos del host están duplicados como subdocumento inline en cada alojamiento.
  Si un host tiene varios alojamientos (host_listings_count: 2), toda su información
  se repite en cada documento, generando posibles inconsistencias al actualizar.

- El subdocumento availability repite la misma métrica para 4 ventanas temporales
  (30/60/90/365 días) con campos independientes, cuando podría modelarse como array
  o calcularse dinámicamente.
```

---

## Obligatorio

### Consultas

**Cuántos alojamientos hay en España:**

```js
db.listingsAndReviews.countDocuments({
    "address.country": "Spain",
})
```

**Los 10 primeros alojamientos de España, ordenados por precio ascendente (nombre, precio, camas, localidad):**

```js
db.listingsAndReviews
    .find(
        { "address.country": "Spain" },
        {
            _id: 0,
            name: 1,
            price: 1,
            beds: 1,
            "address.market": 1,
        },
    )
    .sort({ price: 1 })
    .limit(10)
```

---

### Filtrando

**4 personas: 4 camas, 2 o más baños (nombre, precio, camas, baños):**

```js
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: { $gte: 2 },
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
    },
)
```

**Añadir requisito de Wifi (nombre, precio, camas, baños, amenities):**

```js
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: { $gte: 2 },
        amenities: { $all: ["Wifi"] },
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
        amenities: 1,
    },
)
```

**Añadir que se permitan mascotas (nombre, precio, camas, baños, amenities):**

```js
db.listingsAndReviews.find(
    {
        beds: 4,
        bathrooms: { $gte: 2 },
        amenities: { $all: ["Wifi", "Pets allowed"] },
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
        amenities: 1,
    },
)
```

**Barcelona o Portugal, precio máximo 50 $, rating >= 88 (nombre, precio, camas, baños, rating, localidad, país):**

```js
db.listingsAndReviews.find(
    {
        $or: [
            { "address.market": "Barcelona" },
            { "address.country": "Portugal" },
        ],
        price: { $lte: 50 },
        "review_scores.review_scores_rating": { $gte: 88 },
    },
    {
        _id: 0,
        name: 1,
        price: 1,
        beds: 1,
        bathrooms: 1,
        "review_scores.review_scores_rating": 1,
        "address.market": 1,
        "address.country": 1,
    },
)
```

**Añadir superhost y sin depósito de seguridad:**

```js
db.listingsAndReviews.aggregate([
    {
        $match: {
            $and: [
                {
                    $or: [
                        { "address.market": "Barcelona" },
                        { "address.country": "Portugal" },
                    ],
                },
                {
                    $or: [
                        { security_deposit: { $exists: false } },
                        { security_deposit: null },
                    ],
                },
            ],
            "review_scores.review_scores_rating": { $gte: 88 },
            "host.host_is_superhost": true,
        },
    },
    {
        $addFields: {
            security_deposit: { $ifNull: ["$security_deposit", null] },
        },
    },
    {
        $project: {
            _id: 0,
            name: 1,
            price: 1,
            beds: 1,
            bathrooms: 1,
            "review_scores.review_scores_rating": 1,
            "host.host_is_superhost": 1,
            security_deposit: 1,
            "address.market": 1,
            "address.country": 1,
        },
    },
])
```

### Agregaciones

**Alojamientos en España con nombre, localidad (solo string) y precio:**

```js
db.listingsAndReviews.aggregate([
    {
        $match: { "address.country": "Spain" },
    },
    {
        $project: {
            _id: 0,
            name: 1,
            localidad: "$address.market",
            price: 1,
        },
    },
])
```

**Cuántos alojamientos hay por país:**

```js
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            total: { $sum: 1 },
        },
    },
    {
        $sort: { total: -1 },
    },
])
```

---

## Opcional

**Precio medio de alquiler en España:**

```js
db.listingsAndReviews.aggregate([
    {
        $match: { "address.country": "Spain" },
    },
    {
        $group: {
            _id: null,
            precioMedio: { $avg: { $toDouble: "$price" } },
        },
    },
    {
        $project: {
            _id: 0,
            precioMedio: { $round: ["$precioMedio", 2] },
        },
    },
])
```

**Precio medio por países:**

```js
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: "$address.country",
            precioMedio: { $avg: { $toDouble: "$price" } },
        },
    },
    {
        $project: {
            _id: 0,
            pais: "$_id",
            precioMedio: { $round: ["$precioMedio", 2] },
        },
    },
    {
        $sort: { precioMedio: -1 },
    },
])
```

**Precio medio agrupado por país y número de habitaciones:**

```js
db.listingsAndReviews.aggregate([
    {
        $group: {
            _id: {
                pais: "$address.country",
                habitaciones: "$bedrooms",
            },
            precioMedio: { $avg: { $toDouble: "$price" } },
        },
    },
    {
        $project: {
            _id: 0,
            pais: "$_id.pais",
            habitaciones: "$_id.habitaciones",
            precioMedio: { $round: ["$precioMedio", 2] },
        },
    },
    {
        $sort: { pais: 1, habitaciones: 1 },
    },
])
```

---

## Desafío

**Top 5 alojamientos más caros en España (amenities como string):**

```js
db.listingsAndReviews.aggregate([
    {
        $match: { "address.country": "Spain" },
    },
    {
        $sort: { price: -1 },
    },
    {
        $limit: 5,
    },
    {
        $project: {
            _id: 0,
            name: 1,
            price: 1,
            bedrooms: 1,
            beds: 1,
            bathrooms: 1,
            ciudad: "$address.market",
            servicios: {
                $reduce: {
                    input: "$amenities",
                    initialValue: "",
                    in: {
                        $cond: [
                            { $eq: ["$$value", ""] },
                            "$$this",
                            { $concat: ["$$value", ", ", "$$this"] },
                        ],
                    },
                },
            },
        },
    },
])
```
