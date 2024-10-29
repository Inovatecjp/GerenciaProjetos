const metaService = require('../services/metaService');

class MetaController {
  // Listar todas as metas
  async listarMetas(req, res) {
    try {
      const metas = await metaService.listarMetas();
      res.json(metas);
    } catch (error) {
      console.error('Erro ao listar metas:', error.message);
      res.status(500).json({ error: 'Erro ao listar metas' });
    }
  }

  // Obter uma meta específica
  async obterMeta(req, res) {
    try {
      const { id } = req.params;
      const meta = await metaService.obterMeta(id);
      if (!meta) {
        return res.status(404).json({ error: 'Meta não encontrada' });
      }
      res.json(meta);
    } catch (error) {
      console.error('Erro ao obter meta:', error.message);
      res.status(500).json({ error: 'Erro ao obter meta' });
    }
  }

  // Criar uma nova meta
  async criarMeta(req, res) {
    try {
      const novaMeta = await metaService.criarMeta(req.body);
      res.status(201).json(novaMeta);
    } catch (error) {
      console.error('Erro ao criar meta:', error.message);
      res.status(500).json({ error: 'Erro ao criar meta' });
    }
  }

  // Atualizar uma meta
  async atualizarMeta(req, res) {
    try {
      const { id } = req.params;
      const metaAtualizada = await metaService.atualizarMeta(id, req.body);
      if (!metaAtualizada) {
        return res.status(404).json({ error: 'Meta não encontrada' });
      }
      res.json(metaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar meta:', error.message);
      res.status(500).json({ error: 'Erro ao atualizar meta' });
    }
  }

  // Excluir uma meta
  async excluirMeta(req, res) {
    try {
      const { id } = req.params;
      const excluida = await metaService.excluirMeta(id);
      if (!excluida) {
        return res.status(404).json({ error: 'Meta não encontrada' });
      }
      res.json({ message: 'Meta excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir meta:', error.message);
      res.status(500).json({ error: 'Erro ao excluir meta' });
    }
  }
}

module.exports = new MetaController();
