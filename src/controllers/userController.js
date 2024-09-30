const usersService = require('../services/userService');
const projetoUsuarioService = require('../services/projetoUsuarioService');
const db = require ('../sequelize/models/index')


const Profile = db.Profile
const Profile_Grant = db.ProfileGrant
const Grands = db.Grands
const User = db.User
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
        const userId = req.params.id || req.userInfo.id;

        await usersService.deleteUser(userId);
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
        console.log(req.params.id||req.session.user?.id||req.userInfo.id)
        const user = await usersService.getUserWithoutPassword(req.params.id||req.session.user?.id||req.userInfo.id);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const authenticate = async (req, res) => {
    try {
        const  {token,user,profile1}  = await usersService.authenticate(req.body);
        req.session.userId = user.id;
        // Opcionalmente, armazene outras informações
        req.session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          profileId:user.profileId
        };


        res.status(200).json({ token, message: 'Login bem-sucedido' ,profile:profile1});
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const myProjetos = async (req, res) => {
    try {
        const  projetos  = await projetoUsuarioService.getAssignmentByIdUsers(req.params.id||req.session.user?.id||req.userInfo.id);

        res.status(200).json({ projetos, message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
const myprofile = async (req, res) => {
    try {
        // Certifique-se de que a sessão existe e que possui userId
        const user = await User.findByPk(req.params.id)
        // Busca os perfis com base nos IDs válidos
        const perfis = await Profile.findByPk(user.profile_id);
    

        console.log(perfis);

        // Busca todos os grants relacionados a esses perfis e combina-os em um único array
        const allGrants =  await Profile_Grant.findAll({
                where: { profile_id: info.id },
                include: [
                    {
                        model: Grands,
                        required: true,
                        as: 'grant', // Especifique o alias usado na associação
                        attributes: ['route', 'method']
                    }
                ]
            });

    

        // Combina todos os grants em um único array

        // Retorna a resposta com perfis e todos os grants combinados em um único array
        res.status(200).json({ perfis, grants: allGrants, message: 'Login bem-sucedido' });
    } catch (error) {
        // Resposta de erro com o código apropriado e mensagem
        res.status(500).json({ error: error.message });
    }
};


const participantesPorProjeto = async (req, res) => {
    try {
        const  projetos  = await projetoUsuarioService.getAssignmentByIdProjetos(req.params.id);

        res.status(200).json({ projetos, message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const perfilprojeto = async (req, res) => {
    try {
        const  projetos  = await projetoUsuarioService.getAssignmentByIdProjetos(req.body.idProjeto);
        
        console.log(projetos)
        
        const projetoID =  await Profile.findByPk(projetos.profile_id)
        req.session.user.profile_Projeto_id = projetoID.id
        console.log(req.session.user)
        res.status(200).json({ projetos, message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       // Buscar o usuário pelo e-mail
//       const user = await User.findOne({ where: { email } });
  
//       if (!user) {
//         return res.status(400).json({ error: 'Usuário não encontrado' });
//       }
  
//       // Verificar a senha
//       const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ error: 'Senha incorreta' });
//       }
  
//       // Armazenar informações do usuário na sessão
//       req.session.userId = user.id;
  
//       // Opcionalmente, armazene outras informações
//       req.session.user = {
//         id: user.id,
//         name: user.name,
//         email: user.email
//       };
  
//       res.status(200).json({ message: 'Login bem-sucedido' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Erro no servidor' });
//     }
//   };

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
    myProjetos,
    participantesPorProjeto,
    perfilprojeto,
    myprofile
    // mudarSenha,
    // resetPassword,
    // requestPasswordReset
};
