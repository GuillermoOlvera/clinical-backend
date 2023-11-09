// Importar las dependencias necesarias
const jwt = require("jsonwebtoken");
const DB_CONFIG = require("../database/databaseConfig");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Obtiene los datos del expediente médico de un paciente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const getPatientData = async (req, res) => {
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

  // Obtener los datos del expediente médico del paciente
  const client = await DB_CONFIG.connect();

  try {
    const query = `
      SELECT lugar_de_nacimiento, sexo, edad, tipo_de_sangre, peso, estatura, alergias, imc
      FROM patients
      WHERE username = $1;
    `;

    const result = await client.query(query, [username]);
    client.release();

    // Devolver una respuesta al cliente
    if (result.rows.length === 1) {
      const patientData = result.rows[0];
      res.json(patientData);
    } else {
      res.status(404).json({ message: "Paciente no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener datos del paciente:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = getPatientData;