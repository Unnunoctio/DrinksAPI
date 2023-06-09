# Drinks API

Esta API permite administrar diferentes tipos de bebidas alcoholicas, en especifico Cervezas, Destilados y Vinos.

Incluye operaciones de creación, lectura, actualización y eliminación.

Para acceder a la API y realizar operaciones protegidas, se requiere proporcionar una clave de API válida a través del encabezado `x-api-key`.

## Instalación

### 1. Clona este repositorio:
    git clone https://github.com/Unnunoctio/DrinksAPI.git

### 2. Instala las dependencias:
  
    npm install

### 3. Crea un archivo `.env` en la carpeta raíz del proyecto y define las variables de entorno: `PORT`, `DB_CNN` y `API_KEY`

    PORT=3000
    DB_CNN=URI_DATABASE
    API_KEY=tu_api_key

### 4. Inicia el servidor:

    npm start

# Endpoints

## Obtener todas las bebidas alcohólicas
  
`GET /drinks`

Este endpoint permite obtener todas las bebidas registradas en la base de datos.

Parámetros de consulta opcionales:
- `page`: Número de página para paginar los resultados (valor por defecto: 1).
- `limit`: Número máximo de resultados por página (valor por defecto: 10).
  
## Obtener bebidas alcohólicas mediante parametros

`GET /drinks/drink`

  Este endpoint permite filtrar por medio de los parametros internos de las bebidas alcohólicas.

  Parámetros de consulta:
  - `name`: Nombre de la bebida alcohólica.
  - `brand`: Marca de la bebida alcohólica.
  - `alcoholic_grade`: Graduación alcohólica de la bebida.
  - `content`: Contenido en cc o ml de la bebida alcohólica.
  - `package`: Formato de entrega de la bebida alcohólica (ej: Botella, Lata, Barril, etc).
  - `category`: Tipo de bebida alcohólica (Cervezas, Destilados, Vinos).
  - `sub_category`: SubTipo referente al Tipo (ej: Cervezas Artesanales, Vinos Blancos, Whisky, etc).
  - `made_in`: Lugar de Origen de la bebida alcohólica.
  - `variety`: En caso de ser un tipo `Cervezas` es el estilo que esta es (ej: Lager, Ale, IPA, etc).
  - `bitterness`: En caso de ser un tipo `Cervezas` es el amargor en formato IBU.
  - `strain`: En caso de ser un tipo `Vinos` es la cepa del vino (ej: Merlot, Carmenere, Syrah, etc).
  - `vineyard`: En caso de ser un tipo `Vinos` es la viña a la cual corresponde.

## Crear una bebida alcohólica

`POST /drinks`

  Este endpoint permite crear una nueva bebida alcoholica.

  Cuerpo de la solicitud (en formato JSON):
  ```json
  {
    "name": "Nombre de la bebida",
    "brand": "Marca de la bebida",
    "alcoholicGrade": 0,
    "content": 330,
    "package": "Lata",
    "category": "Cervezas",
    "subCategory": "Cervezas Sin Alcohol",
    "madeIn": "EEUU",
    "variety": "Ale",
    "bitternes": "25 IBU"
  }
  ```

## Agregar un excel con bebidas alcohólicas

`POST /drinks/excel`

  Este endpoint permite enviar un excel con datos agregados, de modo que se inserten varias bebidas alcohólicas de manera simultánea.
  
## Modificar una bebida alcoholica

`PUT /drinks/:id`

  Este endpoint permite modificar una bebida alcoholica existente mediante su identificador.
  
  Cuerpo de la solicitud (en formato JSON):
  ```json
  {
    "name": "Nuevo Nombre",
    "content": 500
  }
  ```
  
## Eliminar una bebida alcoholica

`DELETE /drinks/:id`

  Este endpoint permite eliminar una bebida alcoholica existente mediante su identificador.
  
# Errores

  La API devuelve los siguentes codigos de estado y mensajes de error en caso de problemas:
  - 400 Bad Request: Error en la solicitud o datos no validos.
  - 401 Unauthorized: Falta o clave de API incorrecta.
  - 404 Not Found: La Bebida alcoholica no existe.
  - 500 Internal Server Error: Error interno del servidor.

# Tecnologias utilizadas
  
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

# Contribuciones

  Las contribuciones son bienvenidas. Si deseas mejorar este proyecto, no dudes en crear un pull request.
