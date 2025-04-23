require("dotenv").config();
const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
  const token = req.cookies.token;
  try {
    const response = jwt.verify(token, JWT_USER_SECRET);
    req.id = response.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Invalid Token",
    });
  }
}

module.exports = {
  userAuth,
};
