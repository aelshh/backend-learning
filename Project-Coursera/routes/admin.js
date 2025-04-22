const { Router } = require("express");
const { adminModel } = require("../db");
const express = require("express");
const { z } = require("zod");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = "239dh302h!";

app.use(express.json());

const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
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

  const existingUser = await adminModel.findOne({
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
    await adminModel.create({
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

adminRouter.post("/signin", async (req, res) => {
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

  let user = await adminModel.findOne({
    email: email,
  });

  let token = jwt.sign(
    {
      id: user._id,
    },
    JWT_ADMIN_SECRET
  );

  if (!user) {
    res.json({
      message: "No such user found",
    });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch) {
    res.json({
      message: "You are signed in",
      token: token,
    });
  } else {
    res.json({
      message: "Incorrect Credentials",
    });
  }
});
adminRouter.post("/course", (req, res) => {
  res.json({
    message: "some message",
  });
});
adminRouter.put("/course", (req, res) => {
  res.json({
    message: "some message",
  });
});
adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "some message",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
