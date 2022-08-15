//third party modules
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
// custome modules
const verifyAccessToken = require("./middlewares/verifyAccess");
const connectDB = require("./configs/db_config");

//connect to mongodb first before listen;
connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(Cors(corsOptions));
app.use("^/register$", require("./routers/register"));
app.use("^/login$", require("./routers/login"));
app.use("^/refresh$", require("./routers/refresh"));
app.use("^/logout$", require("./routers/logout"));
app.use("^/$", require("./routers/root"));
app.use(verifyAccessToken);
app.use("^/employees", require("./routers/employee/employees"));
mongoose.connection.once("open", () => {
  console.log("connected to the databse");
  app.listen(3500, () => {
    console.log("server has started on port 3500");
  });
});
