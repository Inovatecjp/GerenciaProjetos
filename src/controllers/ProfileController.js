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
        { method: 'GET', route: '/users', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/users/me', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/users', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/users', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/users', description: 'pegar o plano do user' },

        { method: 'GET', route: '/projetos', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/projetos/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/projetos', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/projetos/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/projetos/:id', description: 'pegar o plano do user' },
        
        
        { method: 'GET', route: '/categorias', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/categorias/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/categorias', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/categorias/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/categorias/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/tarefas', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/tarefas/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/tarefas', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/tarefas/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/tarefas/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/comentarios', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/comentarios/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/comentarios', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/comentarios/:id', description: 'acesso as infos do proprio user' },
        { method: 'DELETE', route: '/comentarios/:id', description: 'pegar o plano do user' },

        { method: 'GET', route: '/enderecos', description: 'acesso as infos do proprio user' },
        { method: 'GET', route: '/enderecos/:id', description: 'acesso as infos do proprio user' },
        { method: 'POST', route: '/enderecos', description: 'acesso as infos do proprio user' },
        { method: 'UPDADE', route: '/enderecos/:id', description: 'acesso as infos do proprio user' },
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