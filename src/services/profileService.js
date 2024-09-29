const db = require('../sequelize/models/index');
const Profile = db.Profile

let instance = null;

exports.getProfileComun = async () => {
  try {
    if (!instance) {
      const [profiles, created] = await Profile.findOrCreate({
        where: { name: 'User_comun' },
        defaults: {
          name: 'User_comun',
          description: 'usuario comun',
          isAdmin: false
        }
      });

      if (!profiles) {
        throw new Error('Perfil não encontrado');
      }

      instance = profiles || created;
    }
    
    return instance;
  } catch (error) {
    throw new Error(error.message);
  }
};