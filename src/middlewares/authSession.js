const db = require('../sequelize/models/index');

const Profile_Grant = db.ProfileGrant
const Grands = db.Grands
class AuthMiddleware {

  isAuthenticated() {
    return (req, res, next) => {
      if (req.session.user?.id) {
        return next();
      }
      return res.status(401).json({ error: 'Not authenticated' });
    };
  }

  hasPermission(isProjeto = false) {
    return async (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: 'Erro esta não sem session' });
      }
      const { profileId, profile_Projeto_id } = req.session.user;
      
      if (!profileId) {
        return res.status(401).json({ error: 'Profile not found in session' });
      }
      // Use profile_Projeto_id if available; otherwise, use profileId
      const effectiveProfileId = profile_Projeto_id ? profile_Projeto_id : profileId;
  
      // (Optional) Log or check which profile ID is being used
      console.log('Effective Profile ID:', effectiveProfileId);
      console.log('----------------------');
      if (Array.isArray(req.session.permissions) && req.session.permissions.length !== 0) {
        const uuidRegex = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/
        const matches = req.path.match(uuidRegex)
        const uuid = matches && matches.length >= 1 && matches[0];
        console.log(req.path)
        console.log(req.baseUrl+req.path)
        const urloring = req.path === '/' ? req.baseUrl : req.baseUrl + req.path;
        const hasPermission = req.session.permissions.some(permission =>
          {
            // console.log("+=-=-=-=-=-=-=-=-=-=-")
            // console.log(permission.route.replace(':id', uuid))
            // console.log("----------------")
            // console.log("----------------")
            // console.log(permission.route.replace(':id', uuid) === urloring)
            // console.log(permission.method === req.method)
            // console.log(permission.method ,'  ', req.method)
            // console.log(permission.route.replace(':id', uuid) ,"-----",urloring)
            // console.log("----------------")
            // console.log("+++++++++++++")

            return permission.route.replace(':id', uuid) === urloring && permission.method === req.method}
        );
;
        if (hasPermission) {
          console.log("PASSOU")
          return next();
        }

        return res.status(403).json({ error: 'Sem permissão' });
      }
      
      try {
        const permissions = await Profile_Grant.findAll({
          where: { profile_id: profileId },
          include: [
            {
              model: Grands,
              required: true,
              as: 'grant', // Specify the alias used in the association
              attributes: ['route', 'method']
            }
          ]
        });
        
        req.session.permissions = permissions.map(p => ({
          route: p.grant.route,
          method: p.grant.method
        }));

        
        const hasPermission = req.session.permissions.some(permission =>
          permission.route === req.baseUrl && permission.method === req.method
        );
        if (!hasPermission) {
          return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
        }

        return next();
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
      }
    };
  }
}

const authMiddlewareInstance = new AuthMiddleware();

module.exports = authMiddlewareInstance;