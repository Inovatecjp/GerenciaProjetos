const express = require('express');
const { Router } = express;

const projetoUsuarioController = require('../controllers/projetoUsuarioController');
const authMiddleware = require('../middlewares/authSession');

const router = Router();

router.post('/', authMiddleware.hasPermission(), projetoUsuarioController.assignUser);
router.get('/', authMiddleware.hasPermission(), projetoUsuarioController.getAll);
router.get('/:id', authMiddleware.hasPermission(), projetoUsuarioController.getByProjetoId);
router.put('/:id', authMiddleware.hasPermission(), projetoUsuarioController.update);
router.delete('/:id', authMiddleware.hasPermission(), projetoUsuarioController.delete);

module.exports = router;
