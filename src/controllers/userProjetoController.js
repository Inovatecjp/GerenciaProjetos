const { where } = require('sequelize');
const db = require('../sequelize/models/index');
const Tarefa = db.Tarefa;
const Comentario = db.Comentario;
const tarefaUsuarioService = require('../services/tarefaUsuarioService');
const userService = require('../services/userService');

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
      const { texto } = req.body;
      const { id } = req.userInfo;
      
      const obj = {user_id:id,tarefa_id:tarefaId}
      const newobj = tarefaUsuarioService.create(obj)
      const comentario = await Comentario.create({
        tarefa_user_id: newobj.id,
        texto:texto
      });

      return res.json({ message: 'Comentário adicionado à tarefa com sucesso', comentario });
    } catch (error) {
      console.error('Erro ao comentar em tarefa:', error.message);
      return res.status(500).json({ error: 'Erro ao comentar em tarefa' });
    }
  }
  async getcomentarEmTarefa(req, res) {
    try {
      const tarefaId = req.params.id;
  
      // Get all task-user relations based on task id
      const newobjs = await tarefaUsuarioService.getByIdtarefa(tarefaId);
      console.log(newobjs)
      // Map over newobjs to fetch users asynchronously
      const results = await Promise.all(newobjs.map(async t => {
        const user = await userService.getUser(t.user_id);
        const comentarios = await Comentario.findAll({
          where: {
            tarefa_user_id: t.id, // Using array of IDs for search
          }
        });
        if (comentarios.length > 0) {
          let newcomt = await comentarios.map(c =>{
            return {comentarios:c, username:user.name,IdUser:user.id}
          })
          return { data:newcomt };
        }
        return null}));
  
      // Get all comments for the task-user relations
      const usersWithComments = results.filter(result => result !== null);

      // Send the results
      res.json({
        tarefaId: tarefaId,
        usersWithComments: usersWithComments, // Contains only users with comments
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  
}

module.exports = new UserProjetoController();
