const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const express = require("express");
const { z } = require("zod");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userAuth } = require("../middlewares/userAuth");
const { rateLimiter } = require("../middlewares/rateLimiter");

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const userRouter = Router();

userRouter.post("/signup", rateLimiter, async (req, res) => {
  const requiredBody = z.object({
    email: z.string().max(100).email(),
    password: z
      .string()
      .min(3)
      .max(10)
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain one small char",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain one capital char",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain one number",
      })
      .refine((value) => /[^0-9A-Za-z]/.test(value), {
        message: "Password must contain one special char",
      }),
    firstName: z.string().min(3).max(10),
    lastName: z.string().min(3).max(10),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid Input",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;

  const existingUser = await userModel.findOne({
    email: email,
  });

  if (existingUser) {
    res.json({
      message: "User already exists ",
    });
    return;
  }

  let erroOccured = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
  } catch (e) {
    res.json({
      message: "Some error occured",
    });
    erroOccured = true;
  }

  if (!erroOccured) {
    res.json({
      message: "You are signed Up",
    });
  }
});
userRouter.post("/signin", rateLimiter, async (req, res) => {
  const requiredBody = z.object({
    email: z.string().max(100).email(),
    password: z
      .string()
      .min(3)
      .max(10)
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain one small char",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain one capital char",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain one number",
      })
      .refine((value) => /[^0-9A-Za-z]/.test(value), {
        message: "Password must contain one special char",
      }),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid Input",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  let email = req.body.email;
  let password = req.body.password;

  let user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.json({
      message: "No such user found",
    });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);
  let token = jwt.sign(
    {
      id: user._id,
    },
    JWT_USER_SECRET
  );
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    credentials: "include",
  });

  if (passMatch) {
    res.json({
      message: "You are signed in",
    });
  } else {
    res.json({
      message: "Incorrect Credentials",
    });
  }
});
userRouter.get("/purchases", userAuth, async (req, res) => {
  const userId = req.id;
  const purchases = await purchaseModel.find({
    userId: userId,
  });

  let purchasesId = [];
  purchases.map((purchase) => {
    purchasesId.push(purchase.courseId);
  });

  const purchasedCourses = await courseModel.find({
    _id: { $in: purchasesId },
  });

  res.json({
    purchasedCourses,
  });
});

module.exports = {
  userRouter: userRouter,
};
