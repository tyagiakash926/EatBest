const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter  = require("./Router/userRouter");
const { json } = require("express");
const path = require('path');
const join = require("path");
const viewRouter = require("./Router/viewRouter");
const reviewRouter = require("./Router/reviewRouter");

const app = express();
const cookieParser = require("cookie-parser"); 
const bookingRouter = require("./Router/bookingRouter");

app.use(cookieParser());
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use(express.json());
app.use(express.static("public"));
app.set("view engine" , "pug");
app.set("views", path.join(__dirname,"view"));


app.use("/api/booking" , bookingRouter);
app.use("/api/plans" , planRouter);
app.use("/api/users" , userRouter);
app.use("/api/review" , reviewRouter);

app.use("" , viewRouter);


// app.httpMethod( appRoute , cb function( request , response   )      )


app.listen(3000, function () {
  console.log("server started at port 3000");
});