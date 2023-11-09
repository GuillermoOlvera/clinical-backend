// Importar las dependencias necesarias
const jwt = require("jsonwebtoken");
const DB_CONFIG = require("../database/databaseConfig");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Obtiene los beneficiarios de un paciente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const getBeneficiaries = async (req, res) => {
  // Verificar que el paciente esté autenticado
  const token = req.headers.authorization.split(" ")[1];
  let username;

  try {
    const decodedToken = jwt.verify(token, secret);
    username = decodedToken.username;
  } catch (error) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  // Obtener los beneficiarios del paciente
  const client = await DB_CONFIG.connect();

  try {
    const query = `
      SELECT id, nombre, edad, relacion
      FROM beneficiarios
      WHERE paciente_username = $1;
    `;

    const result = await client.query(query, [username]);
    client.release();

    // Devolver una respuesta al cliente
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener beneficiarios:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getBeneficiaries;