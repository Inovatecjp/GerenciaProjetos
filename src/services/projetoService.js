const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');
const { Projeto, Categoria, Tarefa, Comentario, Projeto_Usuario, Tarefa_Usuario, User } = db;

// Funções Utilitárias
const contarOcorrenciasDeUsuarios = (data) => {
  // Objeto para armazenar o contador de IDs
  const contador = {};
  // Percorre cada categoria
  data.forEach(categoria => {
    // Percorre cada tarefa dentro da categoria
    categoria.tasks.forEach(tarefa => {
      // Percorre cada membro da tarefa
      tarefa.members.forEach(member => {
        // Incrementa o contador para o ID do usuário
        if (contador[member.id]) {
          contador[member.id].count++;        } 
          else {
          contador[member.id] = {  name: member.name, count: 1 };    
        }
      });
    });
  });

  return contador;
};
// Função para buscar categorias por projeto
const getCategoriasByProjeto = async (projetoId) => {
  return await Categoria.findAll({
    where: { projeto_id: projetoId },
  });
};

// Função para buscar tarefas por categoria
const getTarefasByCategoria = async (categoriaId) => {
  return await Tarefa.findAll({
    where: { categoria_id: categoriaId },
  });
};

// Função para buscar comentários associados a uma tarefa
const getComentariosByTarefaUsuarios = async (tarefaUsuarios) => {
  const comentarios = await Promise.all(
    tarefaUsuarios.map(async (tarefaUsuario) => {
      return await Comentario.findAll({
        where: { tarefa_user_id: tarefaUsuario.id },
      });
    })
  );
  return comentarios.flat();
};

// Função para buscar responsáveis por uma tarefa
const getResponsaveisByTarefa = async (tarefaId) => {
  const responsaveis = await Tarefa_Usuario.findAll({
    where: { tarefa_id: tarefaId },
    include: [{ model: User, as: 'user' }],
  });

  return [
    ...new Map(
      responsaveis.map((responsavel) => [
        responsavel.user_id,
        {
          id: responsavel.user_id,
          name: responsavel.user.name,
          description: responsavel.user.descricao,
        },
      ])
    ).values(),
  ];
};

// Função para buscar detalhes de uma tarefa
const getTaskDetails = async (tarefa) => {
  const tarefaUsuarios = await Tarefa_Usuario.findAll({
    where: { tarefa_id: tarefa.id },
  });

  const comentarios = await getComentariosByTarefaUsuarios(tarefaUsuarios);
  const members = await getResponsaveisByTarefa(tarefa.id);

  const comments = comentarios.map((comentario) => ({
    id: comentario.id,
    comment: comentario.texto,
    date: comentario.createdAt,
  }));

  return {
    name: tarefa.title,
    description: tarefa.descricao,
    id: tarefa.id,
    prazo: tarefa.createdAt,
    members,
    comments,
  };
};
const getTaskDetailsNotComments = async (tarefa) => {

  const members = await getResponsaveisByTarefa(tarefa.id);


  return {
    name: tarefa.title,
    description: tarefa.descricao,
    id: tarefa.id,
    prazo: tarefa.createdAt,
    members,
  };
};
// Função para buscar tarefas detalhadas por categoria
const getCategoryWithTasks = async (categoria) => {
  const tarefas = await getTarefasByCategoria(categoria.id||categoria);
  const tasksWithDetails = await Promise.all(
    tarefas.map((tarefa) => getTaskDetailsNotComments(tarefa))
  );

  return {
    name: categoria.title,
    description: categoria.descricao,
    id: categoria.id,
    tasks: tasksWithDetails,
  };
};

// Função para buscar membros e gerentes do projeto
const getProjetoUsuarios = async (projetoId,all=false) => {
  const projetoUsuarios = await Projeto_Usuario.findAll({
    where: { projeto_id: projetoId },
    attributes: ['user_id'],
    include: [{ model: User, as: 'usuario' }, { model: db.Profile, as: 'profile' }],
  });
if(all){
  const allUsers = projetoUsuarios.map(pu => ({
    id: pu.user_id,
    name: pu.usuario.name,
    description: pu.profile.name === 'Manager' ? undefined : pu.usuario.descricao, // Só inclui 'description' se não for 'Manager'
    role: pu.profile.name,
  }));

  return allUsers;
}
  const members = projetoUsuarios
    .filter(pu => pu.profile.name !== 'Manager')
    .map(pu => ({
      id: pu.user_id,
      name: pu.usuario.name,
      description: pu.usuario.descricao,
    }));

  const managers = projetoUsuarios
    .filter(pu => pu.profile.name === 'Manager')
    .map(pu => ({
      id: pu.user_id,
      name: pu.usuario.name,
    }));

  return { members, managers };
};

// Serviços de Projeto

// Função para criar um novo projeto
const createProjeto = async (body) => {
  if (!body.name || !body.orcamento) {
    throw new HttpError(400, "Nome e orçamento são obrigatórios.");
  }

  try {
    const novoProjeto = await Projeto.create({
      id: uuidv4(),
      name: body.name,
      descricao: body.descricao,
      orcamento: body.orcamento,
      data_inicio: body.data_inicio,
      data_fim: body.data_fim,
      status: body.status || 2,
    });

    return { novoProjeto };
  } catch (err) {
    console.error('Erro ao criar projeto:', err.message);
    throw new HttpError(500, "Não foi possível criar o projeto.");
  }
};

// Função para deletar um projeto por ID
const deleteProjeto = async (id) => {
  const projeto = await Projeto.findOne({ where: { id } });

  if (!projeto) {
    throw new HttpError(404, "Projeto não encontrado.");
  }

  await projeto.destroy();
  return true;
};

// Função para obter todos os projetos
const getAllProjetos = async () => {
  return await Projeto.findAll();
};

// Função para obter um projeto por ID
const getProjeto = async (id) => {
  const projeto = await Projeto.findOne({ where: { id } });

  if (!projeto) {
    throw new HttpError(404, "Projeto não encontrado.");
  }

  return projeto;
};

// Função para atualizar um projeto por ID
const updateProjeto = async (id, body) => {
  const projeto = await getProjeto(id);

  const { id: projectId, createdAt, updatedAt, ...dataUpdate } = body;
  dataUpdate.updatedAt = new Date();

  await projeto.update(dataUpdate);
  return projeto;
};
const getListCategoriesWithTasks = async (cagoriasid) => {
  const categoriesWithTasks =  await Promise.all(
    cagoriasid.map((categoria) => getCategoryWithTasks(categoria))
  );
return categoriesWithTasks
}
// Função para compor a estrutura completa do projeto
const getProjetoFilter = async (id) => {
  console.log('-=-=-=-=-')
  const projeto = await getProjeto(id);
  const categorias = await getCategoriasByProjeto(id);

  const categoriesWithTasks = await Promise.all(
    categorias.map((categoria) => getCategoryWithTasks(categoria))
  );

  const { members, managers } = await getProjetoUsuarios(id);

  return {
    name: projeto.name,
    description: projeto.descricao,
    id: projeto.id,
    status: projeto.status,
    date: projeto.data_inicio,
    deadline: projeto.data_fim,
    categories: categoriesWithTasks,
    members,
    managers,
  };
};

module.exports = {
  createProjeto,
  deleteProjeto,
  getAllProjetos,
  getProjeto,
  updateProjeto,
  getProjetoFilter,
  getCategoriasByProjeto,
  getTarefasByCategoria,
  getTaskDetails,
  getCategoryWithTasks,
  getProjetoUsuarios,
  getListCategoriesWithTasks,
  contarOcorrenciasDeUsuarios
};
