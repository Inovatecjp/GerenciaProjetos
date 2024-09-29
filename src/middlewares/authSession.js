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

  hasPermission() {
    return async (req, res, next) => {
      const { profileId } = req.session.user;
      
      if (!profileId) {
        return res.status(401).json({ error: 'Profile not found in session' });
      }

      if (req.session.permissions) {
        const hasPermission = req.session.permissions.some(permission =>
         permission.route === req.baseUrl+'/' && permission.method === req.method
        );
        if (hasPermission) {
          return next();
        }

        return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
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