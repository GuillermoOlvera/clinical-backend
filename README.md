# Proyecto de Gestión Médica

Este proyecto utiliza un stack de tecnologías modernas para desarrollar una aplicación de gestión médica. A continuación, se detallan las tecnologías y herramientas clave utilizadas en el proyecto:

## Tecnologías y Herramientas

### Node.js

- **Descripción**: Node.js es un entorno de tiempo de ejecución de JavaScript que permite ejecutar código JavaScript en el lado del servidor.
- **Sitio web oficial**: [Node.js](https://nodejs.org/)

### Express

- **Descripción**: Express.js es un marco de aplicación web de Node.js minimalista y flexible que proporciona una amplia variedad de características para aplicaciones web y móviles.
- **Sitio web oficial**: [Express](https://expressjs.com/)

### Docker

- **Descripción**: Docker es una plataforma de contenedores que permite empaquetar, distribuir y ejecutar aplicaciones en contenedores ligeros y portátiles.
- **Sitio web oficial**: [Docker](https://www.docker.com/)

### TablePlus

- **Descripción**: TablePlus es una herramienta de gestión de bases de datos moderna y nativa para administrar bases de datos SQL.
- **Sitio web oficial**: [TablePlus](https://tableplus.com/)

### Postman

- **Descripción**: Postman es una plataforma de colaboración para el desarrollo de API que se utiliza para probar y documentar API.
- **Sitio web oficial**: [Postman](https://www.postman.com/)

### PostgreSQL

- **Descripción**: PostgreSQL es un sistema de gestión de bases de datos relacional de código abierto y potente que se utiliza para almacenar y administrar datos.
- **Sitio web oficial**: [PostgreSQL](https://www.postgresql.org/)

### JSON Web Tokens (JWT)

- **Descripción**: JSON Web Tokens (JWT) son un estándar abierto (RFC 7519) que define una forma compacta y autónoma de representar información entre las partes como un objeto JSON.
- **Sitio web oficial**: [JWT](https://jwt.io/)

## Requisitos Previos

Asegúrate de tener las siguientes herramientas y componentes instalados en tu sistema antes de ejecutar la aplicación:

- Node.js (versión recomendada)
- Docker
- TablePlus (o una herramienta de gestión de bases de datos similar)
- Postman (opcional para probar las API)
- PostgreSQL (debe estar en ejecución y configurado)

## Instrucciones de Ejecución

1. Clona este repositorio en tu máquina local.
2. Abre una terminal y navega hasta el directorio del proyecto.
3. Ejecuta el comando `npm install` para instalar las dependencias.
4. Inicia la aplicación con el comando `npm start`.

# Archivo: app.js

Este archivo define la aplicación Express.

## Funciones:

- `app.use(express.json())`: Configura la aplicación para aceptar solicitudes JSON.
- `app.post("/login", loginRoutes)`: Define la ruta `/login` que se utiliza para iniciar sesión en la aplicación.
- `app.put("/actualizar-expediente", updateRoutes)`: Define la ruta `/actualizar-expediente` que se utiliza para actualizar el expediente médico de un paciente.
- `app.post("/agregar-beneficiario", addBeneficiaryRoutes)`: Define la ruta `/agregar-beneficiario` que se utiliza para agregar un beneficiario a un paciente.
- `app.delete('/eliminar-beneficiario/:beneficiarioId', deleteBeneficiary)`: Define la ruta `/eliminar-beneficiario` que se utiliza para eliminar un beneficiario de un paciente.
- `app.listen(port, () => { ... })`: Inicia el servidor en el puerto especificado.

## Variables:

- `express`: Módulo Express.
- `app`: Instancia de la aplicación Express.
- `port`: Puerto en el que se ejecutará el servidor.
- `loginRoutes`: Rutas relacionadas con el inicio de sesión.
- `updateRoutes`: Rutas relacionadas con la actualización del expediente médico.
- `addBeneficiaryRoutes`: Rutas relacionadas con la adición de beneficiarios.
- `deleteBeneficiary`: Ruta relacionada con la eliminación de beneficiarios.