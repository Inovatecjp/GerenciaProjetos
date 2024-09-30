const projetoService = require('../services/projetoService.js');

// Função para criar um novo projeto
const create = async (req, res) => {
  try {
    const projeto = await projetoService.createProjeto(req.body);
    res.status(201).json({ data: projeto, message: "Projeto criado com sucesso." });
  } catch (error) {
    console.error('Erro ao criar projeto:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para atualizar um projeto
const update = async (req, res) => {
  try {
    const projetoId = req.params.id;
    const projeto = await projetoService.updateProjeto(projetoId, req.body);
    res.status(200).json({ data: projeto, message: "Projeto atualizado com sucesso." });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para deletar um projeto
const remove = async (req, res) => {
  try {
    await projetoService.deleteProjeto(req.params.id);
    res.status(200).json({ message: "Projeto deletado com sucesso." });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter um projeto por ID
const get = async (req, res) => {
  try {
    console.log('=-42134342134=-=-=-=-=-=-=-')
    const projeto = await projetoService.getProjeto(req.params.id);
    res.status(200).json({ data: projeto, message: "Projeto obtido com sucesso." });
  } catch (error) {
    console.error('Erro ao obter projeto:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter todos os projetos
const getAll = async (req, res) => {
  try {
    const projetos = await projetoService.getAllProjetos();
    res.status(200).json({ data: projetos, message: "Lista de projetos obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de projetos:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};
const getAllInfos = async (req, res) => {
  try {
    console.log('=-=-=-=-=-=-=-=-')
    const idProjeto = req.params.id
    const projetos = await projetoService.getProjetoFilter(idProjeto);
    res.status(200).json({ data: projetos, message: "Lista de projetos obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de projetos:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const getAlltarefa= async (req, res) => {
  try {
    console.log('=-=-=-=-=-=-=-=-')
    const idProjeto = req.params.id
    const projetos = await projetoService.getProjetoFilter(idProjeto);
    res.status(200).json({ data: projetos, message: "Lista de projetos obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de projetos:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};
const projetoController = {
  create,
  getAll,
  get,
  remove,
  update,
  getAllInfos,
  getAlltarefa
};

module.exports = projetoController;
