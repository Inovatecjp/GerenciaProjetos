const express = require('express');
const enderecoController = require('../controllers/enderecoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/auth'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Endereço
router.post('/', AuthMiddleware, enderecoController.create); // Criar endereço
router.get('/', enderecoController.getAll); // Listar todos os endereços
router.get('/:id', enderecoController.get); // Obter um endereço específico por ID
router.put('/:id', AuthMiddleware, enderecoController.update); // Atualizar endereço
router.delete('/:id', AuthMiddleware, enderecoController.remove); // Deletar endereço

module.exports = router;
