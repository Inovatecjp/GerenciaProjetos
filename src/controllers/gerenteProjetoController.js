const { where } = require('sequelize');
const db = require('../sequelize/models/index');
const ProjetoUsuario = db.Projeto_Usuario;
const Tarefa = db.Tarefa;
const User = db.User;
const Categoria = db.Categoria;
const Tarefa_Usuario = db.Tarefa_Usuario;

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
 // Lista usuários que não têm uma tarefa atribuída
async getUsuariosSemTarefa(req, res) {
  try {
    const projetoId = req.params.projetoId;

    // Encontre todos os usuários relacionados ao projeto via ProjetoUsuario
    const usuariosNoProjeto = await ProjetoUsuario.findAll({
      where: { projeto_id: projetoId },
      attributes: ['user_id'],
    });

    // Extraindo apenas os IDs dos usuários no projeto
    const idsUsuariosNoProjeto = usuariosNoProjeto.map(u => u.user_id);

    // Pegue as categorias do projeto
    const categoriasDoProjeto = await Categoria.findAll({
      where: { projeto_id: projetoId },
      attributes: ['id'],
    });

    // Extraindo os IDs das categorias
    const idsCategorias = categoriasDoProjeto.map(c => c.id);

    // Pegue as tarefas vinculadas a essas categorias
    const tarefasDoProjeto = await Tarefa.findAll({
      where: {
        categoria_id: idsCategorias,
      },
      attributes: ['id'],
    });

    // Extraindo os IDs das tarefas
    const idsTarefas = tarefasDoProjeto.map(t => t.id);

    // Pegue os usuários que têm tarefas associadas a essas tarefas
    const usuariosComTarefa = await Tarefa_Usuario.findAll({
      where: {
        tarefa_id: idsTarefas,
      },
      attributes: ['user_id'],
    });
    console.log(usuariosComTarefa)
    // Extraindo apenas os IDs dos usuários com tarefas
    const idsUsuariosComTarefa = usuariosComTarefa.map(ut => ut.user_id);
    console.log(idsUsuariosComTarefa)

    // Filtrando os usuários que não têm tarefas
    const usuariosSemTarefa = usuariosNoProjeto.filter(
      user => !idsUsuariosComTarefa.includes(user.user_id)
    );

    const userinfo = await Promise.all(usuariosSemTarefa.map(async t => {
      return await User.findByPk(t.user_id); // use user_id aqui
    }));

    res.json(userinfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao buscar os usuários sem tarefas.' });
  }
}


async gettarefadata(req, res) {
  try {
    const idUsuario = req.params.id; // ID do usuário

    // Buscando as tarefas que o usuário tem
    const usuariosTarefa = await Tarefa_Usuario.findAll({
      where: { user_id: idUsuario },
      attributes: ['tarefa_id']
    });

    // Extraindo os IDs das tarefas
    const tarefasIds = usuariosTarefa.map(t => t.tarefa_id);

    // Buscando as tarefas com base nos IDs
    const usuariosComTarefa = await Tarefa.findAll({
      where: { id: { [db.Sequelize.Op.in]: tarefasIds } }
    });

    // Para cada tarefa, buscar a categoria e o projeto_id associado
    const tarefasComProjeto = await Promise.all(usuariosComTarefa.map(async t => {
      const categoria = await Categoria.findByPk(t.categoria_id);
      return {
        tarefa: t,
        projeto_id: categoria.projeto_id // Pegando o projeto_id da categoria
      };
    }));

    return res.json(tarefasComProjeto);
  } catch (error) {
    console.error('Erro ao obter tarefas e projetos do usuário:', error.message);
    return res.status(500).json({ error: 'Erro ao obter tarefas e projetos do usuário' });
  }
}
  // Lista usuários que não têm uma tarefa atribuída
  async getUsuariosSemTarefa1(req, res) {
    try {
      const idUsuario = req.params.id; // ID do usuário
      const idprojeto = req.body.project_id; // ID do usuário
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

      // Buscando as tarefas que o usuário tem
      const usuariosTarefa = await Tarefa_Usuario.findAll({
        where: { user_id: idUsuario },
        attributes: ['tarefa_id']
      });
  
      // Extraindo os IDs das tarefas
      const tarefasIds = usuariosTarefa.map(t => t.tarefa_id);
  
      // Buscando as tarefas com base nos IDs
      const usuariosComTarefa = await Tarefa.findAll({
        where: { id: { [db.Sequelize.Op.in]: tarefasIds },
        categoria_id:{ [db.Sequelize.Op.in]: categoriaIds }}
      });
  
      // Para cada tarefa, buscar a categoria e o projeto_id associado

  
      return res.json(usuariosComTarefa);
    } catch (error) {
      console.error('Erro ao obter tarefas e projetos do usuário:', error.message);
      return res.status(500).json({ error: 'Erro ao obter tarefas e projetos do usuário' });
    }
  }
  // Atribui um usuário a uma tarefa
  async atribuirUsuarioATarefa(req, res) {
    try {
      const tarefaId = req.params.id;
      const { user_id } = req.body;

      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      const obj = Tarefa_Usuario.create({
        user_id:user_id,
        tarefa_id:tarefaId

      })
      

      return res.json({ message: 'Usuário atribuído à tarefa com sucesso', tarefa });
    } catch (error) {
      console.error('Erro ao atribuir usuário à tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao atribuir usuário à tarefa' });
    }
  }
}

module.exports = new GerenteProjetoController();
