const express = require('express');
const { Router } = express;
const userController = require('../controllers/userController');

const AuthMiddleware = require('../middlewares/authSession');

const router = Router();
//gercia de user ADminGerencte de sistema
  // Rota para criar um novo usuário
router.post('/', userController.create);
  //  Rota para atualizar um usuário
  // Rota para deletar um usuário
  // Rota para obter todos os usuários
  
  
  // Rota para obter um usuário sem a senha o id é o id do user
router.get('/me/:id',  userController.getUserWithoutPassword);
router.put('/me/:id',  userController.update);
router.delete('/me/:id',  userController.delete);
router.get('/me/:id/profile',  userController.myprofile);
router.get('/me/:id/projetos',  userController.myProjetos);

//extras
router.get('/projetos/:id', userController.participantesPorProjeto); /// todos os partipantes do pojeto 
router.get('/:id', userController.getUserWithoutPassword);/// pegar apenas um user 


router.put('/:id',  userController.update);

router.delete('/:id',  userController.delete);




// Rota para autenticar um usuário 
router.post('/authenticate', userController.authenticate);
router.post('/perfilprojeto/:id', userController.perfilprojeto);


router.post('/logout',  (req, res) => {
    // Verificar se há uma sessão ativa
    if (!req.session.userId) {
      return res.status(400).json({ error: 'Nenhuma sessão ativa encontrada.' });
    }
  
    // Destruir a sessão ativa
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer logout' });
      }
  
      // Limpar o cookie da sessão
      res.clearCookie('IJP'); 
      res.status(200).json({ message: 'Logout bem-sucedido' });
    });
  });
module.exports = router;
