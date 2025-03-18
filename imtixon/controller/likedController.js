const { Liked, Datas } = require("../models");
const { validateLiked } = require("../validations/likedValidation");

exports.createLikedType = async (req, res) => {
  const { error } = validateLiked(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // data_id allaqachon mavjudligini tekshirish
    const existingLiked = await Liked.findOne({
      where: { data_id: req.body.data_id },
    });
    if (existingLiked) {
      return res.status(400).json({ message: "Bu data_id allaqachon mavjud!" });
    }

    // Yangi liked qo‘shish
    const newLiked = await Liked.create(req.body);
    res.status(201).send(newLiked);
  } catch (error) {
    console.error("Error creating liked:", error);
    res.status(500).send(error);
  }
};

exports.getLikedType = async (req, res) => {
  try {
    const datas = await Liked.findAll();
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLikedTypeById = async (req, res) => {
  try {
    const datas = await Liked.findByPk(req.params.id, {
      include: [
        {
          model: Datas,
          as: "liked_data",
        },
      ],
    });
    if (!datas) return res.status(404).send("liked not found");
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateLikedType = async (req, res) => {
  const { error } = validateData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const datas = await Liked.findByPk(req.params.id);
    if (!datas) return res.status(404).send("liked not found");
    await datas.update(req.body);
    res.status(200).send(datas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteLikedType = async (req, res) => {
  try {
    const { id } = req.params; // data_id keladi

    // `data_id` bo‘yicha qidirish
    const likedItem = await Liked.findOne({ where: { data_id: id } });

    if (!likedItem) {
      return res.status(404).json({ message: "Liked item not found" });
    }

    await likedItem.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting liked item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
