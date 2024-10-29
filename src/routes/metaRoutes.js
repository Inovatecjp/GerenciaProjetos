const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

// Rota para listar todas as metas
router.get('/', metaController.listarMetas);

// Rota para obter uma meta específica
router.get('/:id', metaController.obterMeta);

// Rota para criar uma nova meta
router.post('/', metaController.criarMeta);

// Rota para atualizar uma meta
router.put('/:id', metaController.atualizarMeta);

// Rota para excluir uma meta
router.delete('/:id', metaController.excluirMeta);

module.exports = router;
