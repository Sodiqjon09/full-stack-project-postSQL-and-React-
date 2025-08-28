const { Liked, Datas, Login } = require("../models");
const { validateLiked } = require("../validations/likedValidation");

exports.createLikedType = async (req, res) => {
  const { error } = validateLiked(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const newLiked = await Liked.create(req.body);
    res.status(201).send(newLiked);
  } catch (error) {
    console.error("Error creating liked:", error);
    res.status(500).send(error);
  }
};

exports.getLikedType = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const whereClause = userId ? { where: { user_id: userId } } : {};

    const datas = await Liked.findAll(whereClause);
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
        {
          model: Login,
          as: "login",
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
    const { id } = req.params; // URL dan id olish
    const { user_id } = req.query; // Query string orqali foydalanuvchi ID olish

    if (!id || !user_id) {
      return res.status(400).json({ message: "Ma'lumot to‘liq emas!" });
    }

    const liked = await Liked.findOne({ where: { data_id: id, user_id } });

    if (!liked) {
      return res.status(404).json({ message: "Yoqtirish topilmadi!" });
    }

    await liked.destroy();
    res.status(200).json({ message: "Yoqtirish muvaffaqiyatli o‘chirildi." });
  } catch (error) {
    console.error("Error deleting liked item:", error);
    return res.status(500).json({ message: "Server xatosi" });
  }
};
