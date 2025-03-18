const { Basket } = require("../models");
const { validateBasket } = require("../validations/basketValidation");

exports.creatBasketype = async (req, res) => {
  const { error } = validateBasket(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const existingLiked = await Basket.findOne({
      where: { basket_id: req.body.basket_id },
    });
    if (existingLiked) {
      return res.status(400).json({ message: "Bu basket_id allaqachon mavjud!" });
    }

    // Yangi liked qo‘shish
    const newLiked = await Basket.create(req.body);
    res.status(201).send(newLiked);
  } catch (error) {
    console.error("Error creating liked:", error);
    res.status(500).send(error);
  }
};

exports.getBasketType = async (req, res) => {
  try {
    const basket = await Basket.findAll();
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
          model: basket,
          as: "basket_data",
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
    const { id } = req.params; // data_id keladi

    // `data_id` bo‘yicha qidirish
    const BasketItem = await Basket.findOne({ where: { basket_id: id } });

    if (!BasketItem) {
      return res.status(404).json({ message: "BasketItem item not found" });
    }

    await BasketItem.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting BasketItem item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
