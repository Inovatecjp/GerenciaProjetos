const comentarioService = require('../services/comentarioService.js');

// Função para criar um novo comentário
const create = async (req, res) => {
  try {
    const comentario = await comentarioService.createComentario(req.body);
    res.status(201).json({ data: comentario, message: "Comentário criado com sucesso." });
  } catch (error) {
    console.error('Erro ao criar comentário:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para atualizar um comentário
const update = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const comentario = await comentarioService.updateComentario(comentarioId, req.body);
    res.status(200).json({ data: comentario, message: "Comentário atualizado com sucesso." });
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para deletar um comentário
const remove = async (req, res) => {
  try {
    await comentarioService.deleteComentario(req.params.id);
    res.status(200).json({ message: "Comentário deletado com sucesso." });
  } catch (error) {
    console.error('Erro ao deletar comentário:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter um comentário por ID
const get = async (req, res) => {
  try {
    const comentario = await comentarioService.getComentario(req.params.id);
    res.status(200).json({ data: comentario, message: "Comentário obtido com sucesso." });
  } catch (error) {
    console.error('Erro ao obter comentário:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter todos os comentários
const getAll = async (req, res) => {
  try {
    const comentarios = await comentarioService.getAllComentarios();
    res.status(200).json({ data: comentarios, message: "Lista de comentários obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de comentários:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const comentarioController = {
  create,
  getAll,
  get,
  remove,
  update,
};

module.exports = comentarioController;
