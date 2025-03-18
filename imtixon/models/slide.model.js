module.exports = (sequelize, DataTypes) => {
  const Slide = sequelize.define("slide", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Slide;
};
