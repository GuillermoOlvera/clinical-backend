const express = require("express");
const cors = require("cors");

const app = express();

// Configurar CORS
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

// Importamos el archivo de rutas
const loginRoutes = require("./routes/login");
const updateRoutes = require("./routes/update");
const addBeneficiaryRoutes = require("./routes/addBeneficiary");
const deleteBeneficiary = require("./routes/deleteBeneficiary");
const getBeneficiaries = require("./routes/getBeneficiary");
const getPatientData = require("./routes/getPatientData");

// Rutas //
// Ruta de inicio de sesión
app.post("/login", loginRoutes);
// Ruta para actualizar el expediente médico
app.put("/actualizar-expediente", updateRoutes);
// Ruta para agregar un beneficiario a un paciente
app.post("/agregar-beneficiario", addBeneficiaryRoutes);
// Ruta para eliminar un beneficiario
app.delete('/eliminar-beneficiario/:beneficiarioId', deleteBeneficiary);
// Ruta para obtener la lista de beneficiarios
app.get("/getBeneficiaries", getBeneficiaries);
// Ruta para obtener los datos del paciente
app.get("/getPatientData", getPatientData);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
