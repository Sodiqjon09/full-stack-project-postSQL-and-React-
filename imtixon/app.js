const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/databes");
const datasRouter = require("./routes/datasRouter");
const slideRouter = require("./routes/slideRouter");
const loginRouter = require("./routes/loginRouter");
const likedRouter = require("./routes/likedRouter");
const basketRouter = require("./routes/basketRouter");
const categoryRouter = require("./routes/categoryRouter");

const setupSwagger = require("./swagger/swagger");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", datasRouter);
app.use("/api", slideRouter);
app.use("/api", loginRouter);
app.use("/api", likedRouter);
app.use("/api", basketRouter);
app.use("/api", categoryRouter);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
