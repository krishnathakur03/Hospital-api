import express from "express";
import { loginDoctor, registerDoctor } from "./doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.route("/register").post(registerDoctor);
doctorRouter.route("/login").post(loginDoctor);

export default doctorRouter;