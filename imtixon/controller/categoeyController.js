const { Category, Datas } = require("../models");
const { validateCategory } = require("../validations/categoryValidation");

exports.createCategoryType = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const category = await Category.create(req.body);
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategoryType = async (req, res) => {
  try {
    const datas = await Category.findAll();
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCategoryTypeById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Datas,
          as: "category_data",
        },
      ],
    });
    if (!category) return res.status(404).send("category not found");
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateCategoryType = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).send("category not found");
    await category.update(req.body);
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteCategoryType = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).send("distristcategory not found");
        const distristcategory = category.toJSON();
    
        await category.destroy();
        res.status(204).send(distristcategory);
      } catch (error) {
        res.status(500).send(error.message);
      }
};
