import express from "express";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import msgRouter from "./router/msgRouter.js";
import studentRouter from "./router/studentRouter.js";
import admissionRouter from "./router/admissionRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
config({ path: "./config.env" });

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", msgRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/admission", admissionRouter);
dbConnection();

//"errorMiddleware" SHOULD BE CALLED AT LAST AND () MUST NOT BE INCLUDED

app.use(errorMiddleware);

export default app;
