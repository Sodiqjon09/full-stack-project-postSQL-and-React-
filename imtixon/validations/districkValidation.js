const Joi = require("joi");

const validateDistrict = (region) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    regionId: Joi.number(),
  });
  return schema.validate(region);
};
module.exports = { validateDistrict };
