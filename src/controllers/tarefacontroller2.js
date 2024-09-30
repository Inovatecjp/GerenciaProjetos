const db = require('../sequelize/models/index');

const ProjetoUsuario = db.ProjetoUsuario; // Tabela para vincular projetos a usuários
const Tarefa = db.Tarefa; // Tabela de Tarefas
const Comentario = db.Comentario; // Tabela de Comentários
const Categoria = db.Categoria; // Tabela de Categorias
const User = db.User; // Tabela de Usuários

class tarefaController {
  
  // Ver a lista de usuários de um projeto
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

  // Verificar quais usuários não têm tarefa atribuída
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

  // Ver a quantidade de tarefas que o usuário está participando
  async getTarefasPorUsuario(req, res) {
    try {
      const usuarioId = req.params.usuarioId;
      const tarefas = await Tarefa.findAll({
        where: { responsavel_id: usuarioId }
      });

      return res.json({ quantidade: tarefas.length, tarefas });
    } catch (error) {
      console.error('Erro ao obter tarefas por usuário:', error.message);
      return res.status(500).json({ error: 'Erro ao obter tarefas por usuário' });
    }
  }

  // Ver tarefas por categoria
  async getTarefasPorCategoria(req, res) {
    try {
      const categoriaId = req.params.categoriaId;
      const tarefas = await Tarefa.findAll({
        where: { categoria_id: categoriaId }
      });

      return res.json(tarefas);
    } catch (error) {
      console.error('Erro ao obter tarefas por categoria:', error.message);
      return res.status(500).json({ error: 'Erro ao obter tarefas por categoria' });
    }
  }

  // Ver tarefas por data
  async getTarefasPorData(req, res) {
    try {
      const { dataInicio, dataFim } = req.query;
      const tarefas = await Tarefa.findAll({
        where: {
          data_inicio: { [db.Sequelize.Op.gte]: dataInicio },
          prazo: { [db.Sequelize.Op.lte]: dataFim }
        }
      });

      return res.json(tarefas);
    } catch (error) {
      console.error('Erro ao obter tarefas por data:', error.message);
      return res.status(500).json({ error: 'Erro ao obter tarefas por data' });
    }
  }

  // Ver tarefas por responsável (quem criou)
  async getTarefasPorResponsavel(req, res) {
    try {
      const responsavelId = req.params.responsavelId;
      const tarefas = await Tarefa.findAll({
        where: { responsavel_id: responsavelId }
      });

      return res.json(tarefas);
    } catch (error) {
      console.error('Erro ao obter tarefas por responsável:', error.message);
      return res.status(500).json({ error: 'Erro ao obter tarefas por responsável' });
    }
  }

  // Atribuir um usuário a uma tarefa
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

  // Atualizar categoria da tarefa
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

module.exports = new tarefaController();
