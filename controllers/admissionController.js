import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Admission } from "../models/admissionSchema.js";
import { Student } from "../models/studentSchema.js";

export const postAdmission = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    sex,
    email,
    phone,
    fathersName,
    mothersName,
    localGuardian,
    category,
    courseName,
    dob,
    religion,
    nationality,
    bloodGroup,
    gender,
    wasStudent,
    presentAddress,
    permanentAddress,
    courseType,
  } = req.body;
  if (
    !firstName ) {
      return next(new ErrorHandler("Please Fill firstName!", 400));
    }
  if (
    !lastName ) {
      return next(new ErrorHandler("Please Fill lastName!", 400));
    }
  if (
    !email ) {
      return next(new ErrorHandler("Please Fill email!", 400));
    }
  if (
    !phone ) {
      return next(new ErrorHandler("Please Fill phone!", 400));
    }
  if (
    !sex ) {
      return next(new ErrorHandler("Please Fill sex!", 400));
    }
  if (
    !dob ) {
      return next(new ErrorHandler("Please Fill dob!", 400));
    }
  if (
    !religion ) {
      return next(new ErrorHandler("Please Fill religion!", 400));
    }
  if (
    !nationality ) {
      return next(new ErrorHandler("Please Fill nationality!", 400));
    }
  if (
    !presentAddress ) {
      return next(new ErrorHandler("Please Fill presentAddress!", 400));
    }
  if (
    !permanentAddress ) {
      return next(new ErrorHandler("Please Fill permanentAddress!", 400));
    }
  if (
    !fathersName ) {
      return next(new ErrorHandler("Please Fill fathersName!", 400));
    }
  if (
    !mothersName ) {
      return next(new ErrorHandler("Please Fill mothersName!", 400));
    }
  if (
    !category ) {
      return next(new ErrorHandler("Please Fill category!", 400));
    }
  if (
    !localGuardian ) {
      return next(new ErrorHandler("Please Fill localGuardian!", 400));
    }
  if (
    !courseName ) {
      return next(new ErrorHandler("Please Fill courseName!", 400));
    }
 
  
  
  //   !category ||
  //   !localGuardian ||
  //   !courseName ||
  //   !courseType 
  // ) {
  //   return next(new ErrorHandler("Please Fill all the Fields!", 400));
  // }
  // const isConflict = await User.find({
  //   firstName: firstName,
  //   lastName: lastName,
  //   role: "Student",
  // });
  // if (isConflict.length === 0) {
  //   return next(new ErrorHandler("Course not found", 404));
  // }

  // if (isConflict.length > 1) {
  //   return next(
  //     new ErrorHandler(
  //       "Courses Conflict! Please Contact Through Email Or Phone!",
  //       400
  //     )
  //   );
  // }
  //const studentId = isConflict[0]._id;

  const admission = await Admission.create({
    firstName,
    lastName,
    sex,
    email,
    phone,
    fathersName,
    mothersName,
    localGuardian,
    category,
    courseName,
    dob,
    religion,
    nationality,
    bloodGroup,
    gender,
    wasStudent,
    presentAddress,
    permanentAddress,
    courseType,
  });
  res.status(200).json({
    success: true,
    admission,
    message: "Admission form submitted successfully!",
  });
});

export const getAllAdmissions = catchAsyncErrors(async (req, res, next) => {
  const admissions = await Admission.find();
  res.status(200).json({
    success: true,
    admissions,
  });
});
export const updateAdmissionStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let admission = await Admission.findById(id);
    if (!admission) {
      return next(new ErrorHandler("Admission not found!", 404));
    }
    admission = await Admission.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Admission Status Updated!",
    });
  }
);
export const deleteAdmission = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const admission = await Admission.findById(id);
  if (!admission) {
    return next(new ErrorHandler("Admission Not Found!", 404));
  }
  await admission.deleteOne();
  res.status(200).json({
    success: true,
    message: "Admission Deleted!",
  });
});

export const addNewCourse = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Course Avatar Required!", 400));
  }
  const { courseAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const { courseType, courseName } = req.body;
  if (!courseType || !courseName || !courseAvatar) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Course With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    courseAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Course Avatar To Cloudinary", 500)
    );
  }
  const student = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Student",
    courseType,
    studentAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Course Registered",
    Course,
  });
});
