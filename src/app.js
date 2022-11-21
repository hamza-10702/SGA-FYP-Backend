require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouters");
const productRouter = require("./routes/productRouters");
const imageRouter = require('./routes/imageRouters')
const connectDB = require("./db/connectDB");

//// Code  ////

const app = express();
app.use(express.json());
app.use(cookieParser());

// const port = 3000;
const port = process.env.PORT || 3000;

connectDB();

app.use(authRouter);
app.use(productRouter);
app.use(imageRouter)

app.listen(port, () => {
  console.log(`Connection is ${port}`);
});
