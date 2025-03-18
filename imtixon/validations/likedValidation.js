const Joi = require("joi");

const validateLiked = (data) => {
  const schema = Joi.object({
    data_id: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = { validateLiked };
