/**
 * Módulo que proporciona una función para procesar la solicitud de inicio de sesión de un paciente.
 * Utiliza una conexión a la base de datos PostgreSQL para verificar las credenciales del paciente
 * y emitir un token de autenticación en caso de éxito.
 */

// Importar las dependencias necesarias
const jwt = require("jsonwebtoken");
const DB_CONFIG = require("../database/databaseConfig");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Procesa la solicitud de inicio de sesión.
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const login = async (req, res) => {
  // Obtenemos los datos de la solicitud
  const { username, password } = req.body;

  try {
    // Verificar las credenciales en la base de datos
    const client = await DB_CONFIG.connect();
    const result = await client.query(
      "SELECT * FROM patients WHERE username = $1 AND password = $2",
      [username, password]
    );

    client.release();

    if (result.rows.length === 1) {
      // Devuelve una respuesta con un token y un mensaje de éxito.
      const token = jwt.sign(
        {
          username: username,
        },
        secret,
        {
          expiresIn: 300,
        }
      );

      res.json({
        message: "Inicio de sesión exitoso",
        token: token,
      });
    } else {
      // Credenciales inválidas; devuelve un mensaje de error.
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al verificar las credenciales:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Exportamos la función
module.exports = login;
