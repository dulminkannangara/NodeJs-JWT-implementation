const express = require("express");
const jwt_controller = require("./app/controller/jwt.controller");
const user_controller = require("./app/controller/user.controller");
const auth = require("./app/controller/auth.controller");

const app = express();

app.use(express.json());

app.use("/api", jwt_controller);
app.use("/api/user", auth, user_controller);

const port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log(`App is running on port ${port}`);
});

module.exports = server;