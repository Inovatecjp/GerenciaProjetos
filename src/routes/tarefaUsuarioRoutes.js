const express = require('express');
const router = express.Router();
const tarefaUsuarioController = require('../controllers/tarefaUsuarioController');

// Route to create a new Tarefa_Usuario
router.post('/', tarefaUsuarioController.create);

// Route to get all Tarefa_Usuario records
router.get('/', tarefaUsuarioController.getAll);

// Route to get a specific Tarefa_Usuario by ID
router.get('/:id', tarefaUsuarioController.getById);

// Route to update a Tarefa_Usuario by ID
router.put('/:id', tarefaUsuarioController.update);

// Route to delete a Tarefa_Usuario by ID
router.delete('/:id', tarefaUsuarioController.deleteById);

module.exports = router;
