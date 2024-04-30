import mongoose from "mongoose";
import { Mongoose } from "mongoose";
import validator from "validator";

const admissionSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: [true, "First Name Is Required!"],
      // minLength: [3, "First Name Must Contain At Least 3 Characters!"],
      default: "default",
    },
    lastName: {
      type: String,
      //required: [true, "Last Name Is Required!"],
      // minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
      default: "default",
    },
    fathersName: {
      type: String,
      // required: [true, "Father's Name Name Is Required!"],
      // minLength: [3, "Father's Name Name Must Contain At Least 3 Characters!"],
      default: "default",
    },
    mothersName: {
      type: String,
      //required: [true, "Mother's Name Name Is Required!"],
      // minLength: [3, "Mother's Name Name Must Contain At Least 3 Characters!"],
      default: "default",
    },
    localGuardian: {
      type: String,
      //required: [true, "Local Guardian's Name Name Is Required!"],
      // minLength: [
      //   3,
      //   "Local Guardian's Name Name Must Contain At Least 3 Characters!",
      // ],
      default: "default",
    },
    email: {
      type: String,
      //required: [true, "Email Is Required!"],
      //validate: [validator?.isEmail, "Provide A Valid Email!"],
      default: "default@test.com",
    },
    phone: {
      type: Number,
      //required: [true, "Phone Is Required!"],
      // minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
      //maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
      default: "12345",
    },
    religion: {
      type: String,
      //required: [true, "Religion Is Required!"],
      // minLength: [5, "Religion Must Contain min 5 Characters!"],
      //maxLength: [5, "Religion Must Contain min 5 Characters!"],
    },
    nationality: {
      type: String,
      //required: [true, "Nationality Is Required!"],
      // minLength: [3, "Nationality Must Contain min 3 Characters!"],
      //maxLength: [3, "Nationality Must Contain min 3 Characters!"],
    },
    bloodGroup: {
      type: String,
      //required: [true, "Blood Group Is Required!"],
      // minLength: [3, "Blood Group Must Contain min 3 Characters!"],
      //maxLength: [3, "Blood Group Must Contain min 3 Characters!"],
    },
    dob: {
      type: Date,
      //required: [true, "DOB Is Required!"],
      default: "default",
    },
    sex: {
      type: String,
      //required: [true, "Gender Is Required!"],
      default: "default",
    },
    category: {
      type: String,

      default: "default",
    },
    // courseType: {
    //   type: String,
    //   enum: ["Diploma", "Certificate", "Others"],
    //   default: "Diploma",
    // },
    courseType: [
      {
        type: String,
        //enum: ["Diploma", "Certificate", "Others"],
        default: "Others",
      },
    ],

    courseName: {
      type: String,
      default: "default",
    },

    wasStudent: {
      type: String,
      default: "default",
    },
    presentAddress: {
      type: String,
      //required: [true, "Present Address Is Required!"],
      default: "default",
    },
    permanentAddress: {
      type: String,
      //required: [true, "Permanent Address Is Required!"],
      default: "default",
    },
    courseId: {
      type: mongoose.Schema.ObjectId,
      //required: [true, "Doctor Id Is Invalid!"],
    },
    studentId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      //required: [true, "Patient Id Is Required!"],
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Admission =
  mongoose.models.Admission || mongoose.model("Admission", admissionSchema);
