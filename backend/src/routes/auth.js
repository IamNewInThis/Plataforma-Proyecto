const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi') //validaciones
const bcrypt = require('bcrypt'); //encriptar contraseña
const jwt = require('jsonwebtoken');



//validaciones del lado del servidor
const schemaRegister = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required()
})
const schemaLogin = Joi.object({
  username: Joi.string().min(6).max(255).required(),
  password: Joi.string().min(6).max(1024).required()
})

router.post('/login', async (req, res) => {
  // validaciones del lado del servidor LOGIN
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message })
  
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

  const token = jwt.sign({
    username: user.username,
    id: user._id
}, process.env.TOKEN_SECRET)

res.header('auth-token', token).json({
    error: null,
    data: {token}
})
  

})

router.post('/register', async (req, res) => {
  const { username } = req.body; // Obtiene la contraseña del objeto req.body

  // validate user
  const { error } = schemaRegister.validate(req.body)
    
  if (error) {
      return res.status(400).json(
          {error: error.details[0].message}
      )
  }

  const isUserExist = await User.findOne({ username: req.body.username });
if (isUserExist) {
    return res.status(400).json(
        {error: 'usuario ya registrado'}
    )
}

  // hash contraseña
  const salt = await bcrypt.genSalt(10);
   password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: username,
    password: password
  });

  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: savedUser
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;