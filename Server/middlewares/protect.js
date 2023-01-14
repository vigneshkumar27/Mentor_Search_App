

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  console.log("It is logged in protect ...");
  let token = req.headers.authorization;

  token = token.split(" ");

  token = token[1];
  console.log("token ---", token);

  const decodedUser = jwt.verify(
    token,
    "This secret key is used to encrypt the payload and generate the token");

  console.log("decodedUser --- ", decodedUser);
  req.user = decodedUser;

  console.log("user role ----", req.user.role);
  // Verifying the user if this user exists in data base on not ?
  const userFound = await User.findOne({ id: decodedUser.id });

  console.log("userFound ----- ", userFound);

  if (userFound) {

    next(); // "next" method calls up the next middleware function in the series..
  } else {
    res.json({ message: "Invalid user, doesn't have a valid token" });
  }
};
exports.authorize = (req, res, next) => {
  let roles = ["admin"];
  if (!roles.includes(req.user.role)) {
    res.send(
      `User role ${req.user.role} is not authorized to access the site`
    );
  }
  next();
};

module.exports = protect;

