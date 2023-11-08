/**
 * Módulo que proporciona una función para eliminar un beneficiario de un paciente.
 * Utiliza una conexión a la base de datos PostgreSQL y verifica la autenticación
 * del paciente antes de permitir la eliminación del beneficiario.
 */

// Importar las dependencias necesarias
const DB_CONFIG = require("../database/databaseConfig");
const jwt = require("jsonwebtoken");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Elimina un beneficiario de un paciente.
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const deleteBeneficiary = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  let username;

  try {
    const decodedToken = jwt.verify(token, secret);
    username = decodedToken.username;
  } catch (error) {
    res.status(401).json({ message: "No autorizado" });
    return;
  }

  const beneficiarioId = req.params.beneficiarioId;

  const client = await DB_CONFIG.connect();

  try {
    const query = `
      DELETE FROM beneficiarios
      WHERE id = $1 AND paciente_username = $2;
    `;

    const values = [beneficiarioId, username];

    const deleteResult = await client.query(query, values);
    await client.query("COMMIT");
    client.release();

    // Devolver una respuesta al cliente
    if (deleteResult.rowCount === 1) {
      res.json({ message: "Beneficiario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Beneficiario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el beneficiario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = deleteBeneficiary;
