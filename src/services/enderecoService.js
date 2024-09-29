const { v4: uuidv4 } = require('uuid');
const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const Endereco = db.Endereco;

// Função para criar um novo endereço
const createEndereco = async (body) => {
  if (!body.rua || !body.cep || !body.bairro || !body.uf || !body.user_id) {
    throw new HttpError(400, "Rua, CEP, Bairro, UF e user_id são obrigatórios.");
  }

  try {
    const novoEndereco = await Endereco.create({
      id: uuidv4(),
      rua: body.rua,
      cep: body.cep,
      bairro: body.bairro,
      uf: body.uf,
      complemento: body.complemento || null,
      user_id: body.user_id,
    });

    return { novoEndereco };
  } catch (err) {
    console.error('Erro ao criar endereço:', err.message);
    throw new HttpError(500, "Não foi possível criar o endereço.");
  }
};

// Função para deletar um endereço por ID
const deleteEndereco = async (id) => {
  try {
    const endereco = await Endereco.findOne({ where: { id } });

    if (!endereco) {
      throw new HttpError(404, "Endereço não encontrado.");
    }

    await endereco.destroy();
    return true;
  } catch (err) {
    console.error('Erro ao deletar endereço:', err.message);
    throw err;
  }
};

// Função para obter todos os endereços
const getAllEnderecos = async () => {
  try {
    const enderecos = await Endereco.findAll();
    return enderecos;
  } catch (err) {
    console.error('Erro ao obter todos os endereços:', err.message);
    throw err;
  }
};

// Função para obter um endereço por ID
const getEndereco = async (id) => {
  try {
    const endereco = await Endereco.findOne({ where: { id } });

    if (!endereco) {
      throw new HttpError(404, "Endereço não encontrado.");
    }

    return endereco;
  } catch (err) {
    console.error('Erro ao obter endereço:', err.message);
    throw err;
  }
};

// Função para atualizar um endereço por ID
const updateEndereco = async (id, body) => {
  try {
    const endereco = await getEndereco(id);

    // Desestruturação para evitar atualização de campos não permitidos
    const { id: enderecoId, createdAt, updatedAt, ...dataUpdate } = body;
    dataUpdate.updatedAt = new Date();

    await endereco.update(dataUpdate);

    return endereco;
  } catch (err) {
    console.error('Erro ao atualizar endereço:', err.message);
    throw err;
  }
};

const enderecoService = {
  createEndereco,
  deleteEndereco,
  getAllEnderecos,
  getEndereco,
  updateEndereco,
};

module.exports = enderecoService;
