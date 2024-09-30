const projetoUsuarioService = require('../services/projetoUsuarioService');
const projetoService = require('../services/projetoService');
const profileService = require('../services/profileService');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const assignUser = async (req, res) => {
  try {

    const projeto = await projetoService.getProjetoFist(); // Fetch project
    const profile = await profileService.getProfile(req.body.profile_id); // Fetch profile by ID

    req.body.profile_id = profile.id; // Set the profile ID correctly
    req.body.user_id =  req.params.id || req.session.user?.id ;  // Ensure user ID is valid
    req.body.projeto_id = projeto.id; // Set project ID
    req.body.id = uuidv4(); // Set project ID
    console.log(req.body)
    
    const assignment = await projetoUsuarioService.assignUserToProject(req.body);
    res.status(201).json({ data: assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const assignments = await projetoUsuarioService.getAllAssignments();
    res.status(200).json({ data: assignments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByProjetoId = async (req, res) => {
  try {
    const projeto = await projetoService.getProjeto(req.params.idprojeto);
    const user_id = req.params.id || req.session.user?.id || req.userInfo?.id; // Ensure user ID is valid

    const assignment = await projetoUsuarioService.getAssignmentById(user_id, projeto.id);
    if (assignment) {
      res.status(200).json({ data: assignment });
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const projeto = await projetoService.getProjetoFist();
    const user_id = req.session.user?.id || req.userInfo?.id; // Ensure user ID is valid
    const assignment = await projetoUsuarioService.updateAssignment(user_id, projeto.id, req.body);
    if (assignment) {
      res.status(200).json({ data: assignment });
    } else {
      res.status(404).json({ error: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const projeto = await projetoService.getProjetoFist();
    const user_id = req.session.user?.id || req.userInfo?.id; // Ensure user ID is valid
    await projetoUsuarioService.deleteAssignment(user_id, projeto.id);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  assignUser,
  getAll,
  getByProjetoId,
  update,
  delete: deleteAssignment,
};
