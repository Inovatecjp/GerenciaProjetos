const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const Categoria = db.Categoria;

// Função para criar uma nova categoria
const createCategoria = async (body) => {
  if (!body.title || !body.projeto_id) {
    throw new HttpError(400, "Título e projeto_id são obrigatórios.");
  }

  try {
    const novaCategoria = await Categoria.create({
      id: uuidv4(),
      title: body.title,
      projeto_id: body.projeto_id,
    });

    return { novaCategoria };
  } catch (err) {
    console.error('Erro ao criar categoria:', err.message);
    throw new HttpError(500, "Não foi possível criar a categoria.");
  }
};

// Função para deletar uma categoria por ID
const deleteCategoria = async (id) => {
  try {
    const categoria = await Categoria.findOne({ where: { id } });

    if (!categoria) {
      throw new HttpError(404, "Categoria não encontrada.");
    }

    await categoria.destroy();
    return true;
  } catch (err) {
    console.error('Erro ao deletar categoria:', err.message);
    throw err;
  }
};

// Função para obter todas as categorias
const getAllCategorias = async () => {
  try {
    const categorias = await Categoria.findAll();
    return categorias;
  } catch (err) {
    console.error('Erro ao obter todas as categorias:', err.message);
    throw err;
  }
};

// Função para obter uma categoria por ID
const getCategoria = async (id) => {
  try {
    const categoria = await Categoria.findOne({ where: { id } });

    if (!categoria) {
      throw new HttpError(404, "Categoria não encontrada.");
    }

    return categoria;
  } catch (err) {
    console.error('Erro ao obter categoria:', err.message);
    throw err;
  }
};

// Função para atualizar uma categoria por ID
const updateCategoria = async (id, body) => {
  try {
    const categoria = await getCategoria(id);

    // Desestruturação para evitar atualização de campos não permitidos
    const { id: categoriaId, createdAt, updatedAt, ...dataUpdate } = body;
    dataUpdate.updatedAt = new Date();

    await categoria.update(dataUpdate);

    return categoria;
  } catch (err) {
    console.error('Erro ao atualizar categoria:', err.message);
    throw err;
  }
};

const categoriaService = {
  createCategoria,
  deleteCategoria,
  getAllCategorias,
  getCategoria,
  updateCategoria,
};

module.exports = categoriaService;
