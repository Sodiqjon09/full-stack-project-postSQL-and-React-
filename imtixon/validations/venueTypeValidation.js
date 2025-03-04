const Joi = require("joi");

const validateVenueType = (venueType) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(venueType);
};
module.exports = { validateVenueType };
