const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importamos el archivo de rutas
const loginRoutes = require("./routes/login");
const updateRoutes = require("./routes/update");
const addBeneficiaryRoutes = require("./routes/addBeneficiary");
const deleteBeneficiary = require("./routes/deleteBeneficiary");

// Rutas //

// Ruta de inicio de sesión
app.post("/login", loginRoutes);
// Ruta para actualizar el expediente médico
app.put("/actualizar-expediente", updateRoutes);
// Ruta para agregar un beneficiario a un paciente
app.post("/agregar-beneficiario", addBeneficiaryRoutes);
// Ruta para eliminar un beneficiario
app.delete('/eliminar-beneficiario/:beneficiarioId', deleteBeneficiary);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
