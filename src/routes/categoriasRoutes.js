const express = require('express');
const categoriaController = require('../controllers/categoriaController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/auth'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Categoria
router.post('/', AuthMiddleware, categoriaController.create); // Criar categoria
router.get('/', categoriaController.getAll); // Listar todas as categorias
router.get('/:id', categoriaController.get); // Obter uma categoria específica por ID
router.put('/:id', AuthMiddleware, categoriaController.update); // Atualizar categoria
router.delete('/:id', AuthMiddleware, categoriaController.remove); // Deletar categoria

module.exports = router;
