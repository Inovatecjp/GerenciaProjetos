const db = require('../sequelize/models');
const Meta = db.Meta;

class MetaService {
  // Listar todas as metas
  async listarMetas() {
    return await Meta.findAll({
      include: [
        { model: db.Projeto, as: 'projeto' },
        { model: db.Tarefa, as: 'tarefas' }
      ]
    });
  }

  // Obter uma meta específica
  async obterMeta(id) {
    return await Meta.findByPk(id, {
      include: [
        { model: db.Projeto, as: 'projeto' },
        { model: db.Tarefa, as: 'tarefas' }
      ]
    });
  }

  // Criar uma nova meta
  async criarMeta(dados) {
    return await Meta.create(dados);
  }

  // Atualizar uma meta
  async atualizarMeta(id, dados) {
    const meta = await Meta.findByPk(id);
    if (!meta) return null;
    return await meta.update(dados);
  }

  // Excluir uma meta
  async excluirMeta(id) {
    const meta = await Meta.findByPk(id);
    if (!meta) return null;
    await meta.destroy();
    return true;
  }
}

module.exports = new MetaService();
