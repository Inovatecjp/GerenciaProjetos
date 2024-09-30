const db = require ('../sequelize/models/index')


const Profile = db.Profile
const Grands = db.Grands
const Grandsprofile = db.ProfileGrant

// ProfileGrant
// import Profile from '../models/profile';
// import Grands from '../models/grant';
// import Grandsprofile from '../models/profileGrant';

class profileController {
  async store(req, res) {

      
      
      const [profiles, created] = await Profile.findOrCreate({
        where: {  name: 'User_comun'},
        defaults: {
                  
          name: 'User_comun',
          description: 'usuario comun',
          isAdmin: false
        }
      })
      const profil = created ? profiles : profiles;
      const routes = await Grands.bulkCreate([
        { method: 'GET', route: '/users', description: 'Pegar todos os user no sistema' },
        { method: 'GET', route: '/users/:id', description: 'pegar as info de um user especifico' },
        { method: 'POST', route: '/users', description: 'Resgitrar user' },
        { method: 'PUT', route: '/users/:id', description: 'atulaizar info de user' },
        { method: 'DELETE', route: '/users/:id', description: 'Deletat user' },
        { method: 'GET', route: '/users/projetos/:id', description: 'Deletat user' },
        { method: 'POST', route: '/perfilprojeto', description: 'Deletat user' },

        { method: 'GET', route: '/users/me', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/users/me/projetos', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/users/me', description: 'atulaizar as infos do proprio user' },
        { method: 'DELETE', route: '/users/me', description: 'deletar o proprio user' },



        { method: 'GET', route: '/projetos', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/projetos/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/projetos', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/projetos/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/projetos/:id', description: 'pegar o plano do user' },
        

        { method: 'GET', route: '/projeto-usuario', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/projeto-usuario/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/projeto-usuario', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/projeto-usuario/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/projeto-usuario/:id', description: 'pegar o plano do user' },
        
        
        { method: 'GET', route: '/categorias', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/categorias/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/categorias', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/categorias/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/categorias/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/tarefas', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/tarefas/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/tarefas', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/tarefas/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/tarefas/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/comentarios', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/comentarios/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/comentarios', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/comentarios/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/comentarios/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/enderecos', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/enderecos/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/enderecos', description: 'acesso as infos do proprio user' },
        { method: 'PUT', route: '/enderecos/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/enderecos/:id', description: 'pegar o plano do user' },

        
      ]);
      

      const newlints = routes.map(grand =>{
        return { profile_id : profil.id , grant_id:grand.id  }
      })
      
      try {
        const grandsProfile = await Grandsprofile.bulkCreate(newlints);
      } catch (error) {
        console.error('Erro ao inserir registros:', error.message);
      }
      

      


      return res.json({ message: 'Sucesso' });
    
  }

  async storeAdmin(req, res) {

        
        
    const [profiles, created] = await Profile.findOrCreate({
      where: {  name: 'User_Admin'},
      defaults: {
                
        name: 'User_Admin',
        description: 'o profissional da area de edução fisica',
        isAdmin: true
      }
    })
    

    const profil = created ? profiles : profiles;
    const routes = await Grands.bulkCreate([
      { grant: 'get,update,delete', route: '/users/', note: 'acesso as infos do proprio user' },
      { grant: 'get,update,delete', route: '/users', note: 'acesso as infos do proprio user' },
      { grant: 'get', route: '/users/MudarSenha/', note: 'pegar o plano do user' },
      { grant: 'get', route: '/endereco', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/endereco/:id', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/sedes', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/sedes/:id', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/eventos', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/eventos/myEventos', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/eventos/:id', note: 'pegar todos os endersços' },
      
      { grant: 'get', route: '/ingressos', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/ingressos/:id', note: 'pegar todos os endersços' },
      
      { grant: 'get', route: '/ingressos/eventos/:id', note: 'pegar todos os endersços' },
      
      { grant: 'get', route: '/payments/purchase-ticket', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/payments/mercadopago/webhook', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/transacoes', note: 'pegar todos os endersços' },
     
      { grant: 'get', route: '/ingressos/myIngresso', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/ingressos/myIngresso1', note: 'pegar todos os endersços' },
      
      { grant: 'get', route: '/eventos/participantes/:id', note: 'pegar todos os endersços' },
      
      { grant: 'get', route: '/ingressos/ValidTikc/:id', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/eventoimg/upload/:id/', note: 'pegar todos os endersços' },
      { grant: 'get', route: '/eventoimg/upload/:id', note: 'pegar todos os endersços' },
     
      { grant: 'get', route: '/ingressos/:id/ingresosvendidos', note: 'pegar todos os endersços' },

      
    ]);
    

    const newlints = routes.map(grand =>{
      return { profile_id : profil.id , grant_id:grand.id  }
    })
    
    try {
      const grandsProfile = await Grandsprofile.bulkCreate(newlints);
    } catch (error) {
      console.error('Erro ao inserir registros:', error.message);
    }

    


    return res.json({ message: 'Sucesso' });

  }


  async allSistema(req, res)  {
    try {
      // Criação do perfil de Usuário Comum
      const [userComunProfile, createdUserComun] = await Profile.findOrCreate({
        where: { name: 'User_Comum_Sistema' },
        defaults: {
          name: 'User_Comum_Sistema',
          description: 'Usuário comum com permissões limitadas',
          isAdmin: false
        }
      });

      // Define rotas para o perfil de usuário comum
      const userComunRoutes = await Grands.bulkCreate([
        { method: 'GET', route: '/projetos', description: 'Listar projetos que o usuário participa' },
        { method: 'GET', route: '/projetos/:id', description: 'Ver detalhes dos projetos que o usuário participa' },
        { method: 'PUT', route: '/users/me', description: 'Editar seu próprio perfil' },
      ]);

      // Criação das permissões para o Usuário Comum
      const userComunGrants = userComunRoutes.map(grant => ({
        profile_id: userComunProfile.id,
        grant_id: grant.id
      }));
      await Grandsprofile.bulkCreate(userComunGrants);

      // Criação do perfil de Gerente
      const [gerenteProfile, createdGerente] = await Profile.findOrCreate({
        where: { name: 'Gerente_Sistema' },
        defaults: {
          name: 'Gerente_Sistema',
          description: 'Gerente com permissões de gerenciamento de projetos e usuários',
          isAdmin: false
        }
      });

      // Define rotas para o perfil de gerente
      const gerenteRoutes = await Grands.bulkCreate([
        { method: 'POST', route: '/users', description: 'Adicionar usuários ao sistema' },
        { method: 'PUT', route: '/users/:id', description: 'Editar informações de usuários' },
        { method: 'GET', route: '/users', description: 'Listar todos os usuários do sistema' },
        { method: 'GET', route: '/users/:id', description: 'Ver detalhes de um usuário específico' },
        { method: 'POST', route: '/projetos', description: 'Adicionar projetos ao sistema' },
        { method: 'PUT', route: '/projetos/:id', description: 'Editar projetos' },
        { method: 'GET', route: '/projetos', description: 'Listar todos os projetos' },
        { method: 'GET', route: '/projetos/:id', description: 'Ver detalhes de um projeto específico' },
      ]);

      // Criação das permissões para o Gerente
      const gerenteGrants = gerenteRoutes.map(grant => ({
        profile_id: gerenteProfile.id,
        grant_id: grant.id
      }));
      await Grandsprofile.bulkCreate(gerenteGrants);

      // Criação do perfil de Administrador
      const [adminProfile, createdAdmin] = await Profile.findOrCreate({
        where: { name: 'Admin_Sistema' },
        defaults: {
          name: 'Admin_Sistema',
          description: 'Administrador do sistema com permissões completas',
          isAdmin: true
        }
      });

      // Define rotas para o perfil de administrador
      const adminRoutes = await Grands.bulkCreate([
        { method: 'POST', route: '/users', description: 'Adicionar usuários ao sistema' },
        { method: 'PUT', route: '/users/:id', description: 'Editar informações de usuários' },
        { method: 'GET', route: '/users', description: 'Listar todos os usuários do sistema' },
        { method: 'GET', route: '/users/:id', description: 'Ver detalhes de um usuário específico' },
        { method: 'DELETE', route: '/users/:id', description: 'Deletar um usuário' },
        { method: 'POST', route: '/projetos', description: 'Adicionar projetos ao sistema' },
        { method: 'PUT', route: '/projetos/:id', description: 'Editar projetos' },
        { method: 'DELETE', route: '/projetos/:id', description: 'Deletar um projeto' },
        { method: 'GET', route: '/projetos', description: 'Listar todos os projetos' },
        { method: 'GET', route: '/projetos/:id', description: 'Ver detalhes de um projeto específico' },
        // Adicione outras permissões necessárias para o admin aqui...
      ]);

      // Criação das permissões para o Administrador
      const adminGrants = adminRoutes.map(grant => ({
        profile_id: adminProfile.id,
        grant_id: grant.id
      }));
      await Grandsprofile.bulkCreate(adminGrants);

      // Retorna sucesso
      return res.json({ message: 'Perfis e permissões criados com sucesso' });
    } catch (error) {
      console.error('Erro ao criar perfis e permissões:', error.message);
      return res.status(500).json({ error: 'Erro ao criar perfis e permissões' });
    }
  }


  async addGestaoProfile(req, res) {
    try {
      // Criação do perfil de Gerente de Projeto
      const [gerenteProjetoProfile, createdGerenteProjeto] = await Profile.findOrCreate({
        where: { name: 'Gerente_Projeto' },
        defaults: {
          name: 'Gerente_Projeto',
          description: 'Gerente com permissões para gerenciar projetos e tarefas',
          isAdmin: false
        }
      });

      // Define rotas para o perfil de Gerente de Projeto
      const gerenteProjetoRoutes = await Grands.bulkCreate([
        { method: 'GET', route: '/projeto-usuarios', description: 'Ver a lista de usuários do projeto' },
        { method: 'GET', route: '/projeto-usuarios/sem-tarefa', description: 'Ver quais usuários não têm tarefa' },
        { method: 'GET', route: '/tarefas/por-usuario/:id', description: 'Ver quantidade de tarefas que o usuário está participando (ID)' },
        { method: 'GET', route: '/tarefas', description: 'Ver a lista de todas as tarefas' },
        { method: 'GET', route: '/tarefas/por-categoria', description: 'Ver tarefas por categoria' },
        { method: 'GET', route: '/tarefas/por-data', description: 'Ver tarefas por data' },
        { method: 'GET', route: '/tarefas/por-responsavel', description: 'Ver tarefas por responsável (quem criou)' },
        { method: 'PUT', route: '/tarefas/:id', description: 'Editar tarefas' },
        { method: 'POST', route: '/tarefas', description: 'Adicionar tarefas' },
        { method: 'PUT', route: '/tarefas/:id/atribuir', description: 'Atribuir usuário a tarefa' },
        { method: 'PUT', route: '/tarefas/:id/atualizar-categoria', description: 'Atualizar categoria da tarefa' },
        { method: 'POST', route: '/tarefas/:id/comentarios', description: 'Comentar em uma tarefa' }
      ]);

      // Criação das permissões para o Gerente de Projeto
      const gerenteProjetoGrants = gerenteProjetoRoutes.map(grant => ({
        profile_id: gerenteProjetoProfile.id,
        grant_id: grant.id
      }));
      await Grandsprofile.bulkCreate(gerenteProjetoGrants);

      // Criação do perfil de Usuário de Projeto
      const [userProjetoProfile, createdUserProjeto] = await Profile.findOrCreate({
        where: { name: 'User_Projeto' },
        defaults: {
          name: 'User_Projeto',
          description: 'Usuário com permissões para visualizar e participar de tarefas do projeto',
          isAdmin: false
        }
      });

      // Define rotas para o perfil de Usuário de Projeto
      const userProjetoRoutes = await Grands.bulkCreate([
        { method: 'GET', route: '/tarefas/projeto', description: 'Ver todas as tarefas do projeto' },
        { method: 'GET', route: '/tarefas/projeto/participando', description: 'Ver tarefas participando' },
        { method: 'GET', route: '/tarefas/:id', description: 'Ver detalhes da tarefa' },
        { method: 'GET', route: '/tarefas/:id/comentarios', description: 'Ver todos os comentários da tarefa' },
        { method: 'PUT', route: '/tarefas/:id/atualizar-categoria', description: 'Atualizar categoria da tarefa' },
        { method: 'PUT', route: '/tarefas/:id/atribuir-me', description: 'Se atribuir a uma tarefa' },
        { method: 'POST', route: '/tarefas/:id/comentarios', description: 'Comentar em uma tarefa' }
      ]);

      // Criação das permissões para o Usuário de Projeto
      const userProjetoGrants = userProjetoRoutes.map(grant => ({
        profile_id: userProjetoProfile.id,
        grant_id: grant.id
      }));
      await Grandsprofile.bulkCreate(userProjetoGrants);

      // Retorna sucesso
      return res.json({ message: 'Perfis e permissões de Gerente de Projeto e Usuário de Projeto criados com sucesso' });
    } catch (error) {
      console.error('Erro ao criar perfis e permissões:', error.message);
      return res.status(500).json({ error: 'Erro ao criar perfis e permissões' });
    }
  }



  async addProfileJose(req, res) {
    try {
      // Criação do perfil de Gerente de Projeto
      const [gerenteProfile, createdGerente] = await Profile.findOrCreate({
        where: { name: 'Gerente' },
        defaults: {
          name: 'Gerente',
          description: 'Gerent1e com permissões para gerenciar projetos e tarefas',
          isAdmin: false
        }
      });

      const [adminProfile, createdadmin] = await Profile.findOrCreate({
        where: { name: 'admin' },
        defaults: {
          name: 'admin',
          description: 'Gere3nte com permissões para gerenciar projetos e tarefas',
          isAdmin: false
        }
      });
      const [colaboradorProfile, createdcolaborador] = await Profile.findOrCreate({
        where: { name: 'colaborador' },
        defaults: {
          name: 'colaborador',
          description: 'Ger2ente com permissões para gerenciar projetos e tarefas',
          isAdmin: false
        }
      });
      // Retorna sucesso
      return res.json({ message: 'Perfis e permissões de Gerente de Projeto e Usuário de Projeto criados com sucesso' });
    } catch (error) {
      console.error('Erro ao criar perfis e permissões:', error);
      return res.status(500).json({ error: 'Erro ao criar perfis e permissões' });
    }
  }
  // Index
  async index(req, res) {
    try {
      const profiles = await Profile.findAll();
      return res.json(profiles);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const profile = await profile.findByPk(req.params.id);

      const { id, name, isAdmin } = profile;
      return res.json({ id, name, isAdmin });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const profile = await profile.findByPk(req.profileId);

      if (!profile) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await profile.update(req.body);
      const { id, name, isAdmin } = novosDados;
      return res.json({ id, name, isAdmin });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const profile = await profile.findByPk(req.profileId);

      if (!profile) {
        return res.status(400).json({
          errors: ['Perfio do usuairo não existe'],
        });
      }

      await profile.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

const profileControllerInstance = new profileController();

module.exports = profileControllerInstance;