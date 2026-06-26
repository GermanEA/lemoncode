# Modelado básico - Portal eLearning

## Objetivo

Este modelo cubre la parte obligatoria del enunciado:

- mostrar los últimos cursos publicados;
- mostrar cursos por área;
- mostrar un curso con sus vídeos;
- mostrar en un vídeo su autor.

Además, se ha tenido en cuenta el workload descrito: mucha lectura en home, curso y vídeo; pocas escrituras diarias; y página de autor con tráfico bajo.

## Decisiones principales

### 1. `cursos` como agregado principal

La colección `cursos` es el centro funcional del modelo. Cada curso contiene:

- sus datos propios (`titulo`, `resumen`, `fechaPublicacion`, `estado`, `descripcionCmsId`, `portadaUrl`);
- un array embebido de `autores` con `_id` y `nombre`;
- un array embebido de `areasDerivadas`;
- un array embebido de `lecciones`.

Se ha elegido este enfoque porque la página de curso se consulta mucho y necesita cargar de una vez la estructura del curso.

### 1.1. Estado de publicación

Tanto `cursos` como `videos` incorporan un campo `estado` (p. ej. `borrador` / `publicado`) además de `fechaPublicacion`. Las consultas obligatorias "últimos cursos publicados" y "últimos 5 vídeos publicados por categoría" filtran por `estado = "publicado"` y ordenan por `fechaPublicacion` descendente. Se modela un flag explícito en lugar de depender de que `fechaPublicacion` sea nula, para no confundir un contenido programado/despublicado con uno nunca publicado.

### 2. `lecciones` embebidas dentro de `cursos`

Aunque el enunciado es ambiguo a propósito, el sitemap incluye la página de lección y tiene sentido modelar:

`curso -> lecciones -> vídeo + artículos`

La lección se ha modelado como subdocumento embebido, no como colección separada, porque:

- un curso tendrá entre 1 y 20 vídeos como máximo;
- el detalle de curso se consulta con frecuencia;
- las lecciones forman parte natural del agregado curso;
- evitar una colección adicional simplifica la lectura del curso.

Cada lección guarda:

- `orden`
- `slug`
- `titulo`
- `videoId`
- resumen de artículos asociados

## 3. `videos` como colección propia

Los vídeos se han separado en una colección propia porque:

- hay una consulta fuerte sobre la página de vídeo;
- la home necesita mostrar los últimos 5 vídeos publicados por categoría;
- los vídeos se clasifican por temáticas;
- cada vídeo tiene un autor propio;
- el vídeo no se comparte entre cursos, pero sigue teniendo entidad suficiente para ser consultado directamente.

Cada vídeo almacena:

- referencia al curso y a la lección;
- metadatos propios;
- `videoStorageId` y/o `videoUrl`;
- `descripcionCmsId`;
- autor embebido resumido (`_id`, `nombre`);
- categorías embebidas resumidas (`_id`, `nombre`, `slug`).

## 4. `articulos` como colección propia

El enunciado indica que el contenido de cada artículo vive en un headless CMS y que en MongoDB sólo se guarda su identificador (`cmsResourceId`). Modelarlos como colección propia es una **elección de diseño, no un requisito impuesto por el enunciado**: evita inflar el agregado `cursos`, permite que el catálogo de artículos crezca de forma independiente y deja preparada una posible reutilización futura. Como contrapartida, obliga a mantener sincronizado el resumen embebido en la lección con la colección `articulos`.

Cada artículo almacena:

- `cursoId`
- `leccionId`
- `titulo`
- `slug`
- `cmsResourceId`

En el curso sólo se embebe un resumen de los artículos por lección para facilitar la lectura del agregado principal.

## 5. `autores` como colección separada

La biografía del autor existe en página propia y el enunciado indica que esa página tendrá poco tráfico.

Por eso:

- `autores` vive como colección independiente con `bio` y `fotoUrl`;
- en `cursos` y `videos` sólo se duplica lo mínimo necesario (`_id` y `nombre`) para evitar cruces costosos al mostrar curso o vídeo.

## 6. `categorias` como colección separada

Las categorías se modelan aparte porque:

- se usan para clasificar vídeos;
- sirven para derivar las áreas de un curso;
- la home necesita pintar por categoría los últimos vídeos publicados.

## Patrones aplicados

### Extended Reference Pattern

Se aplica duplicando información estable y pequeña:

- autor resumido dentro de `videos`;
- autores resumidos dentro de `cursos`;
- categorías resumidas dentro de `videos`;
- áreas derivadas resumidas dentro de `cursos`;
- artículos resumidos dentro de `lecciones`.

Esto permite lecturas más rápidas sin depender constantemente de joins o lookups.

### Subset Pattern

Se aplica en `categorias.ultimos5VideosPublicados`.

La home necesita mostrar muy rápido los últimos 5 vídeos publicados por categoría. En vez de recalcular en cada lectura toda la lista desde `videos`, se mantiene en categoría un subconjunto pequeño con:

- `videoId`
- `titulo`
- `slug`
- `thumbnailUrl`
- `fechaPublicacion`

**Alternativa considerada: caché en el servidor web.** El propio enunciado sugiere que la home "podríamos delegar en el servidor web que cachease esta página". Esa opción evitaría mantener el subconjunto, a costa de servir datos potencialmente desactualizados hasta la invalidación de la caché. Se ha optado por el Subset Pattern porque el volumen de escritura es muy bajo (1-2 vídeos/día), de modo que el coste de actualizar el subconjunto de cada categoría al publicar un vídeo es despreciable y permite servir el dato siempre fresco desde la propia base de datos. Ambas técnicas son compatibles: la caché de servidor puede añadirse encima del subset si la carga de lectura lo exige.

### Embebido selectivo

Se embeben las `lecciones` dentro de `cursos` porque el tamaño es controlado y la lectura principal del dominio lo justifica.

## Recursos externos

El enunciado dice que el contenido pesado no va en MongoDB:

- la descripción extensa del curso está fuera, referenciada por `descripcionCmsId`;
- el contenido del artículo está fuera, referenciado por `cmsResourceId`;
- el vídeo real está fuera, referenciado por `videoStorageId` o `videoUrl`.

Esto evita inflar documentos y mantiene el working set más limpio.

## Qué consultas resuelve bien este modelo

1. Últimos cursos publicados: desde `cursos.fechaPublicacion`.
2. Cursos por área: desde `cursos.areasDerivadas`.
3. Curso con sus vídeos y artículos: desde `cursos` y sus `lecciones`. La lista ordenada de lecciones y el resumen de artículos sale del propio agregado; los metadatos completos del vídeo (thumbnail, duración) requieren una segunda consulta a `videos` filtrando por `cursoId`.
4. Vídeo con su autor: desde `videos.autor`.
5. Home con últimos 5 vídeos por categoría: desde `categorias.ultimos5VideosPublicados`.

## Resumen final

La versión básica prioriza la lectura rápida de las pantallas principales. Se ha elegido un modelo híbrido:

- agregados embebidos donde la consulta principal lo necesita (`cursos` con `lecciones`);
- colecciones separadas donde hay lectura directa o crecimiento independiente (`videos`, `articulos`, `autores`, `categorias`);
- duplicación controlada de datos estables para reducir joins.
