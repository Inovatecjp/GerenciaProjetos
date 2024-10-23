const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');
const { where } = require('sequelize');

const Projeto = db.Projeto;
const Categoria = db.Categoria;
const Tarefa = db.Tarefa;
const Comentario = db.Comentario;
const Projeto_Usuario = db.Projeto_Usuario;
const Tarefa_Usuario = db.Tarefa_Usuario;

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
  try {
    const projeto = await Projeto.findOne({ where: { id } });

    if (!projeto) {
      throw new HttpError(404, "Projeto não encontrado.");
    }

    await projeto.destroy();
    return true;
  } catch (err) {
    console.error('Erro ao deletar projeto:', err.message);
    throw err;
  }
};

// Função para obter todos os projetos
const getAllProjetos = async () => {
  try {
    const projetos = await Projeto.findAll();
    return projetos;
  } catch (err) {
    console.error('Erro ao obter todos os projetos:', err.message);
    throw err;
  }
};

// Função para obter um projeto por ID
const getProjeto = async (id) => {
  try {
    const projeto = await Projeto.findOne({ where: { id } });

    if (!projeto) {
      throw new HttpError(404, "Projeto não encontrado.");
    }

    return projeto;
  } catch (err) {
    console.error('Erro ao obter projeto:', err.message);
    throw err;
  }
};

// Função para atualizar um projeto por ID
const updateProjeto = async (id, body) => {
  try {
    const projeto = await getProjeto(id);

    // Desestruturação para evitar atualização de campos não permitidos
    const { id: projectId, createdAt, updatedAt, ...dataUpdate } = body;
    dataUpdate.updatedAt = new Date();

    await projeto.update(dataUpdate);

    return projeto;
  } catch (err) {
    console.error('Erro ao atualizar projeto:', err.message);
    throw err;
  }
};
let instance = null; // Define instance at the top of the file or function

const getProjetoFist = async () => {
  try {
    if (!instance) {
      const Projetos = (await Projeto.findAll())[0]; // Await the query and access the first result

      if (!Projetos) {
        throw new Error('Perfil não encontrado');
      }

      instance = Projetos; // Save the fetched object in the instance
    }

    return instance;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Função para buscar projeto por ID
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

// Função para buscar os comentários associados a uma tarefa através de Tarefa_Usuario
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

// Função para buscar membros responsáveis por uma tarefa
const getResponsaveisByTarefa = async (tarefaId) => {
  const responsaveis = await Tarefa_Usuario.findAll({
    where: { tarefa_id: tarefaId },
    include: [{ model: db.User, as: 'user' }],
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

// Função para buscar detalhes de uma tarefa, incluindo comentários e membros
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

// Função para buscar tarefas detalhadas de cada categoria
const getCategoryWithTasks = async (categoria) => {
  const tarefas = await getTarefasByCategoria(categoria.id);
  const tasksWithDetails = await Promise.all(
    tarefas.map((tarefa) => getTaskDetails(tarefa))
  );

  return {
    name: categoria.title,
    description: categoria.descricao,
    id: categoria.id,
    tasks: tasksWithDetails,
  };
};

// Função para buscar usuários de um projeto e separar membros e gerentes
const getProjetoUsuarios = async (projetoId) => {
  const projetoUsuarios = await Projeto_Usuario.findAll({
    where: { projeto_id: projetoId },
    attributes: ['id', 'funcao', 'data_inicio', 'data_fim', 'status', 'salario', 'projeto_id', 'user_id', 'profile_id'],
    include: [
      {
        model: db.User,
        as: 'usuario',
      },
      {
        model: db.Profile,
        as: 'profile',
      },
    ],
  });

  const members = [
    ...new Map(
      projetoUsuarios.map((projetoUsuario) => [
        projetoUsuario.user_id,
        {
          id: projetoUsuario.user_id,
          name: projetoUsuario.usuario.name,
          description: projetoUsuario.usuario.descricao,
        },
      ])
    ).values(),
  ];

  const managers = [
    ...new Map(
      projetoUsuarios
        .filter((projetoUsuario) => projetoUsuario.profile.name === 'Manager')
        .map((projetoUsuario) => [
          projetoUsuario.user_id,
          {
            id: projetoUsuario.user_id,
            name: projetoUsuario.usuario.name,
          },
        ])
    ).values(),
  ];

  return { members, managers };
};

// Função principal para compor a estrutura completa do projeto
const getProjetoFilter = async (id) => {
  try {
    // Busca o projeto
    const projeto = await getProjeto(id);

    // Busca categorias do projeto
    const categorias = await getCategoriasByProjeto(id);

    // Monta as categorias com as tarefas
    const categoriesWithTasks = await Promise.all(
      categorias.map((categoria) => getCategoryWithTasks(categoria))
    );

    // Busca membros e gerentes do projeto
    const { members, managers } = await getProjetoUsuarios(id);

    // Monta a estrutura final do projeto
    const projectStructure = {
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

    return projectStructure;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};


const projetoService = {
  createProjeto,
  deleteProjeto,
  getAllProjetos,
  getProjeto,
  updateProjeto,
  getProjetoFist,
  getProjetoFilter
};

module.exports = projetoService;
