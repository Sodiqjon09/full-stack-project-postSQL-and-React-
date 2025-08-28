module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define("login", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Login.associate = (models) => {
    Login.hasMany(models.basket, {
      foreignKey: "data_id",
      as: "basket",
    });
    Login.hasMany(models.basket, {
      foreignKey: "user_id",
      as: "basket",
    });
    Login.hasMany(models.liked, {
      foreignKey: "user_id",
      as: "liked",
    });
  };
  return Login;
};
