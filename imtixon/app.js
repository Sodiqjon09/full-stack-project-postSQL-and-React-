const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/databes");
const venueTypeRoutes = require("./routes/venueTypeRoutes");
const districkRouter = require("./routes/districkRouter");
const regionRouter = require("./routes/regionRouter");

const setupSwagger = require("./swagger/swagger");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", venueTypeRoutes);
app.use("/api", regionRouter);
app.use("/api", districkRouter);


setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
