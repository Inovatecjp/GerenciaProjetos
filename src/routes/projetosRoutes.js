const express = require('express');
const projetoController = require('../controllers/projetoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Caso precise de autenticação

const router = Router();

// Rotas para operações de CRUD de Projeto
router.post('/', AuthMiddleware.hasPermission(), projetoController.create); // Criar projeto
router.get('/', projetoController.getAll); // Listar todos os projetos
router.get('/:id', projetoController.get); // Obter um projeto específico por ID
router.put('/:id', AuthMiddleware.hasPermission(), projetoController.update); // Atualizar projeto
router.delete('/:id', AuthMiddleware.hasPermission(), projetoController.remove); // Deletar projeto

module.exports = router;
