const { Model } = require('sequelize');
const Profile_Grant = require('../services/ProfileGrantService');
const authMiddleware = require('./auth');

class AuthMiddleware {
  isAuthenticated() {
    return async(req, res, next) => {

      if (req.session.userId) {
        return next();
      }
      return res.status(401).json({ error: 'Not authenticated' });
    }
  }

  async hasPermission() {
    return async (req, res, next) => {

      const { profileId } = req.session;
      
      if (!profileId) {
        return res.status(401).json({ error: 'Profile not found in session' });
      }
      
      const route = req.baseUrl;
      const method = req.method;
      
      try {
        const hasPermission = await Profile_Grant.findOne({
          where: {
            profile_id: profileId,
          },
          attributes: ['id'], 
          include: [
            {
              model: Grands,
              where : {
                route : route,
                method: method
              },
              required: true
            }
          ]
        });
        
        if (!hasPermission) {
          return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
        }
        
        return next();
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}

const AuthMiddleware = new AuthMiddleware();

module.exports = authMiddleware  
