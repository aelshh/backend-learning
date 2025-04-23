const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 5 * 1000,
  max: 5,
  message: "To many requests from this IP please try after some time",
});

module.exports = {
  rateLimiter: rateLimiter,
};
