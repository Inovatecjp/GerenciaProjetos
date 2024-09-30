const express = require('express');
const enderecoController = require('../controllers/enderecoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/auth'); // Caso precise de autenticação

const router = Router();

// Rotas para operações CRUD de Endereço
router.post('/', enderecoController.create); // Criar endereço
router.get('/', enderecoController.getAll); // Listar todos os endereços
router.get('/:id', enderecoController.get); // Obter um endereço específico por ID
router.put('/:id', enderecoController.update); // Atualizar endereço
router.delete('/:id', enderecoController.remove); // Deletar endereço

module.exports = router;
