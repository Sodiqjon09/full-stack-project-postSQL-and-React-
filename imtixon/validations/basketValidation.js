const Joi = require("joi");

const validateBasket = (data) => {
  const schema = Joi.object({
    data_id: Joi.number().required(),
    user_id: Joi.number().required()
  });

  return schema.validate(data);
};

module.exports = { validateBasket};
