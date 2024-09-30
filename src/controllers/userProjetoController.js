const db = require('../sequelize/models/index');
const Tarefa = db.Tarefa;
const Comentario = db.Comentario;

class UserProjetoController {
  // Atualiza a categoria de uma tarefa
  async atualizarCategoriaTarefa(req, res) {
    try {
      const tarefaId = req.params.id;
      const { categoria_id } = req.body;

      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      tarefa.categoria_id = categoria_id;
      await tarefa.save();

      return res.json({ message: 'Categoria da tarefa atualizada com sucesso', tarefa });
    } catch (error) {
      console.error('Erro ao atualizar categoria da tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao atualizar categoria da tarefa' });
    }
  }

  // Comentar em uma tarefa
  async comentarEmTarefa(req, res) {
    try {
      const tarefaId = req.params.id;
      const { texto, usuario_id } = req.body;

      const comentario = await Comentario.create({
        tarefa_id: tarefaId,
        usuario_id: usuario_id,
        texto: texto,
      });

      return res.json({ message: 'Comentário adicionado à tarefa com sucesso', comentario });
    } catch (error) {
      console.error('Erro ao comentar em tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao comentar em tarefa' });
    }
  }
}

module.exports = new UserProjetoController();
