# Funcionamiento De Rappi

### ¿Que es Rappi?

Rappi es una empresa que facilita a las personas el adquirir un producto o servicio.

### Servicios que maneja Rappi:

### Mercado:

Este servicio ayuda en la conveniencia y ahorro en tiempo y dinero, ya que en rappi se puede realizar un mercado completo.

### Restaurantes:

La idea es que a través de este servicio se pueda pedir a todos los restaurantes de la zona en la que se encuentra una persona.

### Rappicash:

En cuanto a nuestro servicio de Rappicash, buscamos llevarte el efectivo que necesites a donde	quieras.

### Farmacia y Bienestar:

En cuanto al servicio de Farmacia, la idea es que te compremos los medicamentos que necesites.

# Funcionamiento De Una Aplicación Para Delivery

### **1. Registro y creación de perfiles:**

Los usuarios entran en contacto con la app a través de la página deregistro. Esta es la razón por la cual el registro debería serrápido y fácil, pidiendo únicamente los  detalles necesarios. La mayoría de las apps de reparto a domicilio utilizan email, contraseña y teléfono hacen uso de Google o Facebook SDK.

### **2. Busquedade servicios:**

losusuarios tienen acceso a un catálogo de restaurantes o servicios, con respecto a esto es bueno agregar una opción de búsqueda por navegación. Los clientes suelen buscar los sitios donde realizar un pedido mediante el nombre del establecimiento, localización o menú.

### **3. Pedidos:**

Losusuarios deberían ser capaces de agregar al carrito en dos clics, y de la misma manera poder editar sus pedidos o eliminarlos. Luego, poder acceder al resumen de la compra, dónde se incluyen detalles del pedido que debería ser confirmada por los usuarios antes de realizar un pago.

### **4. Pagos:**

Empieza ofreciendo 2 o 3 métodos de pago y cuando tu negocio crezca siempre podrás agregar más de ser necesarios. Si los usuarios han agregado detalles sobre sus métodos de pago previamente, permíteles elegir esta opción al momento de realizar el pago.

### 5. Seguimiento de pedidos:

La característica de  seguimiento ayuda a los usuarios a sabcomida Laer cuando sus pedidos van a llegar. El seguimiento de pedidos a través del repartidor es ejecutado con un Location API ofrecido por Google ( Android ) o CoreLocationFramework ( iOS ). Ambos ayudan a establecer la localización del repartidor que permitirá a la aplicación mostrar el tiempo de entrega aproximado.

### 6. Notificaciones:

Losclientes ocupados ( los cuales son tu cliente objetivo ) no tienen tiempo para hacer un seguimiento de sus pedidos. Por eso es necesario informarles sobre el estado de su pedido ( Realizada, En progreso, En camino, Entregada ). Puede hacerse a través de notificaciones push o por mensajes de texto y suele funcionar a la perfección. Solo asegúrate de enviar notificaciones importantes.

### 7. Valoración y reviews:

La mejor manera que tienen los usuarios para compartir sus experiencias espectaculares es  darla mayor puntuación en la escala de valoración o escribir una reseña. Haz que los usuarios se involucren ofreciéndoles la posibilidad de evaluar los servicios de delivery, el tiempo de espera y la comida La sección de reviews dejará que tú y los propietarios del restaurante puedan saber si hay algún problema con el personal o la calidad de la comida.

### 8. Historial de pedidos:

Una lista de los pedidos previos es otra funcionalidad que mejora la experiencia del usuario. Al poder acceder al historial de pedidos los clientes pueden encontrar fácilmente los nombres de los platos que más les han gustado y pueden pedirlos de nuevo.

# Opciones de posibles proyectos:

* **Gestión de Órdenes y Entregas:**

Crea rutas y controladores para que los usuarios puedan realizar pedidos, seleccionar productos, establecer direcciones de entrega y hacer seguimiento del estado de sus pedidos. Utiliza tokens para asegurarte de que solo los usuarios autenticados puedan realizar pedidos y acceder a la información de seguimiento.

* **Gestión de Usuarios y Autenticación:**

Utiliza tokens y middlewares para implementar la autenticación y autorización de usuarios. Puedes permitir a los usuarios registrarse, iniciar sesión y administrar sus perfiles. Esto también incluye la gestión de roles y permisos, lo que garantiza que solo los usuarios autorizados puedan acceder a ciertas funciones.

* **Gestión de Pagos:**

Extiende el ejemplo de la parte de pago para procesar transacciones seguras y confiables. Utiliza tokens y middlewares para autenticar y autorizar a los usuarios a realizar pagos. Almacenar los detalles de la transacción en MongoDB te permitirá llevar un registro de las transacciones realizadas.

* **Gestión de Productos y Menús:**

Crea una estructura para gestionar los productos disponibles en la plataforma, incluidos detalles como nombres, descripciones, precios y categorías. Los usuarios pueden navegar y seleccionar productos para agregar a sus pedidos.

* **Gestión de Impuestos y Facturación:**

Desarrolla una función que permita a los restaurantes y usuarios generar facturas y llevar un registro de los impuestos aplicados a las transacciones.

# **Bibliografías:**

### Link información de Rappi

[https://blog.rappi.com/que-es-rappi/](https://blog.rappi.com/que-es-rappi/)

### Link información de aplicacion para Delivery

[https://estudioalfa.com/por-que-deberias-tener-tu-propia-app-de-reparto-domicilio](https://estudioalfa.com/por-que-deberias-tener-tu-propia-app-de-reparto-domicilio)


## Investigación Github Ramas (branch)


##### **Git branch:**

La funcionalidad de las ramas de Git te permite crear nuevas ramas de un proyecto para probar ideas, aislar nuevas características, o experimentar sin impactar al proyecto principal.

##### **Ver Ramas:**

Para ver las ramas en un repositorio Git, ejecuta el comando:

```shell
git branch
```

Habrá un asterisco (*) junto a la rama en la que te encuentras actualmente.

##### **Cambiar de Rama**

Para moverse a una rama existente, ejecuta el comando:

```shell
git checkout NOMBRE-RAMA
```

Hay un atajo para crear y moverte a la nueva rama al mismo tiempo.:

```shell

git checkout -b NOMBRE-NUEVA-RAMA
```

##### **Renombrar una Rama**

Para renombrar una rama, ejecutar el comando:

```shell
git branch -m VIEJO-NOMBRE-RAMA NUEVO-NOMBRE-RAMA
```

##### **Eliminar una Rama**

Git no te permitirá eliminar una rama en la que te encuentres actualmente. Primero necesitas moverte a una rama diferente, y luego ejecutar el comando:

```shell
git branch -d RAMA-A-ELIMINAR
```

no se puede eliminar la rama donde se encuentra ubicado el asterisco 

##### **Comparar Ramas**

Puedes comparar ramas con el comando `git diff`:

```shell
git diff PRIMERA-RAMA..SEGUNDA-RAMA
```

Verás resultados en color para los cambios entre ramas. Para todas las líneas que han cambiado, la versión de `SEGUNDA-RAMA` será una línea verde comenzando con un "+", y la versión de `PRIMERA-RAMA` será una línea roja comenzando con un "-".

##### **Ayuda con Ramas de Git**

Si olvidas cómo utilizar una opción, o quieres explorar otra funcionalidad alrededor del comando `git branch`, puedes ejecutar cualquiera de estos comandos:

```shell
git help branch
git branch --help
man git-branch
```

##### Git Merge

El comando `git merge` fusionará cualquier cambio que se haya hecho en la base de código en una rama separada de tu rama actual como un nuevo commit.

La sintaxis del comando es la siguiente:

```shell
git merge NOMBRE-DE-LA-RAMA
```

##### Abandonar todos los cambios

```shell
git reset --hard        # remueve todos los cambios pendientes
```


## ¿Cómo realizar un release en github?

1. **Crear una versión del código:**
   * Asegúrate de que todos los cambios que deseas incluir en el lanzamiento estén confirmados y fusionados en la rama principal (por ejemplo, `main` o `master`).
   * Puedes realizar cambios menores, correcciones de errores o mejoras antes de crear un lanzamiento.
2. **Ir a la sección "Releases" del repositorio:**
   * Ve al repositorio en GitHub.
3. **Crear un nuevo lanzamiento:**
   * En la parte superior del repositorio, haz clic en la pestaña "Releases".
   * Luego, haz clic en el botón "Nuevo lanzamiento" o "Draft a new release".
4. **Llenar los detalles del lanzamiento:**
   * Asigna un "Tag version" (etiqueta de versión) a tu lanzamiento. Por lo general, las etiquetas de versión siguen un formato semántico como "v1.0.0". Esta etiqueta debe coincidir con la versión del código que estás lanzando.
   * Escribe un título descriptivo para el lanzamiento.
   * Puedes agregar una descripción más detallada del lanzamiento en el campo "Descripción".
5. **Adjuntar archivos o enlaces (opcional):**
   * Si deseas proporcionar archivos binarios, instaladores, documentación u otros archivos junto con el lanzamiento, puedes arrastrar y soltar los archivos en la sección "Arrastra y suelta archivos aquí para agregarlos al lanzamiento" o hacer clic en "subir archivos".
   * También puedes agregar enlaces a recursos externos relevantes para el lanzamiento.
6. **Publicar el lanzamiento:**
   * Una vez que hayas llenado los detalles y agregado los archivos o enlaces deseados, haz clic en el botón "Publicar lanzamiento" (o "Publish release").
   * Si no estás listo para publicar el lanzamiento de inmediato, puedes guardar un borrador del lanzamiento haciendo clic en "Guardar borrador" (o "Save draft").
7. **Notificar y compartir:**
   * Después de publicar el lanzamiento, puedes compartir el enlace del lanzamiento con otros miembros del equipo, usuarios o interesados para que puedan acceder a los archivos, la información y las notas del lanzamiento.

## Asignacion de tareas en Notion:

1. **Crear una Base de Datos:**

   * En tu página de Notion, crea una base de datos que se utilizará para hacer un seguimiento de las tareas asignadas. Para hacer esto, puedes hacer clic en "Agregar una página" y seleccionar "Base de datos".
   * Configura las propiedades de la base de datos según tus necesidades. Puedes incluir propiedades como "Nombre de la tarea", "Asignado a", "Fecha límite", "Estado".
2. **Agregar Entradas (Tareas):**

   * Agrega entradas a la base de datos para representar las tareas que deseas asignar. Rellena la información relevante en las propiedades que has configurado, como el nombre de la tarea, la persona asignada y la fecha límite.
3. **Asignar Tareas:**

   * En la propiedad "Asignado a", puedes usar el formato "@nombre-de-usuario" para mencionar a la persona a la que deseas asignar la tarea. Notion incluso te proporcionará sugerencias de nombres mientras escribes.
4. **Colaboración y Notificaciones:**

   * Cuando asignas una tarea a una persona utilizando la propiedad "Asignado a", Notion puede notificar automáticamente a esa persona si has compartido la página o la base de datos con ellos. También pueden recibir notificaciones por correo electrónico si tienen esta configuración habilitada.
5. **Realizar Seguimiento y Actualizar el Estado:**

   * A medida que se trabaja en una tarea, puedes actualizar el estado en la propiedad correspondiente. Por ejemplo, puedes tener propiedades como "En progreso", "Completada", "Pendiente", etc.
6. **Personalización Adicional:**

   * Puedes personalizar aún más tu base de datos añadiendo vistas como tablas, tableros, calendarios, galerías, etc., para tener diferentes formas de visualizar y gestionar las tareas asignadas.
7. **Recordatorios y Fechas Límite:**

   * Puedes configurar recordatorios y fechas límite en la propiedad "Fecha límite" para que tú y los asignados sean notificados antes de que se venza una tarea.
8. **Seguimiento y Filtrado:**

   * Utiliza funciones de búsqueda y filtrado en la base de datos para rastrear tareas asignadas, ver el estado, filtrar por persona asignada, etc.

   **Ejemplo:**

   ![1691814032173](image/README/1691814032173.png)

Bibliografia:

[https://www.freecodecamp.org/espanol/news/explicacion-de-la-rama-de-gi-como-eliminar/]()

[https://keepcoding.io/blog/que-es-la-rama-release-en-git/#:~:text=La%20rama%20release%20en%20Git%20se%20define%20como%20un%20tipo,determinada%20fecha%20de%20publicaci%C3%B3n%20estipulada.]()

[https://www.notion.so/help/tasks-and-dependencies]()
