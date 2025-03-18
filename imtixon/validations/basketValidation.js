const Joi = require("joi");

const validateBasket = (data) => {
  const schema = Joi.object({
    basket_id: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = { validateBasket};
