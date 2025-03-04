module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("Region", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Region.associate = (models) => {
    Region.hasMany(models.District, {
      foreignKey: "regionId",
      as: "region_district",
    });
  };
  return Region;
};
