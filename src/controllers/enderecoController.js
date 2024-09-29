const enderecoService = require('../services/enderecoService.js');

// Função para criar um novo endereço
const create = async (req, res) => {
  try {
    const endereco = await enderecoService.createEndereco(req.body);
    res.status(201).json({ data: endereco, message: "Endereço criado com sucesso." });
  } catch (error) {
    console.error('Erro ao criar endereço:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para atualizar um endereço
const update = async (req, res) => {
  try {
    const enderecoId = req.params.id;
    const endereco = await enderecoService.updateEndereco(enderecoId, req.body);
    res.status(200).json({ data: endereco, message: "Endereço atualizado com sucesso." });
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para deletar um endereço
const remove = async (req, res) => {
  try {
    await enderecoService.deleteEndereco(req.params.id);
    res.status(200).json({ message: "Endereço deletado com sucesso." });
  } catch (error) {
    console.error('Erro ao deletar endereço:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter um endereço por ID
const get = async (req, res) => {
  try {
    const endereco = await enderecoService.getEndereco(req.params.id);
    res.status(200).json({ data: endereco, message: "Endereço obtido com sucesso." });
  } catch (error) {
    console.error('Erro ao obter endereço:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

// Função para obter todos os endereços
const getAll = async (req, res) => {
  try {
    const enderecos = await enderecoService.getAllEnderecos();
    res.status(200).json({ data: enderecos, message: "Lista de endereços obtida com sucesso." });
  } catch (error) {
    console.error('Erro ao obter lista de endereços:', error.message);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const enderecoController = {
  create,
  getAll,
  get,
  remove,
  update,
};

module.exports = enderecoController;
