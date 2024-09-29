const express = require('express');
const categoriaController = require('../controllers/categoriaController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Categoria
router.post('/', AuthMiddleware.hasPermission(), categoriaController.create); // Criar categoria
router.get('/',AuthMiddleware.hasPermission(), categoriaController.getAll); // Listar todas as categorias
router.get('/:id',AuthMiddleware.hasPermission(), categoriaController.get); // Obter uma categoria específica por ID
router.put('/:id', AuthMiddleware.hasPermission(), categoriaController.update); // Atualizar categoria
router.delete('/:id', AuthMiddleware.hasPermission(), categoriaController.remove); // Deletar categoria

module.exports = router;
