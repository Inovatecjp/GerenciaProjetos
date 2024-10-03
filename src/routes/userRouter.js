const express = require('express');
const { Router } = express;
const userController = require('../controllers/userController');

const authMiddleware = require('../middlewares/auth');

const router = Router();
//gercia de user ADminGerencte de sistema
  // Rota para criar um novo usuário
// router.post('/register', userController.create);
router.post('/gerente', userController.creategerente);
router.post('/admin', userController.createadmin);
router.post('/colaborador', userController.createcolaborador);
// router.post('/brocha', userController.createbrocha);

  //  Rota para atualizar um usuário
  // Rota para deletar um usuário
  // Rota para obter todos os usuários
  
router.get('/',  userController.getAll);
  
  // Rota para obter um usuário sem a senha o id é o id do user
router.get('/me',authMiddleware,  userController.getUserWithoutPassword);
router.put('/me',authMiddleware,  userController.update);
router.delete('/me',authMiddleware,  userController.delete);
router.get('/me/profile',authMiddleware,  userController.myprofile);
router.get('/me/projetos',authMiddleware,  userController.myProjetos);

//extras
router.get('/projetos/:id', userController.participantesPorProjeto); /// todos os partipantes do pojeto 

router.get('/:id', userController.getUserWithoutPassword);/// pegar apenas um user 


router.put('/:id',  userController.update);

router.delete('/:id',  userController.delete);




// Rota para autenticar um usuário 
router.post('/authenticate', userController.authenticate);
router.post('/perfilprojeto',authMiddleware, userController.perfilprojeto);
router.post('/:id', userController.createDinamico);


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
