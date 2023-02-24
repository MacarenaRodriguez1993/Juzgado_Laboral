const Router = require("express");
const router = Router();
const { Abogado } = require("../db");
const { Op, where } = require("sequelize");
const Licencia = require("../models/Licencia");

// RUTA PARA TRAER UN ABOGADO POR SU ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const abogado = await Abogado.findByPk(id);
    return res.status(200).json(abogado);
  } catch (err) {
    return res.status(400).json({ error: err.messages });
  }
});

// RUTA PARA CREAR UN NUEVO ABOGADO
router.post("/", async (req, res) => {
  try {
    const newAbogado = req.body;
    const addNewAbogado = await Abogado.create(newAbogado);
    return res.status(201).json(addNewAbogado);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//RUTA PARA TRAER EL LISTADO DE TODOS LOS ABOGADOS
//router.get("/", async (req, res) => {
//  let { name } = req.query;
//  try {
//    if (name === undefined) {
//      let abogados = await Abogado.findAll();
//      return res.status(200).json(abogados);
//    } else {
//      let abogadosFiltrado = await Abogado.findAll({
//        where: {
//          apellido: {
//            [Op.substring]: `%${name}%`,
//          },
//        },
//      });
//      if (abogadosFiltrado.length === 0) {
//        abogadosFiltrado = [];
//        return res.status(200).json(abogadosFiltrado);
//      }
//      return res.status(200).json(abogadosFiltrado);
//    }
//  } catch (err) {
//    return res.status(400).json({ error: err.message });
//  }
//});
//router.get("/", async (req, res) => {
//  try {
//    const abogados = await Abogado.findAll({
//      include: [
//        {
//          model: Licencia,
//          as: "licencias",
//          attributes: ["fechaI", "dias", "fechaF"],
//          where: {
//            activo: true,
//          },
//        },
//      ],
//      attributes: ["apellido", "nombre"],
//    });
//    return res.status(200).json(abogados);
//  } catch (err) {
//    return res.status(400).json({ error: err.message });
//  }
//});

router.get("/", async (req, res) => {
  try {
    const abogados = await Abogado.findAll();
    return res.status(200).json(abogados);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
// RUTA PARA ACTUALIZAR DAROS DE UN ABOGADO
router.put("/", async (req, res) => {
  const abogadoEditado = req.body;
  try {
    const update = await Abogado.findByPk(abogadoEditado.id);
    if (abogadoEditado.nombre) update.nombre = abogadoEditado.nombre;
    if (abogadoEditado.apellido) update.apellido = abogadoEditado.apellido;
    if (abogadoEditado.matricula) update.matricula = abogadoEditado.matricula;
    const abogadoUpdate = await update.save();
    console.log(abogadoUpdate);
    return res.status(200).json(abogadoUpdate);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});
// RUTA PARA ELIMINAR UN ABOGADO

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Abogado.destroy({ where: { id } });
    return res.status(200).json(deleted);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
module.exports = router;
