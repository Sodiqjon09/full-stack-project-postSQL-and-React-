module.exports = (sequelize, DataTypes) => {
  const Datas = sequelize.define("datas", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    starText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fakePrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Datas.associate = (models) => {
    Datas.hasMany(models.liked, {
      foreignKey: "data_id",
      as: "liked",
    });
  };
  
  Datas.associate = (models) => {
    Datas.hasMany(models.liked, {
      foreignKey: "basket_id",
      as: "basket",
    });
  };

  return Datas;
};
