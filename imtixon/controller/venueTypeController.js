const { VenueType } = require("../models");
const { validateVenueType } = require("../validations/venueTypeValidation");

exports.createVenueType = async (req, res) => {
  const { error } = validateVenueType(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const venue = await VenueType.create(req.body);
    res.status(201).send(venue);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getVenueType = async (req, res) => {
  try {
    const venoes = await VenueType.findAll();
    res.status(200).send(venoes);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getVenueTypeById = async (req, res) => {
  try {
    const venoe = await VenueType.findByPk(req.params.id, {
      includes: [
        {
          model: VenueType,
          as: "venueType",
        },
      ],
    });
    if (!venoe) return res.status(404).send("venoe not found");
    res.status(200).send(venoe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateVenueType = async (req, res) => {
  const { error } = validateVenueType(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const venoe = await VenueType.findByPk(req.params.id);
    if (!venoe) return res.status(404).send("venoe not found");
    await venoe.update(req.body);
    res.status(200).send(venoe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteVenueType = async (req, res) => {
  try {
    const venoe = await VenueType.findByPk(req.params.id);
    if (!venoe) return res.status(404).send("venoe not found");
    const venoedata = venoe.toJSON();

    await venoe.destroy();
    res.status(204).send(venoedata);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
