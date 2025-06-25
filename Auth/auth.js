const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    const decode = jwt.verify(token, process.env.JWT_SecretKey);
    const gym = await Gym.findById(decode.gym_id).select('-password');

    if (!gym) {
      return res.status(401).json({ error: 'Gym not found' });
    }

    req.gymId = gym._id;      // ✅ Ab yeh sahi jagah hai
    req.gym = gym;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
