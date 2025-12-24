const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    await registerUser(email, password, name);
    return res.status(200).json({ message: 'Usuario creado correctamente'});
  } catch (error) {
    return res.status(400).json({ error: message.error }); 
  };
}; 

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    token = await loginUser(email, password); 
    return res.json({ token });
  } catch (error) {
    return res.status(200).json({ error: message.error }); 
  }
};

module.exports = { register, login };