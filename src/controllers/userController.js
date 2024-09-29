const usersService = require('../services/userService');

const create = async (req, res) => {
    try {
        const user = await usersService.createUser(req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const userId = req.params.id || req.userInfo.id;

        const user = await usersService.updateUser(userId, req.body);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await usersService.deleteUser(req.params.id);
        res.status(200).json({ data: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await usersService.getAllUser();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserWithoutPassword = async (req, res) => {
    try {
        const user = await usersService.getUserWithoutPassword(req.session.user?.id||req.userInfo.id);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const authenticate = async (req, res) => {
    try {
        const  {token,user}  = await usersService.authenticate(req.body);
        req.session.userId = user.id;
        // Opcionalmente, armazene outras informações
        req.session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          profileId:user.profileId
        };
        res.status(200).json({ token, message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Buscar o usuário pelo e-mail
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
  
      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Senha incorreta' });
      }
  
      // Armazenar informações do usuário na sessão
      req.session.userId = user.id;
  
      // Opcionalmente, armazene outras informações
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email
      };
  
      res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro no servidor' });
    }
  };

// const mudarSenha = async (req, res) => {
//     try {
//         await usersService.mudarSenha(req.body, req.userInfo.id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const resetPassword = async (req, res) => {
//     try {
//         await usersService.resetPassword(req.userInfo.id, req.body.token, req.body.newPassword, req.body.newPassword2);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const requestPasswordReset = async (req, res) => {
//     try {
//         await usersService.requestPasswordReset(req.body.email);
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

module.exports = {
    create,
    update,
    delete: deleteUser,
    getAll,
    getUserWithoutPassword,
    authenticate,
    login
    // mudarSenha,
    // resetPassword,
    // requestPasswordReset
};
