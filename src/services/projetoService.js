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
const getProjetoFilter = async (id) => {
  try {
    // Fetch the project by ID
    const projeto = await Projeto.findByPk(id);
    if (!projeto) {
      throw new Error('Projeto não encontrado');
    }

    // Fetch all categories related to the project
    const categorias = await Categoria.findAll({
      where: { projeto_id: id },
    });

    // Fetch all tasks for each category and construct the project structure
    const categoriesWithTasks = await Promise.all(
      categorias.map(async (categoria) => {
        // Fetch tasks associated with the current category
        const tarefas = await Tarefa.findAll({
          where: { categoria_id: categoria.id },
        });

        // Map tasks to the desired structure
        const tasksWithDetails = await Promise.all(
          tarefas.map(async (tarefa) => {
            // Fetch Tarefa_Usuario records associated with the task
            const tarefaUsuarios = await Tarefa_Usuario.findAll({
              where: { tarefa_id: tarefa.id },
            });

            // Fetch comments for each tarefaUsuario
            const comentarios = await Promise.all(
              tarefaUsuarios.map(async (tarefaUsuario) => {
                const comentarios = await Comentario.findAll({
                  where: { tarefa_user_id: tarefaUsuario.id },
                });
                return comentarios;
              })
            ).then((allComments) => allComments.flat());

            // Fetch members responsible for the task using Tarefa_Usuario
            const responsaveis = await Tarefa_Usuario.findAll({
              where: { tarefa_id: tarefa.id },
              include: [{ model: db.User, as: 'user' }],
            });

            // Map members to the expected structure, ensuring uniqueness by user_id
            const uniqueMembers = [
              ...new Map(
                responsaveis.map((responsavel) => [
                  responsavel.user_id,
                  {
                    id: responsavel.user_id,
                    name: responsavel.user.name, // Assuming `User` has `name`
                    description: responsavel.user.descricao, // Assuming `User` has `descricao`
                  },
                ])
              ).values(),
            ];

            // Map comments to the expected structure
            const comments = comentarios.map((comentario) => ({
              id: comentario.id,
              comment: comentario.texto, // Assuming `Comentario` has `texto`
              date: comentario.createdAt, // Assuming `createdAt` is the timestamp
            }));

            // Return the task with its details
            return {
              name: tarefa.title, // Assuming `Tarefa` has `title`
              description: tarefa.descricao, // Assuming `Tarefa` has `descricao`
              id: tarefa.id,
              prazo: tarefa.createdAt, // Assuming `Tarefa` has `prazo`
              members: uniqueMembers,
              comments,
            };
          })
        );

        // Return the category with its tasks
        return {
          name: categoria.title, // Assuming `Categoria` has `title`
          description: categoria.descricao, // Assuming `Categoria` has `descricao`
          id: categoria.id,
          tasks: tasksWithDetails,
        };
      })
    );

    // Fetch members and managers of the project from Projeto_Usuario
    const projetoUsuarios = await Projeto_Usuario.findAll({
      where: { projeto_id: id },
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

    // Map members and managers to the expected structure, ensuring no duplicates
    const members = [
      ...new Map(
        projetoUsuarios
          // .filter((projetoUsuario) => projetoUsuario.profile.name === 'Member') // Assuming `profile` has `name`
          .map((projetoUsuario) => [
            projetoUsuario.user_id,
            {
              id: projetoUsuario.user_id,
              name: projetoUsuario.usuario.name, // Assuming `User` has `name`
              description: projetoUsuario.usuario.descricao, // Assuming `User` has `descricao`
            },
          ])
      ).values(),
    ];

    const managers = [
      ...new Map(
        projetoUsuarios
          .filter((projetoUsuario) => projetoUsuario.profile.name === 'Manager') // Assuming `profile` has `name`
          .map((projetoUsuario) => [
            projetoUsuario.user_id,
            {
              id: projetoUsuario.user_id,
              name: projetoUsuario.usuario.name, // Assuming `User` has `name`
            },
          ])
      ).values(),
    ];

    // Construct the final project structure
    const projectStructure = {
      name: projeto.name, // Assuming `Projeto` has `name`
      description: projeto.descricao, // Assuming `Projeto` has `descricao`
      id: projeto.id,
      status: projeto.status, // Assuming `Projeto` has `status`
      date: projeto.data_inicio, // Assuming `Projeto` has `data_inicio`
      deadline: projeto.data_fim, // Assuming `Projeto` has `data_fim`
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
