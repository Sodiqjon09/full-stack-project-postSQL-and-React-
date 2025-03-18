const { Slide } = require("../models");
const { ValidateSlide } = require("../validations/SlideValidation");

exports.createSlideType = async (req, res) => {
  const { error } = ValidateSlide(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const slids = await Slide.create(req.body);
    res.status(201).send(slids);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSlideType = async (req, res) => {
  try {
    const slids = await Slide.findAll();
    res.status(200).send(slids);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSlideTypeById = async (req, res) => {
  try {
    const slide = await Slide.findByPk(req.params.id, {
      //   includes: [
      //     {
      //       model: ,
      //       as: "",
      //     },
      //   ],
    });
    if (!slide) return res.status(404).send("slide not found");
    res.status(200).send(slide);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateSlideType = async (req, res) => {
  const { error } = ValidateSlide(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).send("slide not found");
    await slide.update(req.body);
    res.status(200).send(slide);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDataType = async (req, res) => {
  try {
    const slide = await Slide.findByPk(req.params.id);
    if (!slide) return res.status(404).send("slide not found");
    const distristslide = slide.toJSON();

    await slide.destroy();
    res.status(204).send(distristslide);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
