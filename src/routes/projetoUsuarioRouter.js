const express = require('express');
const { Router } = express;

const projetoUsuarioController = require('../controllers/projetoUsuarioController');
const authMiddleware = require('../middlewares/authSession');

const router = Router();

router.post('/:id',  projetoUsuarioController.assignUser);
router.get('/',  projetoUsuarioController.getAll);
router.get('/:idprojeto/:id',  projetoUsuarioController.getByProjetoId);//vai pegar o mes
router.put('/:id',  projetoUsuarioController.update);
router.delete('/:id',  projetoUsuarioController.delete);

module.exports = router;
