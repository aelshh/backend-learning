const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchases", (req, res) => {});
courseRouter.get("/preview", (req, res) => {});

module.exports = {
  courseRouter: courseRouter,
};
