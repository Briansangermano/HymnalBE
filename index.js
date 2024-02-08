const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const himnosRouter = require("./routes/himnos");

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect(
  "mongodb+srv://briansangermano:NspRDXXoM5eb2SHf@cluster0.t5dtnjr.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado a la base de datos"));

// Rutas para los himnos
app.use("/himnos", himnosRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
