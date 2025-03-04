module.exports = (sequelize, DataTypes) => {
  const District = sequelize.define("District", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regionId: {
      type: DataTypes.INTEGER,
    },
  });

  District.associate = (models) => {
    District.belongsTo(models.Region, {
      foreignKey: "regionId",
      as: "region",
    });
  };

  return District;
};
