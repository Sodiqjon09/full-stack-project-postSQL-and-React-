const Sequelize = require("sequelize");
const sequelize = require("../config/databes");

const Datas = require("./datas.model")(sequelize, Sequelize);
const Slide = require("./slide.model")(sequelize, Sequelize);
const Login = require("./login.model")(sequelize, Sequelize);
const Liked = require("./liked.model")(sequelize, Sequelize);
const Basket = require("./basket.model")(sequelize, Sequelize);
const Category = require("./category.model")(sequelize, Sequelize);

Datas.associate(sequelize.models);
Liked.associate(sequelize.models);
Basket.associate(sequelize.models);
Category.associate(sequelize.models);

module.exports = {
  Datas,
  Slide,
  Login,
  Liked,
  Basket,
  Category,
  sequelize,
};
