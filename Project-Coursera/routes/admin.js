const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const express = require("express");
const { z } = require("zod");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const { adminAuth } = require("../middlewares/adminAuth");

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

  const existingadmin = await adminModel.findOne({
    email: email,
  });

  if (existingadmin) {
    res.json({
      message: "admin already exists ",
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

  let admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.json({
      message: "No such admin found",
    });
    return;
  }

  let token = jwt.sign(
    {
      id: admin._id,
    },
    JWT_ADMIN_SECRET
  );

  const passMatch = await bcrypt.compare(password, admin.password);
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
adminRouter.post("/course", adminAuth, async (req, res) => {
  const requiredBody = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    imgUrl: z.string(),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid Input",
      error: parsedDataWithSuccess.error,
    });
    return;
  }
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let imgUrl = req.body.imgUrl;
  let creatorId = req.id;

  const doesCourseExists = await courseModel.findOne({
    title: title,
    description: description,
  });

  if (doesCourseExists) {
    res.json({
      message: "Course already exists",
    });
    return;
  }

  let course = await courseModel.create({
    title: title,
    description: description,
    price: price,
    imgUrl: imgUrl,
    creatorId: creatorId,
  });

  res.json({
    message: "Created course succesfully",
    courseId: course.id,
  });
});
adminRouter.put("/course", adminAuth, async (req, res) => {
  const requiredBody = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    imgUrl: z.string(),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid Input",
      error: parsedDataWithSuccess.error,
    });
    return;
  }
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let imgUrl = req.body.imgUrl;
  let creatorId = req.id;
  let courseId = req.body.courseId;

  const doesCourseExists = await courseModel.findOne({
    _id: courseId,
    creatorId: creatorId,
  });

  if (!doesCourseExists) {
    res.json({
      message: "Course does not exists",
    });
    return;
  }

  await courseModel.updateOne(
    {
      _id: courseId,
    },
    {
      title: title,
      description: description,
      price: price,
      imgUrl: imgUrl,
      creatorId: creatorId,
    }
  );

  res.json({
    message: "Updated course succesfully",
  });
});
adminRouter.get("/course/bulk", adminAuth, async (req, res) => {
  let adminId = req.id;
  const response = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    response,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
