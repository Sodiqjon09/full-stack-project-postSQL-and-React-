module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Category.associate = (models) => {
    Category.belongsTo(models.datas, {
      foreignKey: "category_id",
      as: "category_data",
    });
  };

  return Category;
};
