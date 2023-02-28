const Router = require("express");
const router = Router();
const { Licencia } = require("../db");
const { Abogado } = require("../db");
const { Op } = require("sequelize");

//RUTA PARA TRAER UNA LICENCIA POR SU ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const licencia = await Licencia.findByPk(id);
    return res.status(200).json(licencia);
  } catch (err) {
    return res.status(400).json({ error: err.messages });
  }
});

//RUTA PARA CREAR UNA LICENCIA
router.post("/", async (req, res) => {
  const newLicencia = req.body;
  console.log(newLicencia);
  try {
    const addNewLicencia = await Licencia.create(newLicencia);
    console.log(addNewLicencia);
    return res.status(201).json(addNewLicencia);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
//RUTA PARA TRAER EL LISTADO DE TODAS LAS LICENCIAS
//router.get("/", async (req, res) => {
//  try {
//    let licencias = await Licencia.findAll();
//    return res.status(200).json(licencias);
//  } catch (err) {
//    return res.status(400).json({ error: err.message });
//  }
//});

router.get("/", async (req, res) => {
  try {
    const licencias = await Licencia.findAll({
      include: {
        model: Abogado,
        as: "abogado",
        attributes: ["apellido", "nombre"],
      },
      attributes: ["id", "fechaI", "dias", "fechaF", "activo"],
    });
    return res.status(200).json(licencias);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//RUTA PARA ACTUALIZAR UNA LICENCIA
router.put("/", async (req, res) => {
  const licenciaNEW = req.body;
  try {
    const updateLicencia = await Licencia.findByPk(licenciaNEW.id);
    if (licenciaNEW.abogadoId) updateLicencia.abogadoId = licenciaNEW.abogadoId;
    if (licenciaNEW.fechaI) updateLicencia.fechaI = licenciaNEW.fechaI;
    if (licenciaNEW.dias) updateLicencia.dias = licenciaNEW.dias;
    if (licenciaNEW.fechaF) updateLicencia.fechaF = licenciaNEW.fechaF;
    const licenciaUpdate = await updateLicencia.save();
    return res.status(200).json(licenciaUpdate);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//RUTA PARA ELIMINAR UNA LICENCIA
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleted = await Licencia.destroy({ where: { id } });
    return res.status(200).json(deleted);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
module.exports = router;
