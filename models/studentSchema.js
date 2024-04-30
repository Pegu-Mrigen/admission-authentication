import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name Is Required!"],
      minLength: [3, "First Name Must Contain At Least 3 Characters!"],
      // default: "SFN1",
    },
    lastName: {
      type: String,
      required: [true, "Last Name Is Required!"],
      minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
      //default: "SLN1",
    },
    email: {
      type: String,
      required: [true, "Email Is Required!"],
      validate: [validator.isEmail, "Provide A Valid Email!"],
      //default: "email@default.com",
    },
    phone: {
      type: String,
      required: [true, "Phone Is Required!"],
      minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
      //maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
      //default: "123",
    },

    password: {
      type: String,
      required: [true, "Password Is Required!"],
      minLength: [4, "Password Must Contain At Least 4 Characters!"],
      default: "11111111",
    },
    role: {
      type: String,
      //required: [true, "User Role Required!"],
      enum: ["Student", "Course", "Admin"],
      default: "Student",
    },

    studentAvatar: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

//BEFORE SAVE OR PRE SAVE

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//"comparePassword" METHOD IS CREATED FOR studentController.js

studentSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

studentSchema.methods.generateJsonWebToken = function () {
  //id IS JWT SIGNED
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
