const express = require('express');
const { Router } = express;
const userController = require('../controllers/userController');

const AuthMiddleware = require('../middlewares/authSession');

const router = Router();

// Rota para criar um novo usuário
router.post('/', userController.create);

// Rota para atualizar um usuário
router.put('/:id', AuthMiddleware.isAuthenticated(), userController.update);

// Rota para deletar um usuário
router.delete('/:id', AuthMiddleware.isAuthenticated(), userController.delete);

// Rota para obter todos os usuários
router.get('/', userController.getAll);

// Rota para obter um usuário sem a senha
router.get('/me', AuthMiddleware.isAuthenticated(), userController.getUserWithoutPassword);

// Rota para autenticar um usuário 
router.post('/authenticate', userController.authenticate);


router.post('/logout', AuthMiddleware.isAuthenticated(), (req, res) => {
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
