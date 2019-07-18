const express = require("express");
const router = express.Router();
checkAuth = require("../middleware/check-auth");
const Opc = require("../models/opc");
const OpcShift = require("../models/opc-shift");
const OpcRoster = require('../models/opc-roster')
const opcController = require ('../controller/opc')

// add opc
router.post("/add-opc",checkAuth,opcController.addOpc);

// get opclist
router.get("/opc-list",checkAuth,opcController.getOpcList );

// delete opc
router.delete("/delete-opc/:id",opcController.deleteOpc );

// add opc shift
router.post("/add-opcshift", checkAuth,opcController.addOpcShift);

// get opc-shift list
router.get("/opc-shift",opcController.getOpcShiftList );

// delete
router.delete("/delete-opcshift/:id",opcController.deleteOpcShift);

// save assign shift
router.post('/assign-opcshift', checkAuth,opcController.assignShift)

// get roster
router.get('/roster/list',opcController.getOpcRoster)


// get roster by Id
router.get('/opc-roster/:id',opcController.getRosterById)


// update roster
router.put('/edit-roster/:id',checkAuth,opcController.updateRoster)

// delete roster
router.delete('/del-roster/:id',opcController.deleteRoster)


module.exports = router;
