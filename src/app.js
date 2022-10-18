const express = require("express");
const cookieParser = require('cookie-parser')
const AuthRouter = require("./routes/authRouters")
const productRouter = require("./routes/productRouters")

//// Code  ////
require("./db/conn");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(AuthRouter);
app.use(productRouter);


app.listen(port, () => {
    console.log(`Connection is ${port}`);
  });
  
  
  