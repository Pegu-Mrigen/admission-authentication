import mongoose from "mongoose";
import validator from "validator";

const msgSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name Must Contain At Least 5 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name Must Contain At Least 5 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [20, "Message Must Contain At Least 20 Characters!"],
  },
},{ timestamps: true });

export const Message =
  mongoose.models.Message || mongoose.model("Message", msgSchema);
