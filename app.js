const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser"); 
const userRouter  = require("./Router/userRouter");
const planRouter = require("./Router/planRouter");
const viewRouter = require("./Router/viewRouter");
const reviewRouter = require("./Router/reviewRouter");
const bookingRouter = require("./Router/bookingRouter");
const { json } = require("express");
// const join = require("path");
// app.use(cors());

// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   if ('OPTIONS' == req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.set("view engine" , "pug");
app.set("views", path.join(__dirname,"view"));


app.use("/api/booking" , bookingRouter);
app.use("/api/plans" , planRouter);
app.use("/api/users" , userRouter);
app.use("/api/review" , reviewRouter);

app.use("" , viewRouter);


// app.httpMethod( appRoute , cb function( request , response   )      )

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("server started at port 3000");
});