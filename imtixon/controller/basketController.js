const { Basket, Datas, Login } = require("../models");
const { validateBasket } = require("../validations/basketValidation");

exports.creatBasketype = async (req, res) => {
  const { error } = validateBasket(req.body);

  if (error) {
    console.error("Validation xatosi:", error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newBasket = await Basket.create(req.body);
    res.status(201).json(newBasket);
  } catch (error) {
    console.error("Error creating basket:", error);
    res.status(500).json({ error: "Ichki server xatosi" });
  }
};

exports.getBasketType = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const whereClause = userId ? { where: { user_id: userId } } : {};

    const basket = await Basket.findAll(whereClause);
    res.status(200).send(basket);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBasketTypeById = async (req, res) => {
  try {
    const basket = await Basket.findByPk(req.params.id, {
      include: [
        {
          model: Datas,
          as: "datas",
        },
        {
          model: Login,
          as: "login",
        },
      ],
    });
    if (!basket) return res.status(404).send("basket not found");
    res.status(200).send(basket);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateBasketType = async (req, res) => {
  const { error } = validateBasket(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const basket = await Basket.findByPk(req.params.id);
    if (!basket) return res.status(404).send("liked not found");
    await basket.update(req.body);
    res.status(200).send(basket);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteBasketType = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Kelgan ID:", id); // Debug uchun

    const basketItem = await Basket.findByPk(id); // ID bo‘yicha qidiring

    if (!basketItem) {
      return res
        .status(404)
        .json({ message: "Savatda bunday mahsulot topilmadi" });
    }

    await basketItem.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Basket o'chirishda xato:", error);
    return res.status(500).json({ message: "Server xatosi" });
  }
};
