require("dotenv").config();
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
  const token = req.cookies.token;
  try {
    const response = jwt.verify(token, JWT_ADMIN_SECRET);
    req.id = response.id;
    next();
  } catch (e) {
    res.status(403).json({
      message: "Invalid Token",
    });
  }
}

module.exports = {
  adminAuth,
};
