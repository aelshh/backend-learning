const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {});
userRouter.post("/login", (req, res) => {
  res.json({
    message: "this is login route working fine",
  });
});
userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "this is purchase route working fine",
  });
});

module.exports = {
  userRouter: userRouter,
};
