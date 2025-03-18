module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define("basket", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    basket_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  });

  Basket.associate = (models) => {
    Basket.belongsTo(models.datas, {
      foreignKey: "basket_id",
      as: "basket_data",
    });
  };

  return Basket;
};
