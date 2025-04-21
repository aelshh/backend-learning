const express = require("express");
const { userModel, todoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWT_SECRET = "22332dd@#$#adfa";
const bcrypt = require("bcrypt");
const { z } = require("zod");

mongoose.connect("");
function auth(req, res, next) {
  let token = req.headers.token;
  let response = jwt.verify(token, JWT_SECRET);
  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "Wrong Credentials",
    });
  }
}
app.use(express.json());

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  const requiredbody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z
      .string()
      .min(3)
      .max(30)
      .refine((value) => /[a-z]/.test(value), {
        message: "The password must contain atleast one lowercase char",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "The password must contain atlead one uppercase char",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "The password must contain atleast 1 integar value",
      })
      .refine((value) => /[^a-zA-Z0-9]/.test(value), {
        message: "The password must contain atlead one char",
      }),
    name: z.string().min(3).max(100),
  });

  const parsedDataWithSuccess = requiredbody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Invalid credentials",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  let erroOccured = false;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (e) {
    res.json({
      message: "User already exists",
    });
    erroOccured = true;
  }

  if (!erroOccured) {
    res.json({
      message: "You are loggedin  ",
    });
  }
});
app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.json({
      message: "No such user with this email. Please signup first.",
    });
  }

  const passMatch = await bcrypt.compare(password, user.password);

  console.log(user);
  if (passMatch) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

app.use(auth);
app.post("/todo", async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;
  await todoModel.create({
    title: title,
    userId: userId,
    done: done,
  });

  res.json({
    message: "Todo created",
  });
});
app.get("/todos", async (req, res) => {
  const userId = req.userId;
  const reponse = await todoModel.find({
    userId: userId,
  });
  res.json({
    todos: reponse,
  });
});

app.listen(3000);
