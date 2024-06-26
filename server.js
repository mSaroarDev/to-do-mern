const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const user = require("./src/routes/userRoute");
const taskGroup = require("./src/routes/taskGroupRoute");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// cors
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

// database setup
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("db connected"))
  .catch((err) => console.log(err));

// user router
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", user);
app.use("/task", taskGroup);

app.listen(process.env.port, () =>
  console.log(`server running at port ${process.env.port}`)
);
