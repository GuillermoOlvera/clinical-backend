/**
 * Módulo que proporciona una función para actualizar el expediente médico de un paciente.
 * Utiliza una conexión a la base de datos PostgreSQL y verifica la autenticación del paciente
 * a través de un token JWT.
 */

// Importar las dependencias necesarias
const DB_CONFIG = require("../database/databaseConfig");
const jwt = require("jsonwebtoken");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Función para actualizar el expediente médico de un paciente.
 * @function
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const updatePatient = async (req, res) => {
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

  // Obtener los datos del expediente médico actualizados del cliente
  const {
    lugar_de_nacimiento,
    sexo,
    edad,
    tipo_de_sangre,
    peso,
    estatura,
    alergias,
  } = req.body;

  // Convertir la altura de metros a centímetros
  const metersToCentimeters = estatura * 100;

  // Calcular el IMC (índice de masa corporal)
  const imc = Math.round(peso / Math.pow(metersToCentimeters / 100, 2));

  // Actualizar los datos en la base de datos
  const client = await DB_CONFIG.connect();

  try {
    const query = `
      UPDATE patients
      SET lugar_de_nacimiento = $1,
        sexo = $2,
        edad = $3,
        tipo_de_sangre = $4,
        peso = $5,
        estatura = $6,
        alergias = $7,
        imc = $8
      WHERE username = $9;
    `;
    const values = [
      lugar_de_nacimiento,
      sexo,
      edad,
      tipo_de_sangre,
      peso,
      estatura,
      alergias,
      imc,
      username,
    ];

    const result = await client.query(query, values);
    await client.query("COMMIT");
    client.release();

    // Devolver una respuesta al cliente
    if (result.rowCount === 1) {
      res.json({ message: "Expediente médico actualizado correctamente" });
    } else {
      res
        .status(500)
        .json({ message: "Error al actualizar el expediente médico" });
    }
  } catch (error) {
    console.error("Error al actualizar el expediente médico:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = updatePatient;
