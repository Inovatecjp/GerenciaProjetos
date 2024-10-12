const express = require('express');
const projetoController = require('../controllers/projetoController.js');
const categoriaController = require('../controllers/categoriaController.js');
const gerenteProjetoController = require('../controllers/gerenteProjetoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/authSession.js'); // Caso precise de autenticação

const router = Router();

// Rotas para operações de CRUD de Projeto
router.post('/',  projetoController.create); // Criar projeto
router.get('/', projetoController.getAll); // Listar todos os projetos


router.get('/terefas/:id', categoriaController.getTarefabyidPrjeto); // Obter um projeto específico por ID
router.get('/allinfo/:id', projetoController.getAllInfos); // Obter um projeto específico por ID todas as infos
// Rota para listar todos os usuários de um projeto
router.get('/:projetoId/usuarios', gerenteProjetoController.getUsuariosProjeto);

// Rota para listar usuários sem projeto
router.get('/:projetoId/usuarios/sem-tarefas', gerenteProjetoController.getUsuariosSemTarefa);
router.post('/:projetoId/tarefa/data', gerenteProjetoController.gettarefadata);



router.get('/:id', projetoController.get); // Obter um projeto específico por ID
router.put('/:id', projetoController.update); // Atualizar projeto
router.delete('/:id', projetoController.remove); // Deletar projeto

module.exports = router;
