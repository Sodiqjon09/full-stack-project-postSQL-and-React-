const { Datas } = require("../models");
const { validateData } = require("../validations/datasValidation");

exports.createDataType = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const datas = await Datas.create(req.body);
    res.status(201).send(datas);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDataType = async (req, res) => {
  try {
    const datas = await Datas.findAll();
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getDataTypeById = async (req, res) => {
  try {
    const datas = await Datas.findByPk(req.params.id, {
      //   includes: [
      //     {
      //       model: ,
      //       as: "",
      //     },
      //   ],
    });
    if (!datas) return res.status(404).send("datas not found");
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateDataType = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const datas = await Datas.findByPk(req.params.id);
    if (!datas) return res.status(404).send("datas not found");
    await datas.update(req.body);
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteDataType = async (req, res) => {
  try {
    const datas = await Datas.findByPk(req.params.id);
    if (!datas) return res.status(404).send("datas not found");
    const distristdata = datas.toJSON();

    await datas.destroy();
    res.status(204).send(distristdata);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
