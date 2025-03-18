const Joi = require("joi");

const ValidateSlide = (data) => {
  const schema = Joi.object({
    image: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

module.exports = { ValidateSlide };
