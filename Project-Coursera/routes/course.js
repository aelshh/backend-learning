const { Router } = require("express");
const { courseModel, purchaseModel } = require("../db");
const { userAuth } = require("../middlewares/userAuth");

const courseRouter = Router();

courseRouter.post("/purchase", userAuth, async (req, res) => {
  let userId = req.id;
  let courseId = req.body.courseId;
  await purchaseModel.create({
    courseId: courseId,
    userId: userId,
  });
  res.json({
    message: "You have succesfully bought the course",
  });
});
courseRouter.get("/preview", async (req, res) => {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
