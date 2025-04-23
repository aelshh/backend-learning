const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

console.log("create db");

const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const course = new Schema({
  title: String,
  description: String,
  price: Number,
  imgUrl: String,
  creatorId: ObjectId,
});
const admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const purchase = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("users", user);
const courseModel = mongoose.model("courses", course);
const adminModel = mongoose.model("admins", admin);
const purchaseModel = mongoose.model("purchases", purchase);

module.exports = {
  userModel: userModel,
  courseModel: courseModel,
  adminModel: adminModel,
  purchaseModel: purchaseModel,
};
