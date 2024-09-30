const express = require('express');
const tarefaController = require('../controllers/tarefaController.js');
const projetoUsuarioController = require('../controllers/userProjetoController.js');
const gerenteProjetoController = require('../controllers/gerenteProjetoController.js');
const { Router } = express;
const AuthMiddleware = require('../middlewares/auth');



const router = Router();


router.post('/', tarefaController.create)
router.get('/', tarefaController.getAll);


router.get('/filter/date', tarefaController.filterByDate);//GET /tarefas/filter/date?data_inicio=2023-09-29&prazo=2023-10-10
router.get('/filter/responsavel', tarefaController.filterByResponsavel);//GET /tarefas/filter/responsavel?responsavel_id=responsavel-uuid


// Rota para atribuir um usuário a uma tarefa

router.put('/:id/atribuir', gerenteProjetoController.atribuirUsuarioATarefa);
// Rota para atualizar categoria da tarefa
router.put('/:id/categoria', projetoUsuarioController.atualizarCategoriaTarefa);

// Rota para comentar em uma tarefa
router.post('/:id/comentarios', projetoUsuarioController.comentarEmTarefa);

router.get('/:id', tarefaController.get);

router.put('/:id', tarefaController.update);
router.delete('/:id', tarefaController.remove);

module.exports = router;