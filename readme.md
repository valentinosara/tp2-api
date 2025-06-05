# Clase 9: Separación de Código en Capas y Rutas (Backend para Frontend)

**Objetivos:**

- Adaptar el patrón MVC para la organización del backend de una API RESTful consumida por frontends como React o Vue.
- Separar la lógica del backend en capas claras: rutas, controladores y servicios.
- Comprender cómo los "Modelos" representan los datos en el backend.
- Introducir los conceptos de Casos de Uso y Data Access Objects (DAOs) para una lógica de negocio y acceso a datos más organizada.
- Empezar a utilizar clases para estructurar el código del backend.
- Introducir los principios básicos de la inyección de dependencias para mejorar la modularidad y testabilidad.
- Implementar el manejo de errores básico utilizando bloques `try...catch` en las diferentes capas.

**Contenido:**

**1. Patrón MVC Adaptado para Backend **

- **MVC en el Contexto Backend de una API:** En el desarrollo de un backend para una aplicación web moderna (como las construidas con React o Vue.js), el patrón Modelo-Vista-Controlador (MVC) se adapta para organizar la lógica del servidor. Aquí, el frontend actúa como la capa de presentación (la "Vista"), mientras que nuestro backend se encarga del Modelo y el Controlador. Las **Rutas** son los puntos de entrada de nuestra API.
  - **Modelo:** Representa la estructura de los datos de nuestra aplicación y contiene la lógica de negocio central que opera sobre esos datos.
  - **Controlador:** Actúa como intermediario entre las **Rutas** y los **Servicios**, delegando la lógica de negocio y preparando la respuesta para el frontend.
  - **Servicios:** La capa de **Servicios** se sitúa estratégicamente entre la capa de **Controladores** y la capa de acceso a datos. Su función principal es **encapsular toda la lógica de negocio específica de nuestra aplicación**. Esto incluye la implementación de reglas de negocio, la orquestación de la capa de acceso a datos, la independencia del framework web, el manejo de la complejidad y la abstracción de la implementación de la persistencia.
  - **Rutas:** Definen los endpoints de nuestra API y dirigen las peticiones al Controlador adecuado.

**Roles Adaptados en el Backend:**

- **Modelo:** En el backend, el Modelo sigue representando la **estructura de los datos** de nuestra aplicación y la **lógica de negocio central** que opera sobre esos datos. Esto incluye:

  - **Definición de la estructura de los datos:** Cómo se organizan y relacionan las entidades.
  - **Lógica de negocio:** Las reglas y operaciones específicas de nuestro dominio (a menudo en la capa de **Servicios**).
  - **Interacción con la capa de persistencia:** Cómo se almacenan y recuperan los datos (a través de DAOs o Repositorios).

- **Controlador:** En el backend de una API RESTful, el Controlador actúa como un **intermediario entre las Rutas y la capa de Servicios**. Sus responsabilidades principales son:

  - **Recibir y procesar las peticiones HTTP.**
  - **Extraer y validar los datos de la petición.**
  - **Delegar la lógica de negocio a los Servicios.**
  - **Preparar y enviar la respuesta HTTP (generalmente en formato JSON).** **El Controlador no debe contener la lógica de negocio compleja en sí mismo.**

- **Servicios:** La capa de **Servicios** se sitúa estratégicamente entre la capa de **Controladores** y la capa de acceso a datos. Su función principal es **encapsular toda la lógica de negocio específica de nuestra aplicación**. Esto incluye la implementación de reglas de negocio, la orquestación de la capa de acceso a datos, la independencia del framework web, el manejo de la complejidad y la abstracción de la implementación de la persistencia.

- **Rutas:** En una API RESTful, las Rutas definen los **endpoints** (las URLs) y los **métodos HTTP** que el frontend puede utilizar para interactuar con el backend. Su principal función es **recibir la petición HTTP entrante y dirigirla al Controlador adecuado**.

**Flujo de Interacción Típico:**

1.  El frontend realiza una petición HTTP a una ruta del backend (ej., `GET /api/libros`).
2.  La Ruta dirige la petición a un método del Controlador (ej., `obtenerLibros`).
3.  El Controlador llama al Servicio para obtener los datos.
4.  El Servicio interactúa con la capa de datos.
5.  El Servicio puede aplicar lógica de negocio.
6.  El Servicio devuelve los datos al Controlador.
7.  El Controlador formatea la respuesta JSON y la envía al frontend.
8.  El frontend recibe la respuesta y actualiza su interfaz de usuario.

## 2. Organización del Proyecto con Clases e Inyección de Dependencias (25 minutos)

**Estructura de Directorios con Clases:**

Una estructura de directorios bien organizada es crucial para la mantenibilidad y escalabilidad de nuestro backend. Al utilizar clases para implementar nuestros Controladores y Servicios, una estructura común podría ser la siguiente:

```
mi-proyecto/
├── routes/
│   └── libros.routes.js
│   └── usuarios.routes.js
├── controllers/
│   └── libros.controller.js
│   └── usuarios.controller.js
├── services/
│   └── libros.service.js
│   └── usuarios.service.js
├── models/         (Opcional, para definir la estructura de los datos)
│   └── libro.model.js
│   └── usuario.model.js
├── data-access/    (Opcional, para la interacción con la base de datos - DAOs)
│   └── libro.dao.js
│   └── usuario.dao.js
├── app.js          (Archivo principal de la aplicación Express)
├── package.json
└── ...
```
# 3. Comprender cómo los "Modelos" representan los datos en el backend.

En el contexto de nuestro backend, la capa de "Modelos" tiene la responsabilidad de **representar la estructura y la naturaleza de los datos** con los que nuestra aplicación trabaja. Piensa en los Modelos como los planos o las definiciones de las entidades de nuestro dominio (por ejemplo, un libro, un usuario, un producto, un pedido).

**Roles y Funciones de los Modelos en el Backend:**

* **Definición de la Estructura de Datos:** Los Modelos especifican qué atributos o propiedades tiene cada entidad.
* **Tipado de Datos (Opcional pero Recomendado):** Pueden incluir información sobre el tipo de dato de cada atributo.
* **Validación de Datos a Nivel de Entidad (Opcional):** Pueden contener lógica de validación básica para asegurar la integridad de los datos.
* **Interacción con la Capa de Persistencia (En algunos enfoques):** Pueden estar vinculados a la forma en que los datos se almacenan.
* **Transferencia de Datos:** A menudo se utilizan como objetos de transferencia de datos (DTOs) entre capas.

**Ejemplo Conceptual (en JavaScript con Clases):**

```javascript
class Libro {
  constructor(id, titulo, autor, isbn, fechaPublicacion) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.fechaPublicacion = fechaPublicacion;
  }

  validarTitulo() {
    return this.titulo && this.titulo.trim() !== '';
  }
}

class Usuario {
  constructor(id, nombre, email, contrasena, fechaRegistro) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contrasena = contrasena;
    this.fechaRegistro = fechaRegistro;
  }

  esEmailValido() {
    return this.email && this.email.includes('@');
  }
}

module.exports = { Libro, Usuario };

````
# 4. Casos de Uso y Data Access Objects (DAOs) para una Lógica de Negocio y Acceso a Datos Organizada

A medida que nuestras aplicaciones backend crecen en complejidad, la lógica de negocio dentro de los Servicios puede volverse extensa y difícil de manejar. Además, la forma en que accedemos a los datos puede volverse repetitiva y acoplada a la implementación específica de la base de datos. Para abordar estos desafíos y lograr una mayor organización, modularidad y mantenibilidad, podemos introducir los conceptos de **Casos de Uso** y **Data Access Objects (DAOs)**.

## Casos de Uso (o Interactors): Encapsulando la Lógica de Negocio Compleja

* **Concepto:** Los Casos de Uso representan **interacciones específicas del usuario con el sistema** o **procesos de negocio significativos**. Cada Caso de Uso encapsula toda la lógica necesaria para llevar a cabo una tarea particular.

* **Función:**
    * **Organizar la lógica de negocio compleja.**
    * **Representar flujos de trabajo completos.**
    * **Ser independientes de la capa de presentación y la persistencia.**
    * **Facilitar la prueba.**

* **Ejemplo Conceptual:** En una aplicación de comercio electrónico, consideremos el Caso de Uso **"Realizar Pedido"**:

    Cuando un usuario decide finalizar su compra, este Caso de Uso se activa. Su lógica podría incluir los siguientes pasos:

    1.  **Validar el carrito de compras:** Verificar que todos los productos en el carrito estén disponibles y tengan suficiente stock. Esto podría implicar llamar a un `CarritoService` y un `ProductoService`.
    2.  **Calcular el total del pedido:** Aplicar descuentos, impuestos y gastos de envío. Esto podría involucrar un `CarritoService` y un `ShippingService`.
    3.  **Crear un nuevo registro de pedido en la base de datos:** Persistir la información del pedido (usuario, productos, total, dirección de envío, etc.). Esto implicaría interactuar con un `PedidoDAO`.
    4.  **Actualizar el inventario de los productos comprados:** Disminuir la cantidad disponible de cada producto. Esto requeriría interactuar con un `ProductoDAO`.
    5.  **Procesar el pago:** Integrarse con un servicio de pago externo para realizar el cargo a la tarjeta del usuario. Esto podría involucrar un `PaymentService`.
    6.  **Enviar una confirmación de pedido por correo electrónico:** Notificar al usuario que su pedido ha sido realizado con éxito. Esto podría implicar un `EmailService`.
    7.  **Generar un registro de actividad del pedido:** Guardar un historial de las acciones realizadas en el pedido para auditoría. Esto podría usar un `OrderActivityService` y un `OrderActivityDAO`.

    Como puedes ver, el Caso de Uso "Realizar Pedido" coordina la interacción de varios Servicios y DAOs para completar una funcionalidad de negocio compleja. El Controlador que recibe la petición para finalizar el pedido simplemente invocaría este Caso de Uso, delegando toda la lógica detallada a él.

## Data Access Objects (DAOs) / Repositorios: Abstraendo el Acceso a los Datos

* **Concepto:** Los DAOs son responsables de interactuar con la capa de persistencia de datos, abstrayendo los detalles de cómo se acceden y manipulan los datos.

* **Función:**
    * **Encapsular la lógica de acceso a datos (CRUD).**
    * **Ocultar los detalles de la implementación de la persistencia.**
    * **Centralizar la gestión de la persistencia.**
    * **Mejorar la testabilidad.**

* **Ejemplo Conceptual:** Para la entidad `Libro`, podríamos tener un `LibroDAO` con métodos como `findAll()`, `findById(id)`, `create(libroData)`, `update(id, libroData)`, y `delete(id)`.

## Cómo trabajan juntos para una mayor organización:

1.  El **Controlador** recibe una petición y la delega a un **Caso de Uso** específico (ej., `RealizarPedido`).
2.  El **Caso de Uso** contiene la lógica de negocio para esa interacción, que puede implicar la coordinación de varios **Servicios** (ej., `CarritoService`, `ProductoService`, `PaymentService`, `EmailService`).
3.  Los **Servicios** contienen la lógica de negocio más granular y, cuando necesitan acceder a los datos, interactúan con los **DAOs** (ej., `PedidoDAO`, `ProductoDAO`).
4.  Los **DAOs** son los responsables de la comunicación con la capa de persistencia (la base de datos, etc.).
5.  Los **Modelos** representan la estructura de los datos que fluyen a través de estas capas.

Esta separación de responsabilidades hace que el código sea más modular, fácil de entender, probar y mantener a medida que la aplicación crece en complejidad.

# 5. Empezar a utilizar clases para estructurar el código del backend.

En el desarrollo de backends, el uso de **clases** es fundamental para organizar y estructurar el código de manera más clara, modular y orientada a objetos.

**¿Por qué utilizar clases en el backend?**

* **Organización y Agrupación:** Agrupan datos (propiedades) y comportamiento (métodos) relacionados.
* **Abstracción:** Definen una interfaz pública sin exponer la implementación interna.
* **Encapsulamiento:** Controlan el acceso a propiedades y métodos (limitado en JavaScript).
* **Reusabilidad:** Permiten crear múltiples instancias con el mismo comportamiento.
* **Herencia (Opcional):** Permite crear nuevas clases basadas en existentes.
* **Polimorfismo:** Facilitan la implementación de diferentes comportamientos para el mismo método.
* **Mejor Legibilidad y Mantenibilidad:** Código más fácil de entender y modificar.

**Ejemplos de uso de clases en nuestro backend:**

* **Controladores:** Para manejar las peticiones de rutas específicas.
* **Servicios:** Para encapsular la lógica de negocio.
* **Casos de Uso:** Para representar interacciones o procesos de negocio.
* **DAOs:** Para la interacción con la capa de persistencia de datos.
* **Modelos:** Para representar la estructura de los datos.

**En resumen, utilizar clases ayuda a organizar el código de manera lógica, promueve la reutilización, facilita la abstracción y el encapsulamiento, y conduce a un código más legible, mantenible y escalable.**

# 6. Introducir los principios básicos de la inyección de dependencias para mejorar la modularidad y testabilidad.

La **Inyección de Dependencias (ID)** es un patrón de diseño en el que una clase (conocida como el cliente) recibe las dependencias (otros objetos con los que necesita interactuar) desde el exterior en lugar de crearlas ella misma. Esto se logra típicamente a través del constructor de la clase, los métodos setter o la inyección de interfaces.

**Principios Fundamentales de la Inyección de Dependencias:**

* **Depender de Abstracciones, No de Implementaciones Concretas:** Este es el principio clave. En lugar de que una clase dependa directamente de una implementación específica de otra clase, debería depender de una abstracción, como una interfaz o una clase abstracta. Esto hace que la clase sea más flexible y menos acoplada a una implementación particular.
* **Las Dependencias se Suministran Externamente:** La responsabilidad de crear y proveer las dependencias no recae en la clase cliente. En cambio, un "inyector" externo (que puede ser un framework de ID, un contenedor o simplemente código de inicialización) se encarga de suministrar las dependencias necesarias a la clase cliente.

**Beneficios de la Inyección de Dependencias en el Backend:**

* **Mejora la Modularidad:** Al no crear sus propias dependencias, las clases se vuelven más independientes y enfocadas en su propia lógica. Esto reduce el acoplamiento entre las clases, lo que significa que los cambios en una dependencia tienen menos probabilidades de afectar a las clases que la utilizan.
* **Aumenta la Testabilidad:** La ID facilita enormemente la realización de pruebas unitarias. Al recibir las dependencias externamente, podemos inyectar fácilmente "mocks" (objetos simulados) de esas dependencias durante las pruebas. Esto nos permite aislar la unidad de código que estamos probando y verificar su comportamiento independientemente del comportamiento real de sus dependencias. Sin ID, sería mucho más difícil reemplazar las dependencias reales por dobles de prueba.
* **Fomenta la Reusabilidad del Código:** Las clases que dependen de abstracciones son más reutilizables en diferentes contextos. Siempre que se les pueda proporcionar una implementación de la abstracción que necesiten, funcionarán correctamente.
* **Mejora la Mantenibilidad:** Un código con bajo acoplamiento y alta modularidad es más fácil de mantener y modificar. Los cambios en una parte del sistema tienen menos probabilidades de generar efectos secundarios inesperados en otras partes. Además, la ID facilita la sustitución de implementaciones de dependencias sin necesidad de alterar el código de las clases que las utilizan (siempre que se respete la abstracción).
* **Facilita la Escalabilidad:** La modularidad y el bajo acoplamiento que promueve la ID también contribuyen a una mejor escalabilidad de la aplicación. Los componentes pueden desarrollarse y escalarse de forma más independiente.


## Ejemplo de Inyección de Dependencias en MVC con Express

Este ejemplo ilustra cómo aplicar la Inyección de Dependencias (ID) en una aplicación Express siguiendo el patrón MVC.

## Estructura de Carpetas:

```
mi-proyecto/
├── routes/
│   └── libros.routes.js
├── controllers/
│   └── libros.controller.js
├── services/
│   └── libro.service.js
├── data-access/
│   └── libro.dao.js
├── models/
│   └── libro.model.js
├── app.js
└── 

```
## 1. Modelo (`models/libro.model.js`):

```javascript
class Libro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.id = Date.now();
  }

  isValid() {
    return this.titulo && this.autor && this.isbn;
  }
}

module.exports = Libro;
```
2. DAO (data-access/libro.dao.js):
```JavaScript

const libros = [];

class LibroDAO {
  async create(libro) {
    libros.push(libro);
    return libro;
  }

  async findByISBN(isbn) {
    return libros.find(l => l.isbn === isbn);
  }

  async getAll() {
    return [...libros];
  }
}

module.exports = LibroDAO;
```

3. Servicio (services/libro.service.js):
```JavaScript

const Libro = require('../models/libro.model');

class LibroService {
  constructor(libroDAO) {
    this.libroDAO = libroDAO; // Inyección de LibroDAO
  }

  async crearLibro(titulo, autor, isbn) {
    const existingLibro = await this.libroDAO.findByISBN(isbn);
    if (existingLibro) {
      throw new Error('Ya existe un libro con ese ISBN.');
    }
    const nuevoLibro = new Libro(titulo, autor, isbn);
    if (!nuevoLibro.isValid()) {
      throw new Error('Los datos del libro no son válidos.');
    }
    return this.libroDAO.create(nuevoLibro);
  }

  async obtenerTodosLosLibros() {
    return this.libroDAO.getAll();
  }
}

module.exports = LibroService;
````

4. Controlador (controllers/libros.controller.js):
```JavaScript

class LibrosController {
  constructor(libroService) {
    this.libroService = libroService; // Inyección de LibroService
  }

  async crearLibro(req, res) {
    const { titulo, autor, isbn } = req.body;
    try {
      const nuevoLibro = await this.libroService.crearLibro(titulo, autor, isbn);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerLibros(req, res) {
    try {
      const libros = await this.libroService.obtenerTodosLosLibros();
      res.status(200).json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los libros' });
    }
  }
}

module.exports = LibrosController;
```
5. Rutas (routes/libros.routes.js):
```JavaScript

const express = require('express');
const router = express.Router();
const LibrosController = require('../controllers/libros.controller');
const LibroService = require('../services/libro.service');
const LibroDAO = require('../data-access/libro.dao');

const libroDAO = new LibroDAO();
const libroService = new LibroService(libroDAO);
const librosController = new LibrosController(libroService);

router.post('/', (req, res) => librosController.crearLibro(req, res));
router.get('/', (req, res) => librosController.obtenerLibros(req, res));

module.exports = router;
```
6. app.js:
```JavaScript

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const librosRoutes = require('./routes/libros.routes');
const PORT = 3000;

app.use(bodyParser.json());
app.use('/libros', librosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
````
