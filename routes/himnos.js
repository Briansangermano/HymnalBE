const express = require("express");
const router = express.Router();
const Himno = require("../models/himno");

// Obtener todos los himnos
router.get("/", async (req, res) => {
  try {
    const himnos = await Himno.find();
    res.json(himnos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un himno
router.post("/", async (req, res) => {
  const himno = new Himno({
    numero: req.body.numero,
    titulo: req.body.titulo,
    letra: req.body.letra,
    autor: req.body.autor,
  });

  try {
    const nuevoHimno = await himno.save();
    res.status(201).json(nuevoHimno);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener los himnos por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const himno = await Himno.findOne({ numero: parseInt(id) });

    if (!himno) {
      return res.status(404).json({ mensaje: "Himno no encontrado" });
    }

    res.json(himno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el himno", error });
  }
});

// Obtener los himnos por primera letras
router.get("/titulo/:titulo", async (req, res) => {
  try {
    const himno = await Himno.findOne({ titulo: req.params.titulo });
    if (!himno) {
      return res.status(404).json({ message: "Himno no encontrado" });
    }
    res.json(himno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
