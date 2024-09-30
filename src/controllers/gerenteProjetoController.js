const db = require('../sequelize/models/index');
const ProjetoUsuario = db.ProjetoUsuario;
const Tarefa = db.Tarefa;
const User = db.User;

class GerenteProjetoController {
  // Lista todos os usuários de um projeto
  async getUsuariosProjeto(req, res) {
    try {
      const projetoId = req.params.projetoId;
      const usuarios = await ProjetoUsuario.findAll({
        where: { projeto_id: projetoId },
        include: [{ model: User, as: 'usuario' }]
      });

      return res.json(usuarios);
    } catch (error) {
      console.error('Erro ao obter usuários do projeto:', error.message);
      return res.status(500).json({ error: 'Erro ao obter usuários do projeto' });
    }
  }

  // Lista usuários que não têm uma tarefa atribuída
  async getUsuariosSemTarefa(req, res) {
    try {
      const projetoId = req.params.projetoId;
      const usuariosComTarefa = await Tarefa.findAll({
        where: { projeto_id: projetoId },
        attributes: ['responsavel_id']
      });

      const responsaveis = usuariosComTarefa.map(t => t.responsavel_id);

      const usuariosSemTarefa = await ProjetoUsuario.findAll({
        where: { projeto_id: projetoId, usuario_id: { [db.Sequelize.Op.notIn]: responsaveis } },
        include: [{ model: User, as: 'usuario' }]
      });

      return res.json(usuariosSemTarefa);
    } catch (error) {
      console.error('Erro ao obter usuários sem tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao obter usuários sem tarefa' });
    }
  }

  // Atribui um usuário a uma tarefa
  async atribuirUsuarioATarefa(req, res) {
    try {
      const tarefaId = req.params.id;
      const { responsavel_id } = req.body;

      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      tarefa.responsavel_id = responsavel_id;
      await tarefa.save();

      return res.json({ message: 'Usuário atribuído à tarefa com sucesso', tarefa });
    } catch (error) {
      console.error('Erro ao atribuir usuário à tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao atribuir usuário à tarefa' });
    }
  }
}

module.exports = new GerenteProjetoController();
