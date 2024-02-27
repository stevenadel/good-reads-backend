const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET, JWT_SECRET_Admin } = process.env;

const generateTokenUser = (user) => {
  try {
    if (!user || !user.username || !user._id) {
      return new Error('Invalid user object');
    }

    if (!JWT_SECRET) {
      return new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign(
      { username: user.username, id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw error;
  }
};

const generateTokenAdmin = (admin) => {
  try {
    if (!admin || !admin.username || !admin._id) {
      return new Error('Invalid admin object');
    }

    if (!JWT_SECRET_Admin) {
      return new Error('JWT_SECRET_Admin is not defined');
    }

    const token = jwt.sign(
      { username: admin.username, id: admin._id },
      JWT_SECRET_Admin,
      { expiresIn: '7d' },
    );

    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw error;
  }
};

module.exports = { generateTokenUser, generateTokenAdmin };
