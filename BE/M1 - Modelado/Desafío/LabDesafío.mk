# MODELO USADO

Se ha usado el modelo relacional porque ofrece una forma clara, estructurada y lógica de organizar la información. Al representar los datos en tablas, se facilita la comprensión tanto para desarrolladores como para usuarios que necesitan consultar o manipular la información. Cada tabla refleja una entidad concreta del mundo real, lo que permite modelar los datos de manera intuitiva y precisa.

Una de las principales ventajas de este modelo es su capacidad para establecer relaciones entre diferentes conjuntos de datos a través del uso de claves primarias y foráneas. Esto permite evitar la redundancia y asegurar la integridad de los datos. Además, esta estructura facilita la normalización, un proceso que ayuda a optimizar la base de datos dividiéndola en tablas más pequeñas para reducir la duplicación y mejorar la coherencia.

Otro motivo importante para utilizar el modelo relacional es su compatibilidad con SQL (Structured Query Language), un lenguaje estándar ampliamente aceptado para consultar, insertar, actualizar y borrar datos. Gracias a SQL, los usuarios pueden realizar operaciones complejas de forma sencilla y eficiente, lo que lo convierte en una herramienta poderosa para el análisis y la gestión de grandes volúmenes de datos.

Además, el modelo relacional es altamente escalable y ha demostrado ser robusto en múltiples aplicaciones empresariales y sistemas de información. Su enfoque basado en reglas lógicas y relaciones bien definidas facilita el mantenimiento, la seguridad y la evolución de los sistemas a lo largo del tiempo. Todo esto lo convierte en una opción preferente.

# CONSIDERACIONES DEL EJERCICIO BÁSICO

A raíz de toda la información proporcionada por el ejercicio, los wireframes presentados y el sitemap, se han supuesto ciertas premisas para poder realizar un modelo coherente con toda la información que se necesitará solicitar a la base de datos cuando se proceda a realizar la aplicación.

Estas son:

- Un curso está compuesto por lecciones, pero una lección solo puede pertenecer a un curso. Relación uno a muchos.
- Los cursos pueden tener varias temáticas, y una temática puede estar en muchos cursos.
- Se ha considerado además añadir a los videos y artículos una temática, lo que genera una relación de uno a muchos.
- Para poder estructurar las temáticas de manera jerárquica, se ha optado por tener un `parentID` como clave foránea que es una misma ID de la tabla, lo que a través de una consulta SQL es posible sacar la ordenación.
- Las lecciones están formadas por uno o varios vídeos, y uno o varios artículos. Ambas relaciones de uno a muchos.
- Se ha considerado separar los autores de los cursos, de los creadores de lecciones. De esta manera se pueden crear cursos de varios autores, que incluirán lecciones propias o de otros autores. Esto genera una relación entre los cursos de muchos a muchos; y una relación, de uno a muchos entre lección y autor.
- Lo mismo para las lecciones: un autor puede crear una lección, pero no necesariamente tiene que ser el autor de los videos y artículos que contiene.
- Los autores tienen además los datos generales, redes sociales, para lo que se considera que un autor puede tener muchas redes sociales, y que una red social puede estar en muchos autores. Relación muchos a muchos.

# CONSIDERACIONES DESAFÍO

- Se ha añadido la propiedad `isPublic` para los videos y artículos, y así poder controlar cuáles son públicos o privados. Esto permitirá que los cursos tengan un porcentaje de contenido público dependiendo del contenido del mismo.
- Se ha incluido una tabla de tags, que está ligada a los cursos, videos y artículos, a través de relaciones de muchos a muchos con sus correspondientes tablas, así se puede buscar contenido en relación con estos tags.
- Se ha generado una tabla de tipos de subscripciones, para controlar si hubiese diferentes subscripciones. Estas se ligan a los usuarios a través de una tabla que contiene la fecha de inicio y fin de la subscripción y si está activa.
- Además, se ha generado una tabla que liga los usuarios a los cursos, por si estos los adquieren de manera individual. De esta manera, aunque el usuario sea suscriptor y se le acabe la subscripción, puede seguir disfrutando de los cursos adquiridos.
- Existe una tabla que liga los cursos que pertenecen a una subscripción concreta.
- Para controlar los vídeos visualizados de manera general o por curso, se ha generado otra tabla que liga los videos y usuarios que los han visualizado con una fecha de visualización.

Con todas estas consideraciones se han generado los dos modelos relacionales que se adjuntan, y que cubren todas las necesidades que requiere la aplicación que se ha propuesto.
