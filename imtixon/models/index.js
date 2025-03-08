const Sequelize = require("sequelize");
const sequelize = require("../config/databes");

const VenueType = require("./venueType.model")(sequelize, Sequelize);
const Region = require("./region.model")(sequelize, Sequelize);
const District = require("./district.model")(sequelize, Sequelize);
const Datas = require("./datas.model")(sequelize, Sequelize);


module.exports = { VenueType, Region, District, Datas, sequelize };
