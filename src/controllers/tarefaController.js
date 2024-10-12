const tarefasService = require('../services/tarefasService.js');

const create = async (req, res) => {
    try {
        const tarefa = await tarefasService.create(req.body);
        res.status(201).json({ data: tarefa, message: "Tarefa criada com sucesso" });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const tarefaId = req.params.id;
        const tarefa = await tarefasService.updateTarefa(tarefaId, req.body);
        res.status(200).json({ data: tarefa, message: "Tarefa atualizada com sucesso" });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await tarefasService.deleteTarefa(req.params.id);
        res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const get = async (req, res) => {
    try {
        const tarefa = await tarefasService.getTarefa(req.params.id);
        res.status(200).json({ data: tarefa, message: "Tarefa obtida com sucesso" });
    } catch (error) {
        console.error('Erro ao obter tarefa:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const tarefas = await tarefasService.getAllTarefas();
        res.status(200).json({ data: tarefas, message: "Lista de tarefas obtida com sucesso" });
    } catch (error) {
        console.error('Erro ao obter lista de tarefas:', error.message);
        res.status(500).json({ error: error.message });
    }
};
// Função para filtrar tarefas por data (data_inicio ou prazo)
const filterByDate = async (req, res) => {
    try {
        console.log(req.body)

        const { data_inicio, data_fim } = req.query;
        const { project_id } = req.body;

        // Chama o serviço para filtrar as tarefas
        const tarefas = await tarefasService.filterTarefasByDate(data_inicio, data_fim,project_id);

        res.status(200).json({ data: tarefas, message: "Tarefas filtradas por data com sucesso" });
    } catch (error) {
        console.error('Erro ao filtrar tarefas por data:', error);
        res.status(500).json({ error: error.message });
    }
};

// Função para filtrar tarefas por responsável
const filterByResponsavel = async (req, res) => {
    try {
        const { responsavel_id } = req.query;
        const { project_id } = req.body;
        console.log(req.body)
        // Verifica se o parâmetro responsavel_id foi fornecido
        if (!responsavel_id) {
            return res.status(400).json({ error: "Parâmetro 'responsavel_id' é obrigatório" });
        }

        // Chama o serviço para filtrar as tarefas pelo ID do responsável
        const tarefas = await tarefasService.filterTarefasByResponsavel(responsavel_id,project_id);

        res.status(200).json({ data: tarefas, message: "Tarefas filtradas por responsável com sucesso" });
    } catch (error) {
        console.error('Erro ao filtrar tarefas por responsável:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const tarefaController = {
    create,
    getAll,
    get,
    remove,
    update,
    filterByDate,
    filterByResponsavel,
};


module.exports = tarefaController;
