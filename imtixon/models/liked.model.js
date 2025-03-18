module.exports = (sequelize, DataTypes) => {
  const Liked = sequelize.define("liked", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    data_id: {
      type: DataTypes.INTEGER,
      unique: true, // numberId faqat noyob qiymatlarni qabul qiladi
      allowNull: false,
    },
  });

  Liked.associate = (models) => {
    Liked.belongsTo(models.datas, {
      foreignKey: "data_id",
      as: "liked_data",
    });
  };

  return Liked;
};
