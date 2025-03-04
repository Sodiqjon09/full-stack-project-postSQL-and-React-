const { District,Region } = require("../models");
const { validateDistrict } = require("../validations/districkValidation");

exports.createdistristType = async (req, res) => {
  const { error } = validateDistrict(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const distrist = await District.create(req.body);
    res.status(201).send(distrist);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getdistristType = async (req, res) => {
  try {
    const distrists = await District.findAll();
    res.status(200).send(distrists);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getdistristTypeById = async (req, res) => {
  try {
    const venoe = await District.findByPk(req.params.id, {
      includes: [
        {
          model: Region,
          as: "region",
        },
      ],
    });
    if (!venoe) return res.status(404).send("venoe not found");
    res.status(200).send(venoe);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updatedistristType = async (req, res) => {
  const { error } = validateDistrict(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const distrist = await District.findByPk(req.params.id);
    if (!distrist) return res.status(404).send("distrist not found");
    await distrist.update(req.body);
    res.status(200).send(distrist);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletedistristType = async (req, res) => {
  try {
    const distrist = await District.findByPk(req.params.id);
    if (!distrist) return res.status(404).send("distrist not found");
    const distristdata = distrist.toJSON();

    await distrist.destroy();
    res.status(204).send(distristdata);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
