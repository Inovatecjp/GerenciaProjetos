const express = require('express');
const projetoController = require('../controllers/projetoController.js');
const categoriaController = require('../controllers/categoriaController.js');
const gerenteProjetoController = require('../controllers/gerenteProjetoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Habilite conforme necessário

const router = Router();

// Rotas para operações de CRUD de Projeto
router.post('/', projetoController.create); // Criar projeto
router.get('/', projetoController.getAll); // Listar todos os projetos
router.get('/:id', projetoController.get); // Obter um projeto específico por ID
router.put('/:id', projetoController.update); // Atualizar projeto por ID
router.delete('/:id', projetoController.remove); // Deletar projeto por ID

// Rota para obter todas as informações de um projeto por ID
router.get('/allinfo/:id', projetoController.getAllInfos); 

// Rotas relacionadas a tarefas e categorias
router.get('/tarefas/:id', categoriaController.getTarefabyidPrjeto); // Obter tarefas de um projeto específico


router.get('/:id/categoria', projetoController.getCategoriaByProjeto); // peghar o id do projeto para ter as categorias


router.post('/:projetoId/tarefa/data', gerenteProjetoController.gettarefadata); // Obter tarefas associadas a um usuário com base em data

// Rotas relacionadas aos usuários de um projeto
router.get('/:id/usuarios', gerenteProjetoController.getUsuariosProjeto); // Listar todos os usuários de um projeto
router.get('/:projetoId/usuarios/com-tarefas', gerenteProjetoController.getUsuariosComTarefa); // Listar usuários sem tarefas em um projeto

module.exports = router;
