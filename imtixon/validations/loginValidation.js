const Joi = require("joi");

const validateLogin = (login) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(login);
};

module.exports = { validateLogin };
