const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const Projeto = db.Projeto;

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


const projetoService = {
  createProjeto,
  deleteProjeto,
  getAllProjetos,
  getProjeto,
  updateProjeto,
  getProjetoFist
};

module.exports = projetoService;
