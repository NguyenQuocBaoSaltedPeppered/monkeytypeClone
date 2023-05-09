const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./Routes/auth.routes");
const userRouter = require("./Routes/user.routes");
const leaderboardRouter = require("./Routes/leaderboard.routes");
const port = process.env.PORT;
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connect success!!!");
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES:
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/leaderboard", leaderboardRouter);
app.get("/", (req, res) =>
  res.send("Hello, this is 3rd yeard intern project!")
);
app.listen(process.env.PORT, () => {
    console.log("Server is running");
});



