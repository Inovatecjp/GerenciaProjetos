const db = require('../sequelize/models');
const Meta = db.Metas;

class MetaService {
  // Listar todas as metas
  async listarMetas(data) {
    try {
      const whereClause = data && data.projeto_id ? { projeto_id: data.projetoId } : {};
      return await Meta.findAll({
        where: whereClause,
        include: [
          { model: db.Tarefa, as: 'tarefas' }
        ]
      });
    } catch (error) {
      console.error('Erro ao listar metas:', error.message);
      throw new Error('Erro ao listar metas');
    }
  }

  // Obter uma meta específica
  async obterMeta(id) {
    try {
      const meta = await Meta.findByPk(id, {
        include: [
          { model: db.Projeto, as: 'projeto' },
          { model: db.Tarefa, as: 'tarefas' }
        ]
      });
      return meta;
    } catch (error) {
      console.error('Erro ao obter meta:', error.message);
      throw new Error('Erro ao obter meta');
    }
  }
  async obterMeta(id) {
    try {
      const meta = await Meta.findByPk(id, {
        include: [
          { model: db.Projeto, as: 'projeto' },
          { model: db.Tarefa, as: 'tarefas' }
        ]
      });
      return meta;
    } catch (error) {
      console.error('Erro ao obter meta:', error.message);
      throw new Error('Erro ao obter meta');
    }
  }

  // Criar uma nova meta
  async criarMeta(dados) {
    try {
      if (!dados.title || !dados.describe || !dados.projeto_id) {
        throw new Error('Dados insuficientes para criar a meta');
      }
      return await Meta.create(dados);
    } catch (error) {
      console.error('Erro ao criar meta:', error.message);
      throw new Error('Erro ao criar meta');
    }
  }

  // Atualizar uma meta
  async atualizarMeta(id, dados) {
    try {
      const meta = await Meta.findByPk(id);
      if (!meta) {
        throw new Error('Meta não encontrada');
      }

      return await meta.update(dados);
    } catch (error) {
      console.error('Erro ao atualizar meta:', error.message);
      throw new Error('Erro ao atualizar meta');
    }
  }

  // Excluir uma meta
  async excluirMeta(id) {
    try {
      const meta = await Meta.findByPk(id);
      if (!meta) {
        throw new Error('Meta não encontrada');
      }
      await meta.destroy();
      return true;
    } catch (error) {
      console.error('Erro ao excluir meta:', error.message);
      throw new Error('Erro ao excluir meta');
    }
  }
}

module.exports = new MetaService();
