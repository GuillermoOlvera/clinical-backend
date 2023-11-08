const { Pool } = require("pg");

// Configuración de la conexión a la base de datos PostgreSQL
const DB_CONFIG  = new Pool({
    user: "alumno",
    host: "localhost",
    database: "clinical_office",
    password: "123456",
    port: 5432,
  });

module.exports = DB_CONFIG;