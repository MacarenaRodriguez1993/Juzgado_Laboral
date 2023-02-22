const Router = require("express");
const router = Router();

const { Feriado } = require("../db");

//RUTA PARA AGREGAR UN NUEVO FERIADO
router.post("/", async (req, res) => {
  try {
    const newFeriado = req.body;
    const addNewFeriado = await Feriado.create(newFeriado);
    return res.status(201).json(addNewFeriado);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//RUTA PARA TRAER TODOS LOS FERIADOS
router.get("/", async (req, res) => {
  try {
    const feriado = await Feriado.findAll();
    console.log(feriado);
    return res.status(200).json(feriado);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
module.exports = router;
