const projetoService = require("../services/projetoService.js");
const UserService = require("../services/userService.js");
const db = require("../sequelize/models/index");
const { where } = require("sequelize");
const { Tarefa, Tarefa_Usuario, User, Categoria } = db;

class GerenteProjetoController {
  // Lista todos os usuários de um projeto
  async getUsuariosProjeto(req, res) {
    try {
      const projetoId = req.params.id;

      // Obter todos os usuários do projeto e garantir que seja um array
      const usersDoProjeto =
        (await projetoService.getProjetoUsuarios(projetoId, true)) || [];
      // Verifica se `usersDoProjeto` é realmente um array

      // Obter as categorias e tarefas associadas ao projeto
      const categorias = await projetoService.getCategoriasByProjeto(projetoId);
      const getTask = await projetoService.getListCategoriesWithTasks(
        categorias
      );

      // Contar ocorrências de usuários nas tarefas
      const ocorrenciasUsuarios =
        projetoService.contarOcorrenciasDeUsuarios(getTask);

      // Garantir que todos os usuários do projeto estejam na contagem
      usersDoProjeto.forEach((user) => {
        if (!ocorrenciasUsuarios[user.id]) {
          ocorrenciasUsuarios[user.id] = {
            name: user.name,
            count: 0,
            funcao: user.funcao,
            role: user.role,
          }; // Usuário sem tarefas
        } else {
          ocorrenciasUsuarios[user.id].funcao = user.funcao;
          ocorrenciasUsuarios[user.id].role = user.role;
        }
      });

      return res.json(ocorrenciasUsuarios);
    } catch (error) {
      console.error("Erro ao obter usuários do projeto:", error.message);
      return res
        .status(500)
        .json({ error: "Erro ao obter usuários do projeto" });
    }
  }

  // Lista usuários que têm uma tarefa atribuída a partir de um ID de tarefa
  async getUsuariosComTarefa(req, res) {
    try {
      const tarefaId = req.params.tarefaId;
      const usuariosComTarefa = await Tarefa_Usuario.findAll({
        where: { tarefa_id: tarefaId },
        attributes: ["user_id"],
        include: [{ model: User, as: "usuario" }],
      });

      return res.json(usuariosComTarefa);
    } catch (error) {
      console.error("Erro ao buscar usuários com tarefa:", error.message);
      return res
        .status(500)
        .json({ error: "Erro ao buscar usuários com tarefa." });
    }
  }

  // Obter tarefas e projetos associados a um usuário
  async gettarefadata(req, res) {
    try {
      const idUsuario = req.params.id;
      const usuariosTarefa = await Tarefa_Usuario.findAll({
        where: { user_id: idUsuario },
        attributes: ["tarefa_id"],
      });

      const tarefasIds = usuariosTarefa.map((t) => t.tarefa_id);
      const usuariosComTarefa = await Tarefa.findAll({
        where: { id: { [db.Sequelize.Op.in]: tarefasIds } },
      });

      const tarefasComProjeto = await Promise.all(
        usuariosComTarefa.map(async (t) => {
          const categoria = await Categoria.findByPk(t.categoria_id);
          return {
            tarefa: t,
            projeto_id: categoria.projeto_id,
          };
        })
      );

      return res.json(tarefasComProjeto);
    } catch (error) {
      console.error(
        "Erro ao obter tarefas e projetos do usuário:",
        error.message
      );
      return res
        .status(500)
        .json({ error: "Erro ao obter tarefas e projetos do usuário" });
    }
  }

  // Lista usuários que não têm uma tarefa atribuída em um projeto
  async getUsuariosSemTarefa(req, res) {
    try {
      const { projetoId } = req.params;

      const usuariosProjeto = await projetoService.getProjetoUsuarios(
        projetoId,
        true
      );
      const usuariosComTarefa = await Tarefa_Usuario.findAll({
        where: {
          tarefa_id: {
            [db.Sequelize.Op.in]: usuariosProjeto.members.map((m) => m.id),
          },
        },
        attributes: ["user_id"],
        group: ["user_id"],
      });

      const idsUsuariosComTarefa = usuariosComTarefa.map((ut) => ut.user_id);
      const usuariosSemTarefa = usuariosProjeto.members.filter(
        (usuario) => !idsUsuariosComTarefa.includes(usuario.id)
      );

      return res.json(usuariosSemTarefa);
    } catch (error) {
      console.error("Erro ao buscar usuários sem tarefa:", error.message);
      return res
        .status(404)
        .json({ error: "Erro ao buscar usuários sem tarefa." });
    }
  }
  async getCommonIds(tarefasprojeto, usersProjeto) {
    return tarefasprojeto.filter((id) => usersProjeto.includes(id));
  }
  async getTarefaByUsuario(req, res) {
    try {
      const { id } = req.params;
      const { projeto_id } = req.body;

      // Obter IDs de tarefas associadas ao projeto de maneira otimizada
      const tarefasDoProjeto = await projetoService.getTarefasByProjeto(
        projeto_id
      );

      // Obter IDs de tarefas atribuídas ao usuário especificado
      const tarefasUsuario = await Tarefa_Usuario.findAll({
        where: { user_id: id },
        attributes: ["tarefa_id"],
        raw: true, // Adiciona eficiência retornando apenas dados brutos
      });

      const tarefasUsuarioIds = tarefasUsuario.map(
        (tarefa) => tarefa.tarefa_id
      );
      const tarefasComuns = tarefasDoProjeto.filter((tarefaId) =>
        tarefasUsuarioIds.includes(tarefaId)
      );

      const tarefasobj = await Tarefa.findAll({
        where: {
          id: { [db.Sequelize.Op.in]: tarefasComuns },
        },
      });

      return res.json({ commonIds: tarefasobj });
    } catch (error) {
      console.error("Erro ao buscar usuários sem tarefa:", error);
      return res
        .status(404)
        .json({ error: "Erro ao buscar usuários sem tarefa." });
    }
  }
  async getUsuariosNaTarefa(req, res) {
    try {
      const { tarefaId } = req.params;
      console.log(tarefaId);

      const usuariosComTarefa = await Tarefa_Usuario.findAll({
        where: { tarefa_id: tarefaId },
        attributes: ["user_id"],
      });
      console.log("--=-=-===-");

      console.log(usuariosComTarefa);
      console.log("--=-=-===-");
      const idsUsuariosComTarefa = await usuariosComTarefa.map(
        (ut) => ut.user_id
      );
      const usuariosComTarefaInfo = await UserService.getUserList(
        idsUsuariosComTarefa
      );
      return res.json(usuariosComTarefaInfo);
    } catch (error) {
      console.error("Erro ao buscar usuários sem tarefa:", error);
      return res
        .status(404)
        .json({ error: "Erro ao buscar usuários sem tarefa." });
    }
  }

  // Atribuir um usuário a uma tarefa
  async atribuirUsuarioATarefa(req, res) {
    try {
      const tarefaId = req.params.id;
      const { user_id } = req.body;

      const tarefa = await Tarefa.findByPk(tarefaId);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }

      await Tarefa_Usuario.create({ user_id, tarefa_id: tarefaId });
      return res.json({ message: "Usuário atribuído à tarefa com sucesso" });
    } catch (error) {
      console.error("Erro ao atribuir usuário à tarefa:", error.message);
      return res
        .status(500)
        .json({ error: "Erro ao atribuir usuário à tarefa" });
    }
  }
}

module.exports = new GerenteProjetoController();
