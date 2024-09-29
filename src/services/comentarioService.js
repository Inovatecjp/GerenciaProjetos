const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const Comentario = db.Comentario;

// Função para criar um novo comentário
const createComentario = async (body) => {
  if (!body.texto || !body.tarefa_user_id) {
    throw new HttpError(400, "Texto e tarefa_user_id são obrigatórios.");
  }

  try {
    const novoComentario = await Comentario.create({
      id: uuidv4(),
      texto: body.texto,
      tarefa_user_id: body.tarefa_user_id,
    });

    return { novoComentario };
  } catch (err) {
    console.error('Erro ao criar comentário:', err.message);
    throw new HttpError(500, "Não foi possível criar o comentário.");
  }
};

// Função para deletar um comentário por ID
const deleteComentario = async (id) => {
  try {
    const comentario = await Comentario.findOne({ where: { id } });

    if (!comentario) {
      throw new HttpError(404, "Comentário não encontrado.");
    }

    await comentario.destroy();
    return true;
  } catch (err) {
    console.error('Erro ao deletar comentário:', err.message);
    throw err;
  }
};

// Função para obter todos os comentários
const getAllComentarios = async () => {
  try {
    const comentarios = await Comentario.findAll();
    return comentarios;
  } catch (err) {
    console.error('Erro ao obter todos os comentários:', err.message);
    throw err;
  }
};

// Função para obter um comentário por ID
const getComentario = async (id) => {
  try {
    const comentario = await Comentario.findOne({ where: { id } });

    if (!comentario) {
      throw new HttpError(404, "Comentário não encontrado.");
    }

    return comentario;
  } catch (err) {
    console.error('Erro ao obter comentário:', err.message);
    throw err;
  }
};

// Função para atualizar um comentário por ID
const updateComentario = async (id, body) => {
  try {
    const comentario = await getComentario(id);

    // Desestruturação para evitar atualização de campos não permitidos
    const { id: comentarioId, createdAt, updatedAt, ...dataUpdate } = body;
    dataUpdate.updatedAt = new Date();

    await comentario.update(dataUpdate);

    return comentario;
  } catch (err) {
    console.error('Erro ao atualizar comentário:', err.message);
    throw err;
  }
};

const comentarioService = {
  createComentario,
  deleteComentario,
  getAllComentarios,
  getComentario,
  updateComentario,
};

module.exports = comentarioService;
