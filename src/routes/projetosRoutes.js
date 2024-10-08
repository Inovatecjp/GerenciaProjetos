const express = require('express');
const projetoController = require('../controllers/projetoController.js');
const categoriaController = require('../controllers/categoriaController.js');
const gerenteProjetoController = require('../controllers/gerenteProjetoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Caso precise de autenticação

const router = Router();

// Rotas para operações de CRUD de Projeto
router.post('/', AuthMiddleware.hasPermission(true), projetoController.create); // Criar projeto
router.get('/', projetoController.getAll); // Listar todos os projetos


router.get('/terefas/:id', categoriaController.getTarefabyidPrjeto); // Obter um projeto específico por ID
router.get('/allinfo/:id', projetoController.getAllInfos); // Obter um projeto específico por ID todas as infos
// Rota para listar todos os usuários de um projeto
router.get('/:projetoId/usuarios', gerenteProjetoController.getUsuariosProjeto);

// Rota para listar usuários sem tarefa
router.get('/:projetoId/usuarios/sem-tarefa', gerenteProjetoController.getUsuariosSemTarefa);



router.get('/:id', projetoController.get); // Obter um projeto específico por ID
router.put('/:id', AuthMiddleware.hasPermission(), projetoController.update); // Atualizar projeto
router.delete('/:id', AuthMiddleware.hasPermission(), projetoController.remove); // Deletar projeto

module.exports = router;
