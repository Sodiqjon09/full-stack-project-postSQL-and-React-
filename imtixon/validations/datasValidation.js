const Joi = require("joi");

const validateData = (data) => {
  const schema = Joi.object({
    image: Joi.string().required(),
    like: Joi.boolean().required(),
    title: Joi.string().required(),
    starText: Joi.string().required(),
    credit: Joi.string().required(),
    fakePrice: Joi.string().required(),
    price: Joi.string().required(),
    category: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = { validateData };
