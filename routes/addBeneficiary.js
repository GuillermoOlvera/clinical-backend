/**
 * Este módulo contiene una función para agregar un beneficiario a un paciente.
 * Utiliza una conexión a una base de datos PostgreSQL y verifica la autenticación
 * del paciente antes de permitir la adición de beneficiarios.
 */

// Importar las dependencias necesarias
const jwt = require("jsonwebtoken");
const DB_CONFIG = require("../database/databaseConfig");

// Clave secreta para firmar el token de autenticación
const secret = "my-secret-key";

/**
 * Agrega un beneficiario a un paciente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 */
const addBeneficiary = async (req, res) => {
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

  // Verificar la cantidad de beneficiarios existentes para el paciente
  const client = await DB_CONFIG.connect();

  try {
    const query = `
      SELECT COUNT(*) AS cantidad_beneficiarios
      FROM beneficiarios
      WHERE paciente_username = $1;
    `;

    const countResult = await client.query(query, [username]);
    const cantidadBeneficiarios = parseInt(
      countResult.rows[0].cantidad_beneficiarios
    );

    if (cantidadBeneficiarios >= 3) {
      // Si el paciente ya tiene 3 beneficiarios, no se permite agregar más.
      res.status(400).json({
        message:
          "El paciente ya tiene 3 beneficiarios, no se pueden agregar más.",
      });
      return;
    }

    // Obtener los datos del beneficiario del cuerpo de la solicitud
    const { nombre, edad, relacion } = req.body;

    // Insertar un nuevo beneficiario en la tabla de beneficiarios
    const insertQuery = `
      INSERT INTO beneficiarios (nombre, edad, relacion, paciente_username)
      VALUES ($1, $2, $3, $4);
    `;

    const values = [nombre, edad, relacion, username];

    const insertResult = await client.query(insertQuery, values);
    await client.query("COMMIT");
    client.release();

    // Devolver una respuesta al cliente
    if (insertResult.rowCount === 1) {
      res.json({ message: "Beneficiario agregado correctamente" });
    } else {
      res.status(404).json({ message: "Paciente no encontrado" });
    }
  } catch (error) {
    console.error("Error al agregar el beneficiario:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = addBeneficiary;
