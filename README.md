## Installation

Install my-project with npm

```bash
  npm install
  npm start
```

**Enviorment Variables**:
- *REACT_APP_CLOUD_NAME = Coudinary account info*
- *REACT_APP_CLOUD_API_KEY = Coudinary account info*
- *REACT_APP_CLOUD_SECRET = Coudinary account info*
- *REACT_APP_BACKEND_URL = Backend base url* 
- *DB_USER =  Database information*
- *DB_PASSWORD =  Database information*
- *DB_HOST =  Database information*
- *DB_NAME =  Database information*
- *DB_PORT =  Database information*
- *PORT =  Database information*
- *JWT_SECRET = Jason web token secret*

## Things I think I could do better

- Create a field to put the date where the visit was created and check every time the user want to add or modify the information she if is in the 24hs range, and if is not deny the action

- Testing (It was my fault. I run out of time to test the project)

- Adding more error handlers

## API Reference

#### Get all the user information

```http
  GET /api/userForm
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `JWT string` | **Required**. Your Authorization |

------------

#### Get all the users information (Admin)

```http
  GET /api/admin/getAllInformation
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `JWT string` | **Required**. Your Authorization |

------------

#### POST Create a new user
```http
  POST /api/register
```
| Parameter (body) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fullName`      | `string` | **Required**. Full name of the user |
| `email`      | `string` | **Required**. Email of the user |
| `password`      | `string` | **Required**. This string will be hashed |
| `rol`      | `Enum ("Admin", "User")` | **Not Required**. Default value "User" |

------------

#### POST Login a user
```http
  POST /api/login
```
| Parameter (body) | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user |
| `password`      | `string` | **Required**. Password |

------------

#### POST To complete the form(visit)
```http
  POST /api/userForm/form
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `CasaPrincipal`          | [object](#CasaPrincipal) | **Not Required** |
| `ExAgroinsumos`          | [object](#ExAgroinsumos) | **Not Required** |
| `Taller`                 | [object](#Taller) | **Not Required** |
| `Hangar`                 | [object](#Hangar) | **Not Required** |
| `Oficina`                | [object](#Oficina) | **Not Required** |
| `Balanza`                | [object](#Balanza) | **Not Required** |
| `Agroinsumos`            | [object](#Agroinsumos) | **Not Required** |
| `Camaras`                | [object](#Camaras) | **Not Required** |

----------

#### PUT Update information in Casa Principal
```http
  PUT /api/userForm/casaprincipal
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `CasaPrincipal`          | [object](#CasaPrincipal) | **Required** |

------------

#### PUT Update information in Camaras
```http
  PUT /api/userForm/camaras
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Camaras`                | [object](#Camaras) | **Required** |

------------

#### PUT Update information in Ex Agroinsumos
```http
  PUT /api/userForm/exAgroinsumos
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `ExAgroinsumos` | [object](#ExAgroinsumos) | **Required** |

------------

#### PUT Update information in Taller
```http
  PUT /api/userForm/taller
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Taller` | [object](#Taller) | **Required** |

------------

#### PUT Update information in Hangar
```http
  PUT /api/userForm/hangar
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Hangar`| [object](#Hangar) | **Required** |

------------

#### PUT Update information in Oficina
```http
  PUT /api/userForm/oficina
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Oficina`| [object](#Oficina) | **Required** |

------------

#### PUT Update information in Balanza
```http
  PUT /api/userForm/balanza
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Balanza`| [object](#Balanza) | **Required** |

------------

#### PUT Update information in Agroinsumos
```http
  PUT /api/userForm/agroinsumos
```
| Parameter (body) | Type     | Description|
| :-------- | :------- | :-------------------------------- |
| `Agroinsumos`| [object](#Agroinsumos) | **Required** |

------------

<a name="CasaPrincipal"></a>
***Casa Principal***


| Keys    | type |
| :-------- | :------- |
| ***`RackPrincipalLimpieza`***  | ***string (photo)***  |
| ***`RackPrincipalOrden`***  | ***string (photo)***  |
| ***`FuncionamientoAP`***  | ***string***  |
| ***`FuncionamientoTelefono`***  | ***string***  |
| ***`UPS`***  | ***string***  |

<a name="ExAgroinsumos"></a>
***Ex Agroinsumos***

| Keys    | type |
| :-------- | :------- |
| ***`RackPrincipalLimpieza`***  | ***string (photo)***  |
| ***`RackPrincipalOrden`***  | ***string (photo)***  |
| ***`FuncionamientoAP`***  | ***string***  |

<a name="Taller"></a>
 ***Taller***

| Keys    | type |
| :-------- | :------- |
| ***`RackPrincipalLimpieza`***  | ***string (photo)***  |
| ***`RackPrincipalOrden`***  | ***string (photo)***  |
| ***`FuncionamientoTelefono`***  | ***string***  |
| ***`FuncionamientoAP`***  | ***string***  |

<a name="Hangar"></a>
 ***Hangar***

| Keys    | type |
| :-------- | :------- |
| ***`RackPrincipalLimpieza`***  | ***string (photo)***  |
| ***`RackPrincipalOrden`***  | ***string (photo)***  |
| ***`FuncionamientoTelefono`***  | ***string***  |
| ***`FuncionamientoAP`***  | ***string***  |

<a name="Oficina"></a>
 ***Oficina***

| Keys    | type |
| :-------- | :------- |
| ***`LimpiarPC`***  | ***string (photo)***  |
| ***`AcomodarCables`***  | ***string (photo)***  |
| ***`FuncionamientoTelefono`***  | ***string***  |

<a name="Balanza"></a>
 ***Balanza***

| Keys    | type |
| :-------- | :------- |
| ***`RackPrincipalLimpieza`***  | ***string (photo)***  |
| ***`RackPrincipalOrden`***  | ***string (photo)***  |
| ***`LimpiarPC`***  | ***string (photo)***  |
| ***`FuncionamientoTelefono`***  | ***string***  |
| ***`FuncionamientoAP`***  | ***string***  |
| ***`UPS`***  | ***string***  |

<a name="Agroinsumos"></a>
 ***Agroinsumos***

| Keys    | type |
| :-------- | :------- |
| ***`FuncionamientoAP`***  | ***string***  |

<a name="Camaras"></a>
 ***Camaras***

| Keys    | type |
| :-------- | :------- |
| ***`ChequearVisualizacion`***  | ***string***  |

