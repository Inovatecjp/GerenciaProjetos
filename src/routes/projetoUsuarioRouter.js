// routes/projetoUsuarioRoutes.js
const express = require('express');
const { Router } = express;

const projetoUsuarioController = require('../controllers/projetoUsuarioController');
const AuthMiddleware = require('../middlewares/authSession');


const router = Router();

router.post('/', AuthMiddleware.hasPermission(), projetoUsuarioController.assignUser);
router.get('/', AuthMiddleware.hasPermission(), projetoUsuarioController.getAll);
router.get('/:id', AuthMiddleware.hasPermission(), projetoUsuarioController.getByProjetoId);
router.put('/:id', AuthMiddleware.hasPermission(), projetoUsuarioController.update);
router.delete('/:id', AuthMiddleware.hasPermission(), projetoUsuarioController.delete);

module.exports = router;
