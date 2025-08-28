module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define("basket", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  Basket.associate = (models) => {
    Basket.belongsTo(models.datas, {
      foreignKey: "data_id",
      as: "datas",
    });
    Basket.belongsTo(models.login, {
      foreignKey: "user_id",
      as: "login",
    });
  };

  return Basket;
};
