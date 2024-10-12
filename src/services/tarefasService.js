const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const Tarefa = db.Tarefa;
const Categoria = db.Categoria;

// Função para criar uma nova tarefa
const create = async (body) => {
    try {
        console.log(body)
        const novaTarefa = await Tarefa.create({
            id: uuidv4(),
            descricao: body.descricao,
            data_inicio: body.data_inicio,
            data_fim: body.data_fim,
            title: body.title,
            projeto_id: body.projeto_id,
            responsavel_id: body.responsavel_id,
            categoria_id:body.categoria_id,
            status: 0,
        });

        return { novaTarefa };
    } catch (err) {
        console.error('Erro ao criar tarefa:', err);
        throw new HttpError(404, "Não foi possível criar a tarefa");
    }
};

// Função para deletar uma tarefa por ID
const deleteTarefa = async (id) => {
    try {
        const tarefa = await Tarefa.findOne({ where: { id } });

        if (!tarefa) {
            throw new HttpError(404, "Tarefa não encontrada");
        }

        await tarefa.destroy();

        return true;
    } catch (err) {
        console.error('Erro ao deletar tarefa:', err.message);
        throw err;
    }
};

// Função para obter todas as tarefas
const getAllTarefas = async () => {
    try {
        const tarefas = await Tarefa.findAll();
        return tarefas;
    } catch (err) {
        console.error('Erro ao obter todas as tarefas:', err.message);
        throw err;
    }
};

// Função para obter uma tarefa por ID
const getTarefa = async (id) => {
    try {
        const tarefa = await Tarefa.findOne({ where: { id } });

        if (!tarefa) {
            throw new HttpError(404, "Tarefa não encontrada");
        }

        return tarefa;
    } catch (err) {
        console.error('Erro ao obter tarefa:', err.message);
        throw err;
    }
};

// Função para atualizar uma tarefa por ID
const updateTarefa = async (id, body) => {
    try {
        const tarefa = await getTarefa(id);

        // Desestruturação para evitar a atualização de campos não permitidos
        const { id: taskId, createdAt, updatedAt, ...dataUpdate } = body;
        dataUpdate.updatedAt = new Date();

        await tarefa.update(dataUpdate);

        return tarefa;
    } catch (err) {
        console.error('Erro ao atualizar tarefa:', err.message);
        throw err;
    }
};
const filterTarefasByDate = async (dataInicio, prazo, idprojeto) => {
    try {
        // Cria um objeto de condições dinâmico para a consulta
        const whereConditions = {};
        console.log(idprojeto)
        // Busca as categorias relacionadas ao projeto
        const categorias = await Categoria.findAll({
            where: {
                projeto_id: idprojeto
            },
            attributes: ['id']
        });

        // Verifica se encontrou categorias; se não, retorna uma lista vazia de tarefas
        if (categorias.length === 0) {
            return []; // Retorna lista vazia, pois não há categorias para o projeto
        }

        // Extraindo os IDs das categorias
        const categoriaIds = categorias.map(c => c.id);

        // Adiciona a condição de categoria
        whereConditions.categoria_id = { [db.Sequelize.Op.in]: categoriaIds };

        // Se ambas as datas forem fornecidas, pesquisa no intervalo
        if (dataInicio && prazo) {
            whereConditions.createdAt = { [db.Sequelize.Op.gte]: dataInicio }; // Tarefas com data_inicio maior ou igual a dataInicio
            whereConditions.data_fim = { [db.Sequelize.Op.lte]: prazo }; // Tarefas com data_fim menor ou igual ao prazo
        } else if (dataInicio) {
            // Se apenas dataInicio for fornecida, pesquisa por data_inicio maior ou igual a dataInicio
            whereConditions.createdAt = { [db.Sequelize.Op.gte]: dataInicio };
        } else if (prazo) {
            // Se apenas o prazo for fornecido, pesquisa por tarefas com data_fim menor ou igual ao prazo
            whereConditions.data_fim = { [db.Sequelize.Op.lte]: prazo };
        }

        // Busca todas as tarefas que correspondem às condições
        const tarefas = await Tarefa.findAll({
            where: whereConditions,
        });

        return tarefas;
    } catch (err) {
        console.error('Erro ao filtrar tarefas por data:', err.message);
        throw err;
    }
};

// Função para filtrar tarefas por responsável
const filterTarefasByResponsavel = async (responsavelId, projetoID) => {
    try {
        // Busca as categorias relacionadas ao projeto
        const categorias = await Categoria.findAll({
            where: {
                projeto_id: projetoID,
            },
            attributes: ['id'] // Pegamos apenas os IDs das categorias
        });

        // Se não houver categorias para o projeto, retorne uma lista vazia
        if (categorias.length === 0) {
            return [];
        }

        // Extraindo os IDs das categorias
        const categoriaIds = categorias.map(c => c.id);

        // Busca todas as tarefas que correspondem ao ID do responsável e ao projeto (categorias associadas)
        const tarefas = await Tarefa.findAll({
            where: {
                responsavel_id: responsavelId,
                categoria_id: { [db.Sequelize.Op.in]: categoriaIds }
            },
        });

        return tarefas;
    } catch (err) {
        console.error('Erro ao filtrar tarefas por responsável e projeto:', err.message);
        throw err;
    }
};
const tarefasService = {
    create,
    deleteTarefa,
    getAllTarefas,
    getTarefa,
    updateTarefa,
    filterTarefasByDate,
    filterTarefasByResponsavel,
};

module.exports = tarefasService;
