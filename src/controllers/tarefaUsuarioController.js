const tarefaUsuarioService = require('../services/tarefaUsuarioService');
const HttpError = require("../utils/customError/httpError");

// Controller to create a Tarefa_Usuario
exports.create = async (req, res, next) => {
    try {
        const newTarefaUsuario = await tarefaUsuarioService.create(req.body);
        res.status(201).json(newTarefaUsuario);
    } catch (error) {
        next(error);
    }
};

// Controller to get all Tarefa_Usuarios
exports.getAll = async (req, res, next) => {
    try {
        const tarefaUsuarios = await tarefaUsuarioService.getAll();
        res.status(200).json(tarefaUsuarios);
    } catch (error) {
        next(error);
    }
};

// Controller to get a Tarefa_Usuario by ID
exports.getById = async (req, res, next) => {
    try {
        const tarefaUsuario = await tarefaUsuarioService.getById(req.params.id);
        res.status(200).json(tarefaUsuario);
    } catch (error) {
        next(error);
    }
};

// Controller to delete a Tarefa_Usuario by ID
exports.deleteById = async (req, res, next) => {
    try {
        await tarefaUsuarioService.deleteById(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Controller to update a Tarefa_Usuario by ID
exports.update = async (req, res, next) => {
    try {
        const updatedTarefaUsuario = await tarefaUsuarioService.update(req.params.id, req.body);
        res.status(200).json(updatedTarefaUsuario);
    } catch (error) {
        next(error);
    }
};
