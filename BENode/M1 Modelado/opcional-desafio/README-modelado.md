# Modelado opcional y desafío - Portal eLearning

## Objetivo

Esta versión amplía la básica para cubrir:

- jerarquía de áreas/categorías;
- contenido público y privado;
- usuarios registrados y suscripciones;
- compra individual de cursos;
- tags para búsquedas rápidas;
- visualizaciones agregadas de vídeo y curso.

Mantiene la misma base funcional de la versión obligatoria, pero incorpora entidades y campos extra para soportar reglas de acceso y consultas de negocio adicionales.

## Base del modelo

Se conserva la estructura principal:

- `cursos` como agregado central;
- `lecciones` embebidas en `cursos`;
- `videos` y `articulos` como colecciones propias;
- `autores` como colección propia;
- `categorias` como colección propia.

La razón no cambia: curso, lección y vídeo son las páginas calientes del sistema.

Respecto a la básica se conservan además los campos heredados: `cursos.estado` y `videos.estado` siguen marcando el estado de publicación (`borrador`/`publicado`) usado por las consultas de "últimos publicados". La colección `autores` incorpora un array `redes` (enlaces a redes sociales/perfiles públicos del autor) que se muestra en la página de biografía; al vivir sólo en `autores` y tratarse de una página de bajo tráfico, no se duplica en `cursos` ni en `videos`.

## Cambios respecto a la versión básica

### 1. Jerarquía de categorías

La parte opcional pide pasar de un solo nivel a una estructura como:

- Front End -> React
- Front End -> React -> Testing
- Backend -> Node.js -> Express

Para eso, `categorias` añade:

- `padreId`
- `ancestros`
- `pathCategorias`
- `nivel`

Con esto se soporta un árbol de categorías y se deja preparado el modelo para navegación jerárquica, filtros y breadcrumbs.

### 2. Acceso público y privado

El enunciado indica que:

- un curso puede ser 100% público;
- un curso puede tener parte pública y parte sólo para suscriptores.

Por eso se ha añadido `nivelAcceso` en:

- `cursos`
- `lecciones`
- `videos`
- `articulos`

Así se puede modelar tanto un curso totalmente público como uno mixto, donde las primeras lecciones sean abiertas y el resto restringidas.

**Regla de precedencia.** Como `nivelAcceso` aparece en varios niveles (`curso` > `leccion`/`video`/`articulo`), se aplica el criterio **más restrictivo de arriba hacia abajo**: si el curso es privado, todo su contenido lo es; si el curso es mixto (o público), el acceso efectivo de cada vídeo/artículo lo determina el `nivelAcceso` de su lección, y el `nivelAcceso` del propio vídeo o artículo sólo puede **endurecer** (nunca relajar) el de la lección que lo contiene. De este modo el campo a nivel de lección es el punto de verdad operativo para la regla "parte inicial pública / resto para suscriptores", y los campos de vídeo/artículo cubren excepciones puntuales sin contradecir al contenedor.

### 3. Usuarios y suscripciones

Para soportar el acceso restringido se añaden:

- `usuarios` (`email`, `nombre`, `estado`, `fechaAlta`); el campo `estado` distingue cuentas activas/bloqueadas a la hora de validar el acceso.
- `suscripciones` (`usuarioId`, `plan`, `estado`, `fechaInicio`, `fechaFin`).

`suscripciones` guarda la relación 1:N entre usuario y suscripciones/renovaciones. El campo `plan` identifica la tarifa contratada (lo que permite distinguir niveles de suscripción a futuro), `estado` indica si la suscripción está vigente y `fechaInicio`/`fechaFin` acotan su validez. La comprobación "¿es suscriptor activo?" se resuelve consultando `suscripciones` por `usuarioId` con `estado` vigente y `fechaFin` futura.

### 4. Compra individual de cursos

El desafío añade el caso:

- usuarios suscriptores;
- usuarios que compran cursos concretos.

Para eso se crea `comprasCursos`, donde se registra:

- `usuarioId`
- `cursoId`
- `fechaCompra`
- `importe`
- `moneda`
- `estado`

Este enfoque deja separado el derecho por suscripción del derecho por compra puntual.

### 5. Tags para búsquedas rápidas

Se añaden `tags` en:

- `cursos`
- `videos`
- `articulos`

Así se puede soportar nube de tags o filtros rápidos sin forzar a derivarlo sólo de categorías.

### 6. Visualizaciones agregadas

El enunciado pide mostrar:

- cuántas visualizaciones ha tenido un vídeo;
- cuántas visualizaciones han tenido todos los vídeos de un curso;
- sin exigir tiempo real exacto.

Por eso:

- `videos` tiene `totalVisualizaciones`;
- `cursos` tiene `totalVisualizaciones`;
- se añade la colección `visualizacionesVideo` para almacenar/agrupar datos de conteo.

Esto deja preparado un proceso batch o incremental que recalcule los totales sin tener que contar en cada lectura.

## Patrones aplicados

### Extended Reference Pattern

Se duplica información estable y útil en lectura:

- autor resumido dentro de `videos`;
- autores resumidos dentro de `cursos`;
- categorías resumidas dentro de `videos`;
- áreas derivadas resumidas dentro de `cursos`;
- artículos resumidos dentro de `lecciones`.

Esto mejora la velocidad de carga de pantallas principales.

### Subset Pattern

Se mantiene en `categorias.ultimos5VideosPublicados` un subconjunto embebido de los últimos vídeos publicados por categoría.

Esto responde directamente al workload fuerte de la home.

### Tree Pattern

Se aplica en `categorias` mediante una estrategia mixta, donde **cada codificación cubre una consulta distinta**:

- `padreId` (*Parent References*): permite insertar/mover una categoría y obtener su padre inmediato en O(1); es la fuente de verdad de la estructura.
- `pathCategorias` (*Materialized Path*, p. ej. `frontend/react/testing`): resuelve en una sola lectura los **breadcrumbs** y las consultas "todas las descendientes de X" mediante un prefijo de cadena indexado, sin recursión. Es también lo que se duplica en `cursos.areasDerivadas.pathCategorias` para pintar la ruta del área sin volver a `categorias`.
- `ancestros` (*Array of Ancestors*): habilita la consulta inversa "dame todas las categorías que son ancestro de X" y el filtrado por cualquier nivel superior con un índice multikey, algo que el path como cadena no resuelve cómodamente.
- `nivel`: profundidad cacheada para ordenar/filtrar por nivel sin parsear el path.

El árbol es pequeño y muy estable (4 raíces, ~3 niveles, y los autores/categorías se crean como mucho una vez al día), por lo que el coste de mantener varias representaciones redundantes al re-parentar una categoría es asumible y se paga una sola vez. Si se quisiera una versión mínima, bastarían `padreId` + `pathCategorias`; `ancestros` y `nivel` son optimizaciones de lectura conscientes.

### Computed Pattern

Se aplica en:

- `videos.totalVisualizaciones`
- `cursos.totalVisualizaciones`

No hace falta exactitud en tiempo real, así que el contador puede recalcularse por proceso batch o por agregación periódica.

## Recursos externos

Se mantiene la misma decisión que en la básica:

- `descripcionCmsId` para contenido textual del curso;
- `cmsResourceId` para contenido del artículo;
- `videoStorageId` o `videoUrl` para el recurso audiovisual.

MongoDB guarda referencias y metadatos, no el contenido pesado.

## Qué consultas y reglas soporta esta versión

1. Últimos cursos publicados.
2. Cursos por área simple o jerárquica.
3. Home por categoría con últimos 5 vídeos publicados.
4. Curso con autores, lecciones y artículos.
5. Vídeo con autor y categorías.
6. Acceso abierto o restringido por curso/lección/vídeo/artículo.
7. Verificación de usuario suscriptor.
8. Verificación de compra de un curso concreto.
9. Búsquedas rápidas por tags.
10. Mostrar visualizaciones agregadas de vídeo y curso.

## Resumen final

La versión opcional/desafío prioriza la lectura, pero añade capacidades de negocio más avanzadas:

- jerarquía de categorías;
- control flexible de acceso;
- dos formas de monetización;
- tags;
- métricas agregadas.

El modelo sigue siendo híbrido y documental: embebe donde la lectura principal lo necesita, referencia donde la entidad tiene vida propia y duplica sólo la información pequeña y estable que compensa en rendimiento.
