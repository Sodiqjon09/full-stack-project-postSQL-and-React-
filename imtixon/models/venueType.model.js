module.exports = (sequelize, DataTypes) => {
  const VenueType = sequelize.define("venuetype", {
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

  return VenueType;
};
