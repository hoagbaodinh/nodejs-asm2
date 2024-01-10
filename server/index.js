const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const cors = require("cors");
const authRoute = require("./routes/auth");
const hotelRoute = require("./routes/hotels");
const roomRoute = require("./routes/rooms");
const userRoute = require("./routes/users");
const transactionRoute = require("./routes/transactions");
app.use(bodyParser.json());

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);
app.use("/api/transaction", transactionRoute);

mongoose
  .connect(
    "mongodb+srv://hoagbaodinh1:SfFYSaD6yyAGVSxd@cluster0.u4h9gqd.mongodb.net/ASM2?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5050);
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log(err));
