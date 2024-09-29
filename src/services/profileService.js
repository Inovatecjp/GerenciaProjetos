const db = require('../sequelize/models/index');
const HttpError = require('../utils/customError/httpError'); // Import your custom error class
const Profile = db.Profile;

let instance = null;

// Function to get or create a common user profile
exports.getProfileComun = async () => {
  try {
    if (!instance) {
      const [profile, created] = await Profile.findOrCreate({
        where: { name: 'User_comun' },
        defaults: {
          name: 'User_comun',
          description: 'usuario comun',
          isAdmin: false
        }
      });

      // Cache the profile for subsequent calls
      instance = profile || created;
    }
    
    return instance;
  } catch (error) {
    console.error('Error getting or creating common profile:', error.message);
    throw new HttpError(500, 'Internal Server Error');
  }
};

// Function to get all profiles
exports.getProfileAll = async () => {
  try {
    const profiles = await Profile.findAll();

    if (!profiles.length) {
      throw new HttpError(404, 'No profiles found');
    }

    return profiles;
  } catch (error) {
    console.error('Error getting all profiles:', error.message);
    throw new HttpError(500, 'Internal Server Error');
  }
};

// Function to get a specific profile by ID
exports.getProfile = async (id) => {
  try {
    const profile = await Profile.findOne({ where: { id } });

    if (!profile) {
      throw new HttpError(404, 'Profile not found');
    }

    return profile;
  } catch (err) {
    console.error('Error getting profile by ID:', err.message);
    throw new HttpError(500, 'Internal Server Error');
  }
};
