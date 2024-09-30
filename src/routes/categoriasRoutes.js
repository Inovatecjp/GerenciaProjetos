const express = require('express');
const categoriaController = require('../controllers/categoriaController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Categoria
router.post('/',  categoriaController.create); // Criar categoria
router.get('/', categoriaController.getAll); // Listar todas as categorias
router.get('/:id', categoriaController.get); // Obter uma categoria específica por ID
router.put('/:id',  categoriaController.update); // Atualizar categoria
router.delete('/:id',  categoriaController.remove); // Deletar categoria

module.exports = router;
