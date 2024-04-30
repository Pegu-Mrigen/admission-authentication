import { Student } from "../models/studentSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";

import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard students
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(
      new ErrorHandler("Dashboard student is not authenticated!", 400)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.student = await Student.findById(decoded.id); //id IS FROM studentSCHEMA
  if (req.student.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.student.role} not authorized for this resource!`,
        403
      )
    );
  }
  next();
});

// Middleware to authenticate frontend students
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.studentToken;
  if (!token) {
    return next(new ErrorHandler("Please login to fill the admission form!", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.student = await Student.findById(decoded.id);
  if (req.student.role !== "Student") {
    return next(
      new ErrorHandler(
        `${req.student.role} not authorized for this resource!`,
        403
      )
    );
  }

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.student.role)) {
      return next(
        new ErrorHandler(
          `${req.student.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};
