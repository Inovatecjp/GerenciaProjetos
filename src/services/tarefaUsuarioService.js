const { where } = require('sequelize');
const db = require('../sequelize/models/index');
const Tarefa_Usuario = db.Tarefa_Usuario;
const HttpError = require("../utils/customError/httpError");

// Create a new Tarefa_Usuario
exports.create = async (data) => {
    try {
        const newTarefaUsuario = await Tarefa_Usuario.create(data);
        return newTarefaUsuario;
    } catch (error) {
        console.log(error)
        throw new HttpError(400, "Erro ao criar a relação Tarefa_Usuario.");
    }
};

// Get all Tarefa_Usuario records
exports.getAll = async () => {
    try {
        return await Tarefa_Usuario.findAll();
    } catch (error) {
        throw new HttpError(400, "Erro ao buscar todas as relações Tarefa_Usuario.");
    }
};

// Get a Tarefa_Usuario by ID
exports.getById = async (id) => {
    try {
        const tarefaUsuario = await Tarefa_Usuario.findByPk(id);
        if (!tarefaUsuario) throw new HttpError(404, "Relação Tarefa_Usuario não encontrada.");
        return tarefaUsuario;
    } catch (error) {
        throw new HttpError(400, "Erro ao buscar a relação Tarefa_Usuario.");
    }
};
exports.getByIdtarefa = async (id) => {
    try {
        const tarefaUsuario = await Tarefa_Usuario.findAll({
            where:{
                tarefa_id:id
            }
        });
        if (!tarefaUsuario) throw new HttpError(404, "Relação Tarefa_Usuario não encontrada.");
        return tarefaUsuario;
    } catch (error) {
        throw new HttpError(400, "Erro ao buscar a relação Tarefa_Usuario.");
    }
};
// Delete a Tarefa_Usuario by ID
exports.deleteById = async (id) => {
    try {
        const tarefaUsuario = await Tarefa_Usuario.findByPk(id);
        if (!tarefaUsuario) throw new HttpError(404, "Relação Tarefa_Usuario não encontrada.");
        await tarefaUsuario.destroy();
        return;
    } catch (error) {
        throw new HttpError(400, "Erro ao deletar a relação Tarefa_Usuario.");
    }
};

// Update a Tarefa_Usuario by ID
exports.update = async (id, data) => {
    try {
        const tarefaUsuario = await Tarefa_Usuario.findByPk(id);
        if (!tarefaUsuario) throw new HttpError(404, "Relação Tarefa_Usuario não encontrada.");
        await tarefaUsuario.update(data);
        return tarefaUsuario;
    } catch (error) {
        throw new HttpError(400, "Erro ao atualizar a relação Tarefa_Usuario.");
    }
};
