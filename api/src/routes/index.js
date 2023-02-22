const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const abogadoRoute = require("./abogadoRoute");
const licenciaRoute = require("./licenciaRoute");
const feriadoRoute = require("./feriadoRoute");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/abogados", abogadoRoute);
router.use("/licencias", licenciaRoute);
router.use("/feriados", feriadoRoute);

module.exports = router;
