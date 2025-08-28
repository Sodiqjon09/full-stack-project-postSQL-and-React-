module.exports = (sequelize, DataTypes) => {
  const Liked = sequelize.define("liked", {
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

  Liked.associate = (models) => {
    Liked.belongsTo(models.datas, {
      foreignKey: "data_id",
      as: "liked_data",
    });
    Liked.belongsTo(models.login, {
      foreignKey: "user_id",
      as: "login",
    });
  };

  return Liked;
};
