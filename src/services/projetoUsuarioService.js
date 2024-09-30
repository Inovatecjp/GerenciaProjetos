const HttpError = require("../utils/customError/httpError");
const db = require('../sequelize/models/index');

const ProjetoUsuario = db.Projeto_Usuario;
const Projeto = db.Projeto;

const assignUserToProject = async (data) => {
  try {
    console.log(data)
    const newAssignment = await ProjetoUsuario.create({...data});
    return newAssignment;
  } catch (error) {
    console.log(error)
    throw new HttpError(500, `Failed to assign user to project: ${error.message}`);
  }
};

const getAllAssignments = async () => {
  try {
    const assignments = await ProjetoUsuario.findAll({
      attributes: [`funcao`, `data_inicio`, `data_fim`, `status`, `salario`, `projeto_id`, `user_id`, `profile_id`, `createdAt`, `updatedAt`,], // Replace with actual column names you need
    });
    return assignments;
  } catch (error) {
    throw new HttpError(500, `Failed to retrieve assignments: ${error.message}`);
  }
};

const getAssignmentById = async (userId, projetoId) => {
  try {
    const assignment = await ProjetoUsuario.findOne({
      where: { user_id: userId, projeto_id: projetoId },
      attributes: [`funcao`, `data_inicio`, `data_fim`, `status`, `salario`, `projeto_id`, `user_id`, `profile_id`, `createdAt`, `updatedAt`,], // Replace with actual column names you need
    });

  
    if (!assignment) {
      throw new HttpError(404, 'Assignment not found');
    }

    return assignment;
  } catch (error) {
    throw new HttpError(500, `Failed to retrieve assignment: ${error.message}`);
  }
};
const getAssignmentByIdUsers = async (userId) => {
  try {
    // Fetch all assignments for the given userId
    const assignments = await ProjetoUsuario.findAll({
      where: { user_id: userId },
      attributes: [
        'funcao',
        'data_inicio',
        'data_fim',
        'status',
        'salario',
        'projeto_id',
        'user_id',
        'profile_id',
        'createdAt',
        'updatedAt'
      ], // Replace with actual column names you need
    });

    // Check if any assignments were found
    if (!assignments || assignments.length === 0) {
      throw new HttpError(404, 'No assignments found');
    }

    // Fetch project details for each assignment
    const assignmentWithProjects = await Promise.all(
      assignments.map(async (assignment) => {
        // Find the project details for the given projeto_id
        const projeto = await Projeto.findOne({
          where: { id: assignment.projeto_id }
        });

        return {
          ...assignment.toJSON(), // Convert Sequelize object to plain JSON
          projeto: projeto ? projeto.toJSON() : null // Attach project details if found
        };
      })
    );

    return assignmentWithProjects;
  } catch (error) {
    throw new HttpError(500, `Failed to retrieve assignments: ${error.message}`);
  }
};


const getAssignmentByIdProjetos = async ( projetoId) => {
  try {
    const assignment = await ProjetoUsuario.findOne({
      where: { projeto_id: projetoId },
      attributes: [`funcao`, `data_inicio`, `data_fim`, `status`, `salario`, `projeto_id`, `user_id`, `profile_id`, `createdAt`, `updatedAt`,], // Replace with actual column names you need
    });

    if (!assignment) {
      throw new HttpError(404, 'Assignment not found');
    }

    return assignment;
  } catch (error) {
    throw new HttpError(500, `Failed to retrieve assignment: ${error.message}`);
  }
};
const updateAssignment = async (userId, projetoId, data) => {
  try {
    const [updatedRowCount, updatedRows] = await ProjetoUsuario.update(data, {
      where: { user_id: userId, projeto_id: projetoId },
      returning: true,
    });

    if (updatedRowCount === 0) {
      throw new HttpError(404, 'Assignment not found for update');
    }

    return updatedRows[0]; // Return the updated assignment
  } catch (error) {
    throw new HttpError(500, `Failed to update assignment: ${error.message}`);
  }
};

const deleteAssignment = async (userId, projetoId) => {
  try {
    const deletedRowCount = await ProjetoUsuario.destroy({
      where: { user_id: userId, projeto_id: projetoId },
    });

    if (deletedRowCount === 0) {
      throw new HttpError(404, 'Assignment not found for deletion');
    }

    return { message: 'Assignment successfully deleted' };
  } catch (error) {
    throw new HttpError(500, `Failed to delete assignment: ${error.message}`);
  }
};

module.exports = {
  assignUserToProject,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  getAssignmentByIdUsers,
  getAssignmentByIdProjetos
};
