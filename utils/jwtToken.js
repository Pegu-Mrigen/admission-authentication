export const generateToken = (student, message, statusCode, res) => {
  const token = student.generateJsonWebToken();
  // Determine the cookie name based on the student's role
  // const cookieName = student.role === "Admin" ? "adminToken" : "studentToken";
  const cookieName ="studentToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      student,
      token,
    });
};
