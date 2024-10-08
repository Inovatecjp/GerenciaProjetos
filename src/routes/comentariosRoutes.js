const express = require('express');
const comentarioController = require('../controllers/comentarioController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/auth'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Comentário
router.post('/',  comentarioController.create); // Criar comentário
router.get('/', comentarioController.getAll); // Listar todos os comentários
router.get('/:id', comentarioController.get); // Obter um comentário específico por ID
router.put('/:id',  comentarioController.update); // Atualizar comentário
router.delete('/:id',  comentarioController.remove); // Deletar comentário

module.exports = router;
