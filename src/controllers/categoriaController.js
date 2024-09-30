const categoriaService = require('../services/categoriaService.js');

// Função para criar uma nova categoria
const create = async (req, res) => {
  try {
    const categoria = await categoriaService.createCategoria(req.body);
    res.status(201).json({ data: categoria, message: "Categoria criada com sucesso." });
  } catch (error) {
    console.error('Erro ao criar categoria:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para atualizar uma categoria
const update = async (req, res) => {
  try {
    const categoriaId = req.params.id;
    const categoria = await categoriaService.updateCategoria(categoriaId, req.body);
    res.status(200).json({ data: categoria, message: "Categoria atualizada com sucesso." });
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para deletar uma categoria
const remove = async (req, res) => {
  try {
    await categoriaService.deleteCategoria(req.params.id);
    res.status(200).json({ message: "Categoria deletada com sucesso." });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter uma categoria por ID
const get = async (req, res) => {
  try {
    const categoria = await categoriaService.getCategoria(req.params.id);
    res.status(200).json({ data: categoria, message: "Categoria obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter categoria:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter todas as categorias
const getAll = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.status(200).json({ data: categorias, message: "Lista de categorias obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de categorias:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getCategoriabyidPrjeto = async (req, res) => {
  try {
    const categorias = await categoriaService.getCategoriabyidPrjeto(req.params.id);
    res.status(200).json({ data: categorias, message: "Lista de categorias obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de categorias:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};
const getTarefabyidPrjeto = async (req, res) => {
  try {
    const categorias = await categoriaService.getTarefasByProjetoId(req.params.id);
    res.status(200).json({ data: categorias, message: "Lista de categorias obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de categorias:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};


const categoriaController = {
  create,
  getAll,
  get,
  remove,
  update,
  getCategoriabyidPrjeto,
  getTarefabyidPrjeto
};

module.exports = categoriaController;
